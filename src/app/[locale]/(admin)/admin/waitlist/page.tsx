import { getTranslations } from 'next-intl/server';

import { PERMISSIONS, requirePermission } from '@/core/rbac';
import { Header, Main, MainHeader } from '@/shared/blocks/dashboard';
import { TableCard } from '@/shared/blocks/table';
import { Badge } from '@/shared/components/ui/badge';
import {
  getWaitlist,
  getWaitlistCount,
  WaitlistEntry,
} from '@/shared/models/waitlist';
import { Crumb, Search } from '@/shared/types/blocks/common';
import { type Table } from '@/shared/types/blocks/table';

export default async function AdminWaitlistPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: number;
    pageSize?: number;
    email?: string;
  }>;
}) {
  const { locale } = await params;

  // Check if user has permission to read users (reusing USERS_READ for simplicity)
  await requirePermission({
    code: PERMISSIONS.USERS_READ,
    redirectUrl: '/admin/no-permission',
    locale,
  });

  const t = await getTranslations('admin.waitlist');

  const { page: pageNum, pageSize, email } = await searchParams;
  const page = pageNum || 1;
  const limit = pageSize || 30;

  const total = await getWaitlistCount({
    email,
  });
  const data = await getWaitlist({
    email,
    page,
    limit,
  });

  const crumbs: Crumb[] = [
    { title: t('list.crumbs.admin'), url: '/admin' },
    { title: t('list.crumbs.waitlist'), is_active: true },
  ];

  const search: Search = {
    name: 'email',
    title: t('list.search.email.title'),
    placeholder: t('list.search.email.placeholder'),
    value: email,
  };

  const table: Table = {
    columns: [
      { name: 'id', title: t('fields.id'), type: 'copy' },
      { name: 'email', title: t('fields.email'), type: 'copy' },
      {
        name: 'status',
        title: t('fields.status'),
        callback: (item: WaitlistEntry) => (
          <Badge variant={item.status === 'joined' ? 'default' : 'secondary'}>
            {item.status}
          </Badge>
        ),
      },
      { name: 'createdAt', title: t('fields.created_at'), type: 'time' },
    ],
    data: data,
    pagination: {
      total,
      page,
      limit,
    },
  };

  return (
    <>
      <Header crumbs={crumbs} />
      <Main>
        <MainHeader title={t('list.title')} search={search} />
        <TableCard table={table} />
      </Main>
    </>
  );
}
