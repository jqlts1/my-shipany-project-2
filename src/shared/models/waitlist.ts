import { asc, count, desc, eq, ilike } from 'drizzle-orm';

import { waitlist } from '@/config/db/schema';
import { db } from '@/core/db';

export const getWaitlistCount = async ({
  email,
}: {
  email?: string;
} = {}) => {
  const where = email ? ilike(waitlist.email, `%${email}%`) : undefined;

  const data = await db()
    .select({ count: count() })
    .from(waitlist)
    .where(where);

  return data[0].count;
};

export const getWaitlist = async ({
  page = 1,
  limit = 20,
  email,
}: {
  page?: number;
  limit?: number;
  email?: string;
} = {}) => {
  const offset = (page - 1) * limit;

  const where = email ? ilike(waitlist.email, `%${email}%`) : undefined;

  const data = await db()
    .select()
    .from(waitlist)
    .where(where)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(waitlist.createdAt));

  return data;
};

export type WaitlistEntry = Awaited<ReturnType<typeof getWaitlist>>[number];
