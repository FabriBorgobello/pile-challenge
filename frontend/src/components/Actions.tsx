import { useModal } from '../hooks/useModal';
import { Button } from './Button';

export function Actions() {
  const { openModal } = useModal();

  return (
    <div className="flex w-full justify-end gap-x-4">
      <Button onClick={openModal} className="w-full sm:w-auto">
        Send money
      </Button>
    </div>
  );
}