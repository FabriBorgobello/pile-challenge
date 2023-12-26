import React, { createContext, useEffect, useState } from 'react';

import { Balance, DataContextType, LoadingState } from '../types';

export const BalanceContext = createContext<DataContextType<Balance, unknown>>({
  data: null,
  state: 'idle',
  error: null,
  fetchData: () => new Promise(() => {}),
});

export const BalanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  const [error, setError] = useState<Error | null>(null);

  const fetchBalance = async () => {
    setState('loading');
    try {
      const response = await fetch('http://localhost:3000/account/balance');
      const jsonBalance = await response.json();
      setBalance(jsonBalance);
      setState('success');
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setState('error');
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <BalanceContext.Provider value={{ data: balance, state, error, fetchData: fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
