import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Account } from '@/types';

interface AccountsResponse {
  accounts: Account[];
  highestBalance: number;
  count: number;
}

async function getAccounts(limit: number, offset: number): Promise<AccountsResponse> {
  const params = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
  const res = await fetch(`http://localhost:3000/account?${params}`);
  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new Error('Unauthorized');
      case 403:
        throw new Error('Forbidden');
      case 404:
        throw new Error('Not found');
      default:
        throw new Error('Something went wrong');
    }
  }
  return res.json();
}

export const useAccounts = (initialLimit = 10, initialOffset = 0) => {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(initialOffset);

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['accounts', limit, offset],
    queryFn: () => getAccounts(limit, offset),
  });

  const totalCount = data ? data.count : 0;

  const incrementOffset = () => {
    const maxOffset = Math.max(0, totalCount - limit);
    setOffset((currentOffset) => Math.min(currentOffset + limit, maxOffset));
  };

  const decrementOffset = () => {
    setOffset((currentOffset) => Math.max(currentOffset - limit, 0));
  };

  return {
    accounts: data ? data.accounts : [],
    highestBalance: data ? data.highestBalance : 0,
    count: totalCount,
    limit,
    offset,
    isLoading,
    error,
    setLimit,
    setOffset,
    incrementOffset,
    decrementOffset,
  };
};
