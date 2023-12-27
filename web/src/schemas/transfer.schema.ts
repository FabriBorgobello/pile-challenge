import { z } from 'zod';

export const transferSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  source: z.string().min(1, 'Please select a source account'),
  amount: z.number().min(1, 'Must be at least 1'),
  recipient: z.string().min(1, 'Please indicate a recipient'),
  targetIBAN: z.string().min(22, 'Must be 22 at least characters long'),
  targetBIC: z.string().min(8, 'Must be at least 8 characters long').max(11, 'Must be at most 11 characters long'),
  reference: z.string().min(1, 'A reference is required'),
});

export const transferInsertSchema = transferSchema.omit({
  id: true,
  createdAt: true,
});
