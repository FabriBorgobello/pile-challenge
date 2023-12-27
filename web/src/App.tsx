import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

import { Actions } from '@/components/Actions';
import { Footer } from '@/components/Footer';
import { Modal } from '@/components/Modal';
import { NavBar } from '@/components/NavBar';
import { SEPAFormSkeleton } from '@/components/SEPAFormSkeleton';
import { TotalBalanceSkeleton } from '@/components/TotalBalance';
import { Title } from '@/components/Typography';
import { ModalProvider } from '@/context/ModalContext';

import { AccountSection } from './components/AccountSection';
import { ErrorFallback } from './components/ErrorComponent';

const queryClient = new QueryClient();

const SEPAForm = lazy(() => import('@/components/SEPAForm'));
const TotalBalance = lazy(() => import('@/components/TotalBalance'));

function App() {
  return (
    <Wrappers>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto flex  max-w-4xl flex-col gap-y-8 px-4 pb-8 pt-4 sm:pb-20 sm:pt-8">
          <NavBar />
          <Title>Welcome back, John!</Title>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<TotalBalanceSkeleton />}>
              <TotalBalance />
            </Suspense>
          </ErrorBoundary>
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
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
