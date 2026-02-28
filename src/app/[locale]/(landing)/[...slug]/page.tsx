import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { envConfigs } from '@/config';
import { getLocalPage } from '@/shared/models/post';

export const revalidate = 3600;

async function getDynamicPageConfig(locale: string, slugPaths: string[]) {
  const jsonPath = slugPaths.join('/');
  
  try {
    // Try to load the specific page JSON for the current locale
    const pageConfig = await import(
      `@/config/locale/messages/${locale}/pages/${jsonPath}.json`
    );
    return pageConfig.default || pageConfig;
  } catch (error) {
    try {
      // Fallback: if jsonPath is a directory, try loading its index.json
      const indexConfig = await import(
        `@/config/locale/messages/${locale}/pages/${jsonPath}/index.json`
      );
      return indexConfig.default || indexConfig;
    } catch (fallbackError) {
      return null;
    }
  }
}

// dynamic page metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;

  // metadata values
  let title = '';
  let description = '';
  let canonicalUrl = '';

  // 1. try to get static page metadata from
  // content/pages/**/*.mdx

  // static page slug
  const staticPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('/') || '';

  // filter invalid slug
  if (staticPageSlug.includes('.')) {
    return;
  }

  // build canonical url
  canonicalUrl =
    locale !== envConfigs.locale
      ? `${envConfigs.app_url}/${locale}/${staticPageSlug}`
      : `${envConfigs.app_url}/${staticPageSlug}`;

  // get static page content
  const staticPage = await getLocalPage({ slug: staticPageSlug, locale });

  // return static page metadata
  if (staticPage) {
    title = staticPage.title || '';
    description = staticPage.description || '';

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  // 2. static page not found, try to import dynamic page configuration directly
  // src/config/locale/messages/{locale}/pages/**/*.json

  const dynamicPageConfig = await getDynamicPageConfig(locale, Array.isArray(slug) ? slug : [slug]);

  if (dynamicPageConfig && dynamicPageConfig.metadata) {
    // Check for scheduled publishing
    if (dynamicPageConfig.metadata.publishedAt) {
      const publishTime = new Date(dynamicPageConfig.metadata.publishedAt);
      if (publishTime > new Date()) {
        return {
           title: 'Page Not Found', // Don't leak metadata for future pages
           description: ''
        };
      }
    }

    const dynamicMetadata = await import('@/shared/lib/seo').then(mod => mod.getMetadata({
      title: dynamicPageConfig.metadata.title,
      description: dynamicPageConfig.metadata.description,
      canonicalUrl: canonicalUrl
    })({ params: Promise.resolve({ locale }) }));

    return dynamicMetadata;
  }

  // 3. return common metadata
  const tc = await getTranslations('common.metadata');

  title = tc('title');
  description = tc('description');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 1. try to get static page from
  // content/pages/**/*.mdx

  // static page slug
  const staticPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('/') || '';

  // filter invalid slug
  if (staticPageSlug.includes('.')) {
    return notFound();
  }

  // get static page content
  const staticPage = await getLocalPage({ slug: staticPageSlug, locale });

  // return static page
  if (staticPage) {
    const Page = await getThemePage('static-page');

    return <Page locale={locale} post={staticPage} />;
  }

  // 2. static page not found
  // try to get dynamic page content from
  // src/config/locale/messages/{locale}/pages/**/*.json

  const dynamicPageConfig = await getDynamicPageConfig(locale, Array.isArray(slug) ? slug : [slug]);

  // Check for scheduled publishing
  if (dynamicPageConfig && dynamicPageConfig.metadata && dynamicPageConfig.metadata.publishedAt) {
    const publishTime = new Date(dynamicPageConfig.metadata.publishedAt);
    if (publishTime > new Date()) {
      return notFound();
    }
  }

  if (dynamicPageConfig && dynamicPageConfig.page) {
    const Page = await getThemePage('dynamic-page');
    return <Page locale={locale} page={dynamicPageConfig.page} />;
  }

  // 3. page not found
  return notFound();
}
