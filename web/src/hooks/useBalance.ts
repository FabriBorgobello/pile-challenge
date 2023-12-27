import { useSuspenseQuery } from '@tanstack/react-query';

import { Balance } from '@/types';

const BASE_URL = import.meta.env.API_BASE_URL ?? 'http://localhost:3000';

async function getBalance(): Promise<Balance> {
  const res = await fetch(`${BASE_URL}/account/balance`);
  return res.json();
}
export function useBalance() {
  return useSuspenseQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
  });
}
