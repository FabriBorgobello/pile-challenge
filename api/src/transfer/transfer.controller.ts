import { getAccount } from '@/account/account.controller';
import { BadRequestError, InvalidZodError } from '@/utils/ApiError';

import { TransferCreate, transferCreateSchema } from './transfer.schema';

export async function createTransfer(body: TransferCreate) {
  const safeBody = transferCreateSchema.safeParse(body);

  if (!safeBody.success) {
    throw new InvalidZodError(safeBody.error);
  }

  // Check if account has sufficient funds
  const { source, amount } = safeBody.data;
  const account = await getAccount(source);
  if (account.balances.available.value < amount) {
    throw new BadRequestError('Insufficient funds');
  }

  console.log('\x1b[32m', '✅ Success! Transfer created.', '\x1b[0m');
  console.log(safeBody.data);
  return safeBody.data;
}
