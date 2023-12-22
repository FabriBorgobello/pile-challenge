import { useEffect, useState } from 'react';
import { Account } from '../types';

export function useAccounts() {
  const [data, setData] = useState<Account[]>([]);
  const [error, setError] = useState<Error | null>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  async function fetchAccounts() {
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:3000/account');
      const data = await response.json();
      setData(data);
      setStatus('success');
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('Unknown error'));
      }
      setStatus('error');
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { data, error, status };
}
