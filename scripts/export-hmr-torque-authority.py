#!/usr/bin/env python3
"""Regenerate src/lib/hmr/hmr-torque-authority.json from the controlled cross-reference DB.

Run this only after an approved change to the DB, then rebuild so the gate re-verifies parity.

    python3 scripts/export-hmr-torque-authority.py "/Coze/Drive/扣子/摆动油缸多品牌交叉引用数据库_v2.4_...xlsx"
"""
import json
import re
import sys

import openpyxl

DB = sys.argv[1] if len(sys.argv) > 1 else (
    "/Coze/Drive/扣子/摆动油缸多品牌交叉引用数据库_v2.4_受控补录_20261017_1792296483023_l5wm.xlsx"
)
OUT = "src/lib/hmr/hmr-torque-authority.json"

LETTER2HMR = {"A": "HMR1", "B": "HMR2", "C": "HMR3", "D": "HMR4", "E": "HMR5", "F": "HMR6"}

wb = openpyxl.load_workbook(DB, data_only=True)
rows = list(wb["02_型号参数主表"].iter_rows(values_only=True))

models = {}
for r in rows[1:]:
    model = str(r[3]).strip() if r[3] else ""
    m = re.match(r"^DKX-([A-F])[-\s](\d+)$", model)
    if not m or r[5] is None:
        continue
    key = f"{LETTER2HMR[m.group(1)]}-{str(int(m.group(2))).zfill(3)}"
    v = float(r[5])
    models[key] = int(v) if v.is_integer() else v

existing = json.load(open(OUT, encoding="utf-8"))
existing["models"] = dict(sorted(models.items()))
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"wrote {len(models)} models to {OUT}")
