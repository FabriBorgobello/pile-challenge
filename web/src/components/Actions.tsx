import { useModal } from '@/hooks/useModal';

import { Button } from './Button';

export function Actions() {
  const { openModal } = useModal();

  return (
    <div className="flex w-full justify-end gap-x-4">
      <Button className="w-full min-w-48 max-w-full sm:w-auto" onClick={openModal}>
        Send money
      </Button>
    </div>
  );
}
