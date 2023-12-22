import { Suspense, lazy, useState } from 'react';
import { AccountList } from './components/AccountList';
import { Modal } from './components/Modal';
import { TotalBalance } from './components/TotalBalance';
import { Title } from './components/Typography';
import { AccountsProvider } from './context/AccountContext';
import { SEPAFormSkeleton } from './components/SEPAFormSkeleton';

const SEPAForm = lazy(() => import('./components/SEPAForm'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AccountsProvider>
      <div className="bg-white dark:bg-black min-h-screen">
        <div className="container py-8 px-4 max-w-2xl max-h-screen mx-auto flex flex-col gap-y-8 overflow-hidden bg-white dark:bg-black">
          <Title>Pile coding challenge</Title>
          <TotalBalance />
          <AccountList onOpenModal={() => setIsModalOpen(true)} />
          <Modal isOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)}>
            <Suspense fallback={<SEPAFormSkeleton />}>
              <SEPAForm />
            </Suspense>
          </Modal>
        </div>
      </div>
    </AccountsProvider>
  );
}

export default App;
