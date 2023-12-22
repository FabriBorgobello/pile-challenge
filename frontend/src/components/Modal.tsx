import React, { MouseEvent, useRef } from 'react';
import { clsx } from 'clsx';
import { useModal } from '../hooks/useModal';

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
        isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
      )}
      onClick={handleClickOutside}
    >
      {isModalOpen && (
        <div className="relative bg-white rounded-lg shadow-2xl w-96 dark:bg-black" ref={modalContentRef}>
          {children}
          <button
            onClick={closeModal}
            className="absolute top-1 right-2 p-2 rounded-full text-black hover:bg-gray-200 transition-all dark:text-white dark:hover:bg-gray-800"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
