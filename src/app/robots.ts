import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
    ],
    sitemap: 'https://check-me.today/sitemap.xml',
    host: 'https://check-me.today',
  };
}
