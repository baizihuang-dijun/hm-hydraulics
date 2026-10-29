import { SITE_NAME, SITE_URL, absoluteUrl } from './site';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationLd(): object {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: 'Qingdao Hydraulic Machinery Co., Ltd.',
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/og-image.png'),
    email: 'hm@hmhydraulics.com',
    description:
      'Technical sourcing partner for hydraulic rotary actuators, tilt actuators, slew drives and core hydraulic components.',
  };
}

export function webSiteLd(): object {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export interface CrumbNode {
  name: string;
  path: string;
}

export function breadcrumbLd(items: CrumbNode[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graphLd(nodes: object[]): object {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
