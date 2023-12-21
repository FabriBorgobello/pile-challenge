import { Suspense, lazy, useState } from 'react';
import { AccountItem, AccountItemSkeleton } from './AccountItem';
import { Button } from './Button';
import { Subtitle } from './Typography';
import { Modal } from './Modal';
import { SEPAFormSkeleton } from './SEPAFormSkeleton';
import { useAccounts } from '../hooks/useAccounts';

const SEPAForm = lazy(() => import('./SEPAForm'));

export function AccountList() {
  const { data: accounts, error, status } = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (status === 'error') {
    return <p>{error?.message || 'Unknown error'}</p>;
  }

  return (
    <div className="flex flex-col gap-y-4 overflow-y-hidden">
      <div className="flex justify-between items-center">
        <Subtitle>Accounts</Subtitle>
        <Button onClick={() => setIsModalOpen(true)}>Send Money</Button>
      </div>
      <ul className="flex flex-col mt-4 gap-y-2 overflow-scroll max-h-svh">
        {status === 'idle' || status === 'loading'
          ? Array.from({ length: 5 }).map((_, index) => <AccountItemSkeleton key={index} />)
          : accounts.map((account) => <AccountItem account={account} key={account.id} />)}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Suspense fallback={<SEPAFormSkeleton />}>
          <SEPAForm />
        </Suspense>
      </Modal>
    </div>
  );
}
