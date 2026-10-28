import type { MetadataRoute } from 'next';
import { SERIES_INFO } from '@/components/alternatives/series-page';
import { modelPages } from '@/components/alternatives/model-data';
import { oemPartGroups } from '@/components/alternatives/oem-parts';
import { HMR_MODEL_PAGE_CODES } from '@/lib/hmr/hmr-model-pages';

export const dynamic = 'force-static';

const BASE = process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'https://www.hmhydraulics.com';

const staticRoutes = [
  '',
  '/products',
  '/products/rotary-actuators',
  // HMR4 is a JS-redirect stub canonicalised to the rotary series page; keep it out of the sitemap.
  '/products/slew-drives',
  '/products/tilt-actuators',
  '/solutions',
  '/solutions/two-axis-hydraulic-rotary-actuators',
  '/case-studies/vigel-machining-center',
  '/about',
  '/quality',
  '/support',
  '/contact',
  '/alternatives',
  '/alternatives/rebuild-vs-replacement',
  '/alternatives/cross-reference-guide',
  '/alternatives/how-to-identify',
  '/alternatives/rotary-actuator-types',
  '/alternatives/rotary-actuator-vs-motor',
  '/alternatives/rotary-actuator-troubleshooting',
  '/alternatives/jlg-aerial-work-platform',
  '/alternatives/genie-boom-lifts',
  '/alternatives/mining-drill-rigs',
  '/alternatives/hks-da-h-series',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  for (const s of SERIES_INFO) {
    entries.push({
      url: `${BASE}/alternatives/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const m of modelPages) {
    entries.push({
      url: `${BASE}/alternatives/${m.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const code of HMR_MODEL_PAGE_CODES) {
    entries.push({
      url: `${BASE}/products/rotary-actuators/${code.toLowerCase()}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const g of oemPartGroups) {
    entries.push({
      url: `${BASE}/alternatives/${g.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}
