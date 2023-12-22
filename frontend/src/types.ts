import { z } from 'zod';
import { transferInsertSchema, transferSchema } from './schemas/transfer.schema';
import { accountSchema, balanceSchema } from './schemas/account.schema.';

/** TRANSFER */
export type Transfer = z.infer<typeof transferSchema>;
export type TransferInsert = z.infer<typeof transferInsertSchema>;

/** ACCOUNT */
export type Account = z.infer<typeof accountSchema>;
export type AccountBalanceUpdate = z.infer<typeof balanceSchema>;

/** BALANCE */
export type Balance = {
  balance: number;
  currency: string;
  count: number;
};
