import { z } from 'zod';

export const balanceSchema = z.number().positive();

/** Account */
export const accountSchema = z.object({
  IBAN: z.string().min(22),
  balances: z.object({
    available: z.object({
      value: balanceSchema,
      currency: z.string().length(3),
    }),
  }),
  country: z.string().length(3),
  createdAt: z.string(),
  id: z.string().uuid(),
  name: z.string(),
});

export const accountFilterSchema = z.object({
  minBalance: z.coerce.number().default(0),
  maxBalance: z.coerce.number().default(Number.MAX_SAFE_INTEGER),
  limit: z.coerce.number().default(10),
  offset: z.coerce.number().default(0),
});

export type Account = z.infer<typeof accountSchema>;
export type AccountFilter = z.infer<typeof accountFilterSchema>;

/** Transfer */
export const transferSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  source: z.string().min(1),
  amount: z.number().min(1),
  recipient: z.string().min(1),
  targetIBAN: z.string().min(22),
  targetBIC: z.string().min(8),
  reference: z.string().min(1),
});

export const transferCreateSchema = transferSchema.omit({
  id: true,
  createdAt: true,
});

export const transferUpdateSchema = transferCreateSchema.partial();

export type Transfer = z.infer<typeof transferSchema>;
export type TransferCreate = z.infer<typeof transferCreateSchema>;
export type TransferUpdate = z.infer<typeof transferUpdateSchema>;
