import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Account } from '../types';

interface AccountsResponse {
  accounts: Account[];
  highestBalance: number;
  count: number;
}

interface AccountsQuery {
  limit: number;
  offset: number;
  filters?: Record<string, string | number>;
}

interface AccountContextData {
  accounts: Account[];
  count: number;
  currentPage: number;
  error: Error | null;
  highestBalance: number;
  limit: number;
  offset: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  status: 'idle' | 'pending' | 'success' | 'error';
  applyFilters: (filters: Record<string, string | number>) => void;
}

export const AccountContext = createContext<AccountContextData | undefined>(undefined);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [highestBalance, setHighestBalance] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  // Pagination settings
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const currentPage = offset / limit + 1;

  // Filter settings
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  // Apply filters and reset offset to 0 (to fetch the first page)
  function applyFilters(filters: Record<string, string | number>) {
    setFilters(filters);
    setOffset(0);
  }

  const fetchAccounts = useCallback(async ({ limit = 10, offset = 0, filters = {} }: AccountsQuery) => {
    setStatus('pending');
    setError(null);
    setAccounts([]);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });

      // Add filters to the query params
      Object.entries(filters).forEach(([key, value]) => {
        params.set(key, value.toString());
      });

      const response = await fetch(`http://localhost:3000/account?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AccountsResponse = await response.json();
      setAccounts(data.accounts);
      setHighestBalance(data.highestBalance);
      setCount(data.count);
      setStatus('success');
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchAccounts({ limit, offset, filters });
  }, [fetchAccounts, filters, limit, offset]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        highestBalance,
        count,
        status,
        error,
        setLimit,
        setOffset,
        limit,
        offset,
        currentPage,
        applyFilters,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
