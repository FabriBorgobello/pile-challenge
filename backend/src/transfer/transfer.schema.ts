import { z } from 'zod';

export const transferSchema = z.object({
  id: z.string().uuid(),
  source: z.string().length(22),
  amount: z.number().positive(),
  recipientName: z.string(),
  targetIBAN: z.string().length(22),
  targetBIC: z.string().length(8),
  reference: z.string(),
  createdAt: z.string().transform((v) => new Date(v)),
});

export const transferCreateSchema = transferSchema.omit({
  id: true,
  createdAt: true,
});

export const transferUpdateSchema = transferCreateSchema.partial();

export type Transfer = z.infer<typeof transferSchema>;
export type TransferCreate = z.infer<typeof transferCreateSchema>;
export type TransferUpdate = z.infer<typeof transferUpdateSchema>;
