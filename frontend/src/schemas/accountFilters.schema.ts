import { z } from 'zod';

export const accountQuerySchema = z.object({
  minBalance: z.number().min(0, { message: 'The minimum balance must be greater than or equal to 0' }).optional(),
  maxBalance: z.number().positive().optional(),
});

export type AccountQuery = z.infer<typeof accountQuerySchema>;
