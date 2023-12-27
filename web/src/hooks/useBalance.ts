import { useSuspenseQuery } from '@tanstack/react-query';

import { Balance } from '@/types';

async function getBalance(): Promise<Balance> {
  const res = await fetch('http://localhost:3000/account/balance');
  return res.json();
}
export function useBalance() {
  return useSuspenseQuery({
    queryKey: ['balance'],
    queryFn: getBalance,
  });
}
