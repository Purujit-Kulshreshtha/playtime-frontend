import { createContext, useContext, useState } from "react";

export type MultiPurposeModalProps = {
  isOpen: boolean;
  children: React.ReactElement;
};

type MultiPurposeModalPropsType = {
  modalProps: MultiPurposeModalProps;
  set: (modalProps: MultiPurposeModalProps) => void;
};

export const defaultModalProps: MultiPurposeModalProps = {
  isOpen: false,
  children: <></>,
};

const ModalPropsContext = createContext<MultiPurposeModalPropsType>({
  modalProps: defaultModalProps,
  set: () => {},
});

export const useModalProps = () => {
  return useContext(ModalPropsContext);
};

export const ModalPropsProvider = (props: { children: React.ReactElement }) => {
  const [modalProps, setModalProps] =
    useState<MultiPurposeModalProps>(defaultModalProps);

  return (
    <ModalPropsContext.Provider value={{ modalProps, set: setModalProps }}>
      {props.children}
    </ModalPropsContext.Provider>
  );
};
