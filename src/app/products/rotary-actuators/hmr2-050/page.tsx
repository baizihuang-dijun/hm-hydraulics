import type { Metadata } from 'next';
import { HmrModelPage, hmrModelMetadata } from '@/components/hmr/hmr-model-page';

export const metadata: Metadata = hmrModelMetadata('HMR2-050');

export default function Hmr2050Page() {
  return <HmrModelPage code="HMR2-050" />;
}
