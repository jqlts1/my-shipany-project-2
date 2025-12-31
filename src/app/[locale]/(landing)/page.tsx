import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getThemePage } from '@/core/theme';
import { DynamicPage } from '@/shared/types/blocks/landing';
import { envConfigs } from '@/config';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 1. try to get dynamic page metadata from
  // src/config/locale/messages/{locale}/pages/index.json
  try {
    const pageConfig = await import(
      `@/config/locale/messages/${locale}/pages/index.json`
    );
    const rawPage = pageConfig.default || pageConfig;

    if (rawPage?.metadata) {
      return {
        title: rawPage.metadata.title,
        description: rawPage.metadata.description,
        alternates: {
          canonical: envConfigs.app_url,
        },
      };
    }
  } catch (error) {
    // ignore error
  }

  // 2. return common metadata (fallback)
  const tc = await getTranslations('common.metadata');

  return {
    title: tc('title'),
    description: tc('description'),
    alternates: {
      canonical: envConfigs.app_url,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  try {
    // dynamically load index page config
    const pageConfig = await import(
      `@/config/locale/messages/${locale}/pages/index.json`
    );
    const rawPage = pageConfig.default || pageConfig;

    // get page data
    const page: DynamicPage = rawPage.page;

    // load page component
    const Page = await getThemePage('dynamic-page');

    return <Page locale={locale} page={page} />;
  } catch (error) {
    console.error('Failed to load home page config', error);
    return notFound();
  }
}
