import { useAccount } from '@/hooks/useAccounts';

import { Button } from './Button';

export function Pagination() {
  const { setOffset, count, limit, offset, currentPage } = useAccount();

  const totalPages = Math.ceil(count / limit);
  const isPrevDisabled = offset <= 0;
  const isNextDisabled = offset + limit >= count;

  // Scroll to the top of the account section when the page changes
  function scrollToAccountSection() {
    document.getElementById('account-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div className="flex items-center justify-between text-black dark:text-white">
        <Button
          disabled={isPrevDisabled}
          variant="text"
          onClick={() => {
            setOffset((prev) => Math.max(prev - limit, 0));
            scrollToAccountSection();
          }}
        >
          Previous
        </Button>
        <Button
          disabled={isNextDisabled}
          variant="text"
          onClick={() => {
            setOffset((prev) => Math.min(prev + limit, (totalPages - 1) * limit));
            scrollToAccountSection();
          }}
        >
          Next
        </Button>
      </div>
      <p className="text-center text-black dark:text-white" data-testid="page-info">
        Page {currentPage} of {totalPages}
      </p>
    </>
  );
}
