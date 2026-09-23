import type { MetadataRoute } from 'next';
import { SERIES_INFO } from '@/components/alternatives/series-page';

export const dynamic = 'force-static';
import { modelPages } from '@/components/alternatives/model-data';

const BASE = 'https://www.hmhydraulics.com';

const staticRoutes = [
  '',
  '/products',
  '/products/rotary-actuators',
  '/products/slew-drives',
  '/products/tilt-actuators',
  '/solutions',
  '/about',
  '/quality',
  '/support',
  '/contact',
  '/alternatives',
  '/alternatives/rebuild-vs-replacement',
  '/alternatives/cross-reference-guide',
  '/alternatives/how-to-identify',
  '/alternatives/jlg-aerial-work-platform',
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

  return entries;
}
