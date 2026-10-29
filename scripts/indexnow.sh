#!/usr/bin/env bash
# Submit URLs to IndexNow (Bing / Yandex / Naver / Seznam).
#
# Usage:
#   ./scripts/indexnow.sh <url> [<url> ...]
#   ./scripts/indexnow.sh --sitemap            # push every URL in out/sitemap.xml
#
# URLs are normalised to the site's canonical form before submission:
#   - strip the ".html" suffix (the canonical tag never carries it)
#   - drop any trailing slash except for the root
#   - force the https://www. host
#
# Why: Bing was recording both "/x.html" and "/x" as separate submitted URLs,
# which splits the crawl signal between two addresses of the same page.

set -euo pipefail

HOST="www.hmhydraulics.com"
KEY="8cb5d1abff8713eae7683c5e5e41fbda"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
ENDPOINT="https://api.indexnow.org/indexnow"
BATCH=500

normalise() {
  local u="$1"
  u="${u#http://}"
  u="${u#https://}"
  u="${u#www.hmhydraulics.com}"
  [[ "$u" == /* ]] || u="/${u}"
  u="${u%%\?*}"
  u="${u%%#*}"
  u="${u%.html}"
  [[ "$u" == "/" ]] || u="${u%/}"
  printf 'https://%s%s' "$HOST" "$u"
}

urls=()
if [[ "${1:-}" == "--sitemap" ]]; then
  SITEMAP="${2:-out/sitemap.xml}"
  [[ -f "$SITEMAP" ]] || { echo "sitemap not found: $SITEMAP" >&2; exit 1; }
  while IFS= read -r loc; do
    urls+=("$(normalise "$loc")")
  done < <(grep -o '<loc>[^<]*</loc>' "$SITEMAP" | sed 's|</\?loc>||g')
else
  for u in "$@"; do urls+=("$(normalise "$u")"); done
fi

[[ ${#urls[@]} -gt 0 ]] || { echo "no urls given" >&2; exit 1; }

printf '%s\n' "${urls[@]}" | awk '!seen[$0]++' > /tmp/indexnow-urls.txt
total=$(wc -l < /tmp/indexnow-urls.txt)
echo "submitting ${total} canonical URL(s) to IndexNow"

offset=0
while [[ $offset -lt $total ]]; do
  payload=$(python3 - "$offset" "$BATCH" "$KEY" "$KEY_LOCATION" "$HOST" <<'PY'
import json, sys
offset, batch, key, key_location, host = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4], sys.argv[5]
urls = [l.strip() for l in open('/tmp/indexnow-urls.txt') if l.strip()]
chunk = urls[offset:offset + batch]
print(json.dumps({"host": host, "key": key, "keyLocation": key_location, "urlList": chunk}))
PY
)
  code=$(curl -s -o /tmp/indexnow-resp.txt -w '%{http_code}' -X POST "$ENDPOINT" \
    -H 'Content-Type: application/json; charset=utf-8' -d "$payload")
  echo "batch offset=${offset} count=$(printf '%s' "$payload" | python3 -c 'import json,sys;print(len(json.load(sys.stdin)["urlList"]))') http=${code}"
  [[ "$code" == "200" || "$code" == "202" ]] || { echo "IndexNow rejected this batch: $(cat /tmp/indexnow-resp.txt)" >&2; exit 1; }
  offset=$((offset + BATCH))
done

echo "done"
