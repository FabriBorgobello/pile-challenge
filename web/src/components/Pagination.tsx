import { Button } from './Button';

interface PaginationProps {
  count: number;
  decrementOffset: () => void;
  incrementOffset: () => void;
  limit: number;
  offset: number;
}

export function Pagination({ count, decrementOffset, incrementOffset, limit, offset }: PaginationProps) {
  const currentPage = Math.ceil(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  const isPrevDisabled = offset <= 0;
  const isNextDisabled = offset + limit >= count;

  return (
    <>
      <div className="flex items-center justify-between text-black dark:text-white">
        <Button disabled={isPrevDisabled} variant="text" onClick={decrementOffset}>
          Previous
        </Button>
        <Button disabled={isNextDisabled} variant="text" onClick={incrementOffset}>
          Next
        </Button>
      </div>
      <p className="text-center text-black dark:text-white" data-testid="page-info">
        Page {currentPage} of {totalPages}
      </p>
    </>
  );
}
