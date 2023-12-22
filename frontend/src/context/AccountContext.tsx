import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Account } from '../types';

interface AccountsResponse {
  accounts: Account[];
  highestBalance: number;
  count: number;
}

interface AccountContextData {
  accounts: Account[];
  highestBalance: number;
  count: number;
  loading: 'idle' | 'pending' | 'success' | 'error';
  error: Error | null;
  limit: number;
  offset: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

interface AccountsProviderProps {
  children: ReactNode;
}

// Create Context
export const AccountContext = createContext<AccountContextData | undefined>(undefined);

// Provider Component
export const AccountsProvider = ({ children }: AccountsProviderProps) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [highestBalance, setHighestBalance] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  // Pagination settings
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  // Function to fetch accounts
  const fetchAccounts = useCallback(async () => {
    setLoading('pending');
    setError(null);
    setAccounts([]);
    try {
      const response = await fetch(`http://localhost:3000/account?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AccountsResponse = await response.json();
      setAccounts(data.accounts);
      setHighestBalance(data.highestBalance);
      setCount(data.count);
      setLoading('success');
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
      setLoading('error');
    }
  }, [limit, offset]);

  // Effect to fetch accounts
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts, limit, offset]);

  return (
    <AccountContext.Provider
      value={{ accounts, highestBalance, count, loading, error, setLimit, setOffset, limit, offset }}
    >
      {children}
    </AccountContext.Provider>
  );
};
