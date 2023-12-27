import { z } from 'zod';

import { IBANRegex } from '@/account/account.schema';

export const transferSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  source: z.string().min(1),
  amount: z.number().min(1),
  recipient: z.string().min(1),
  targetIBAN: z.string().regex(IBANRegex, 'Invalid IBAN'),
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
