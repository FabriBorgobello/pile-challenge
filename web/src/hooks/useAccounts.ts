import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Account, FilterValues } from '@/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

interface AccountsResponse {
  accounts: Account[];
  highestBalance: number;
  count: number;
}

async function getAccounts(limit: number, offset: number, filters: FilterValues): Promise<AccountsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    minBalance: filters.minBalance.toString(),
    maxBalance: filters.maxBalance.toString(),
  });
  const res = await fetch(`${BASE_URL}/account?${params}`);
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

export interface UseAccounts {
  accounts: Account[];
  highestBalance: number;
  count: number;
  limit: number;
  offset: number;
  isLoading: boolean;
  error: Error | null;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  incrementOffset: () => void;
  decrementOffset: () => void;
  balanceRange: FilterValues;
  setBalanceRange: (balanceRange: FilterValues) => void;
}

export const useAccounts = (initialLimit = 10, initialOffset = 0): UseAccounts => {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(initialOffset);
  const [balanceRange, setBalanceRange] = useState<FilterValues>({
    minBalance: 0,
    maxBalance: Number.MAX_SAFE_INTEGER,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts', limit, offset, { ...balanceRange }],
    queryFn: () => getAccounts(limit, offset, balanceRange),
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
    balanceRange,
    setBalanceRange,
  };
};
