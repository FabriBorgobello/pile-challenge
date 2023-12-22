import { useAccount } from '../hooks/useAccounts';
import { Button } from './Button';

export function Pagination() {
  const { setOffset, count, limit, offset } = useAccount();

  const totalPages = Math.ceil(count / limit);
  const isPrevDisabled = offset <= 0;
  const isNextDisabled = offset + limit >= count;

  return (
    <div className="flex items-center justify-between text-black dark:text-white">
      <Button variant="text" onClick={() => setOffset((prev) => Math.max(prev - limit, 0))} disabled={isPrevDisabled}>
        Previous
      </Button>
      <Button
        variant="text"
        onClick={() => setOffset((prev) => Math.min(prev + limit, (totalPages - 1) * limit))}
        disabled={isNextDisabled}
      >
        Next
      </Button>
    </div>
  );
}
