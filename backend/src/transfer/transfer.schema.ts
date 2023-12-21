import { z } from 'zod';

export const transferSchema = z.object({
  id: z.string().uuid(),
  source: z.string().min(1),
  amount: z.number().positive(),
  recipientName: z.string().min(1),
  targetIBAN: z.string().length(22),
  targetBIC: z.string().length(8),
  reference: z.string().min(1),
  createdAt: z.string(),
});

export const transferCreateSchema = transferSchema.omit({
  id: true,
  createdAt: true,
});

export const transferUpdateSchema = transferCreateSchema.partial();

export type Transfer = z.infer<typeof transferSchema>;
export type TransferCreate = z.infer<typeof transferCreateSchema>;
export type TransferUpdate = z.infer<typeof transferUpdateSchema>;
