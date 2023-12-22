import { Suspense, lazy } from 'react';
import { AccountList } from './components/AccountList';
import { Modal } from './components/Modal';
import { TotalBalance } from './components/TotalBalance';
import { Title } from './components/Typography';
import { AccountsProvider } from './context/AccountContext';
import { SEPAFormSkeleton } from './components/SEPAFormSkeleton';
import { ModalProvider } from './context/ModalContext';
import { BalanceProvider } from './context/BalanceContext';
import { Toaster } from 'react-hot-toast';

const SEPAForm = lazy(() => import('./components/SEPAForm'));

function App() {
  return (
    <ModalProvider>
      <AccountsProvider>
        <BalanceProvider>
          <div className="min-h-screen bg-white dark:bg-black">
            <div className="container mx-auto flex max-h-screen max-w-4xl flex-col gap-y-8 overflow-hidden bg-white px-4 py-8 sm:py-20 dark:bg-black">
              <Title>Pile coding challenge</Title>
              <TotalBalance />
              <hr className="border-gray-200 dark:border-gray-800" />
              <AccountList />
              <Modal>
                <Suspense fallback={<SEPAFormSkeleton />}>
                  <SEPAForm />
                </Suspense>
              </Modal>
              <Toaster />
            </div>
          </div>
        </BalanceProvider>
      </AccountsProvider>
    </ModalProvider>
  );
}

export default App;
