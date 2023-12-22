import { useAccount } from '../hooks/useAccounts';
import { Button } from './Button';

export function Pagination() {
  const { setOffset, count, limit, offset, currentPage } = useAccount();

  const totalPages = Math.ceil(count / limit);
  const isPrevDisabled = offset <= 0;
  const isNextDisabled = offset + limit >= count;

  function scrollToAccountSection() {
    document.getElementById('account-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div className="flex items-center justify-between text-black dark:text-white">
        <Button
          variant="text"
          onClick={() => {
            setOffset((prev) => Math.max(prev - limit, 0));
            scrollToAccountSection();
          }}
          disabled={isPrevDisabled}
        >
          Previous
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setOffset((prev) => Math.min(prev + limit, (totalPages - 1) * limit));
            scrollToAccountSection();
          }}
          disabled={isNextDisabled}
        >
          Next
        </Button>
      </div>
      <p className="text-center text-black dark:text-white">
        Page {currentPage} of {totalPages}
      </p>
    </>
  );
}
