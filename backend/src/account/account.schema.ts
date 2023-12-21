import { z } from 'zod';

export const accountSchema = z.object({
  IBAN: z.string().length(22),
  balances: z.object({
    available: z.object({
      value: z.number().positive(),
      currency: z.string().length(3),
    }),
  }),
  country: z.string().length(3),
  createdAt: z.string().transform((v) => new Date(v)),
  id: z.string().uuid(),
  name: z.string(),
});

export const accountCreateSchema = accountSchema.omit({
  id: true,
  createdAt: true,
});

export const accountUpdateSchema = accountCreateSchema.partial();

export type Account = z.infer<typeof accountSchema>;
export type AccountCreate = z.infer<typeof accountCreateSchema>;
export type AccountUpdate = z.infer<typeof accountUpdateSchema>;
