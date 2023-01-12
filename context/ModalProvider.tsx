import React, { createContext, useContext, useState } from "react";
import { ModalProviderType } from "../types/ModalProvider.type";
const ModalContext = createContext({} as ModalProviderType);
const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalView, updateModalView] = useState<boolean>(false);
  const openModal = () => {
    updateModalView(true);
  };
  const closeModal = () => {
    updateModalView(false);
  };
  return (
    <ModalContext.Provider value={{ modalView,openModal,closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const contextReceived = useContext(ModalContext);
  if (contextReceived === undefined) {
    throw new Error("useModal hook must be used within a modal provider");
  }
  return contextReceived;
};
export { ModalProvider, useModal };
