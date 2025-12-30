import { MetadataRoute } from 'next';
import { locales, defaultLocale, localePrefix } from '@/config/locale';
import { envConfigs } from '@/config';
import { getPostsAndCategories } from '@/shared/models/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use NEXT_PUBLIC_APP_URL from env or fallback
  const domain = envConfigs.app_url || 'https://huxibo-v2.zeabur.com';
  
  // Define your base routes here
  const routes = [
    '', // Home
    '/blog',
    '/pricing',
    '/showcases',
    '/updates',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    let localePath = `/${locale}`;

    // If prefix is 'as-needed' and this is the default locale, omit the locale segment
    // @ts-ignore
    if (typeof localePrefix !== 'undefined' && localePrefix === 'as-needed' && locale === defaultLocale) {
      localePath = '';
    }

    // 1. Add static page routes
    routes.forEach((route) => {
      const url = `${domain}${localePath}${route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
      });
    });

    // 2. Add blog posts
    try {
      // Fetch posts for the current locale
      const { posts } = await getPostsAndCategories({ 
        locale,
        limit: 1000,
        postPrefix: '/blog/', 
      });

      posts.forEach((post) => {
        const url = `${domain}${localePath}/blog/${post.slug}`;
        
        let lastModified = new Date();
        if (post.created_at) {
          const date = new Date(post.created_at);
          if (!isNaN(date.getTime())) {
            lastModified = date;
          }
        }

        sitemapEntries.push({
          url,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    } catch (error) {
      console.error(`Failed to fetch posts for locale ${locale}:`, error);
      // Continue generating sitemap for other content
    }
  }

  return sitemapEntries;
}
