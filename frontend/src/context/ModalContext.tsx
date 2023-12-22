import React, { createContext, useState } from 'react';

type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
