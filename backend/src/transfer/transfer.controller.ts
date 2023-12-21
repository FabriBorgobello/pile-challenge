import { InvalidZodError } from '@/utils/ApiError';
import { TransferCreate, transferCreateSchema } from './transfer.schema';

export async function createTransfer(body: TransferCreate) {
  const safeBody = transferCreateSchema.safeParse(body);

  if (!safeBody.success) {
    throw new InvalidZodError(safeBody.error);
  }
  console.log(safeBody.data);
  return safeBody.data;
}
