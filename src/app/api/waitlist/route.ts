import { nanoid } from 'nanoid';
import { z } from 'zod';

import { db } from '@/core/db';
import { waitlist } from '@/config/db/schema';
import { respData, respErr } from '@/shared/lib/resp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const schema = z.object({
      email: z.string().email(),
    });

    const result = schema.safeParse(body);

    if (!result.success) {
      return respErr(result.error.issues[0].message);
    }

    const { email } = result.data;

    // Check if email already exists
    const existing = await db().query.waitlist.findFirst({
      where: (table: any, { eq }: any) => eq(table.email, email),
    });

    if (existing) {
      return respData({ message: 'You are already on the waitlist!' });
    }

    await db().insert(waitlist).values({
      id: nanoid(),
      email,
      status: 'pending',
    });

    return respData({ message: 'Successfully joined the waitlist!' });
  } catch (e: any) {
    console.error('Join waitlist failed:', e);
    return respErr('Join waitlist failed');
  }
}
