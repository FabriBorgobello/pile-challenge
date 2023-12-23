import { z } from 'zod';

export const IBANRegex =
  /^([A-Z]{2}[ '+'\\\\'+'-]?[0-9]{2})(?=(?:[ '+'\\\\'+'-]?[A-Z0-9]){9,30}\$)((?:[ '+'\\\\'+'-]?[A-Z0-9]{3,5}){2,7})([ '+'\\\\'+'-]?[A-Z0-9]{1,3})?\$/;

export const balanceSchema = z.number().positive();

export const accountSchema = z.object({
  IBAN: z.string().regex(IBANRegex, 'Invalid IBAN'),
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
  maxBalance: z.coerce.number().default(Infinity),
  limit: z.coerce.number().default(10),
  offset: z.coerce.number().default(0),
});

export type AccountFilter = z.infer<typeof accountFilterSchema>;
export type Account = z.infer<typeof accountSchema>;
