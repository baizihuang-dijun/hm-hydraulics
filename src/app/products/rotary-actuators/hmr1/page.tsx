import type { Metadata } from 'next';
import { HmrSeriesPage, hmrSeriesMetadata } from '@/components/hmr/hmr-series-page';

const SERIES = 'HMR1';

export const metadata: Metadata = hmrSeriesMetadata(SERIES);

export default function Page() {
  return <HmrSeriesPage series={SERIES} />;
}
