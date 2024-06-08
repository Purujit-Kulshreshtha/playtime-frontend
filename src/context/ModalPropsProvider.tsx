import { createContext, useContext, useState } from "react";

export type MultiPurposeModalProps = {
  isOpen: boolean;
  children: React.ReactElement;
};

type MultiPurposeModalPropsType = {
  modalProps: MultiPurposeModalProps;
  set: (modalProps: MultiPurposeModalProps) => void;
};

export const defaultModalProp: MultiPurposeModalProps = {
  isOpen: false,
  children: <></>,
};

const ModalPropsContext = createContext<MultiPurposeModalPropsType>({
  modalProps: defaultModalProp,
  set: () => {},
});

export const useModalProps = () => {
  return useContext(ModalPropsContext);
};

export const ModalPropsProvider = (props: { children: React.ReactElement }) => {
  const [modalProps, setModalProps] =
    useState<MultiPurposeModalProps>(defaultModalProp);

  return (
    <ModalPropsContext.Provider value={{ modalProps, set: setModalProps }}>
      {props.children}
    </ModalPropsContext.Provider>
  );
};
