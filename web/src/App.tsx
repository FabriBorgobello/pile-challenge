import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import { AccountSection } from '@/components/AccountSection';
import { Actions } from '@/components/Actions';
import { Footer } from '@/components/Footer';
import { Modal } from '@/components/Modal';
import { NavBar } from '@/components/NavBar';
import { SEPAFormSkeleton } from '@/components/SEPAFormSkeleton';
import { TotalBalance } from '@/components/TotalBalance';
import { Title } from '@/components/Typography';
import { AccountsProvider } from '@/context/AccountContext';
import { BalanceProvider } from '@/context/BalanceContext';
import { ModalProvider } from '@/context/ModalContext';

const SEPAForm = lazy(() => import('@/components/SEPAForm'));

function App() {
  return (
    <Wrappers>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto flex  max-w-4xl flex-col gap-y-8 px-4 pb-8 pt-4 sm:pb-20 sm:pt-8">
          <NavBar />
          <Title>Welcome back, John!</Title>
          <TotalBalance />
          <Actions />
          <AccountSection />
          <hr className="border-gray-200 dark:border-gray-800" />
          <Modal>
            <Suspense fallback={<SEPAFormSkeleton />}>
              <SEPAForm />
            </Suspense>
          </Modal>
          <Toaster />
        </div>
        <Footer />
      </div>
    </Wrappers>
  );
}

function Wrappers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <AccountsProvider>
        <BalanceProvider>{children}</BalanceProvider>
      </AccountsProvider>
    </ModalProvider>
  );
}

export default App;
