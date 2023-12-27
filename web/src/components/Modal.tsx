import { clsx } from 'clsx';
import React, { MouseEvent, useRef } from 'react';

import { useModal } from '@/hooks/useModal';

export function Modal({ children }: { children: React.ReactNode }) {
  const { isModalOpen, closeModal } = useModal();
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it.
  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (modalContentRef.current && event.target instanceof Node && !modalContentRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300',
        isModalOpen ? 'visible opacity-100' : 'invisible opacity-0'
      )}
      onClick={handleClickOutside}
    >
      {isModalOpen && (
        <div
          ref={modalContentRef}
          className="relative w-96 rounded-lg border border-gray-700 bg-white shadow-2xl dark:bg-gray-900"
        >
          {children}
          <button
            className="absolute right-2 top-1 rounded-full p-2 text-black transition-all hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
            onClick={closeModal}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
