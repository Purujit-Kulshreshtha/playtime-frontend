import { AnimatePresence, motion } from "framer-motion";
import {
  defaultModalProps,
  useModalProps,
} from "../context/ModalPropsProvider";

const MultiPurposeModal = () => {
  const { modalProps, set } = useModalProps();

  const closeModal = () => {
    set(defaultModalProps);
  };
  return (
    <AnimatePresence>
      {modalProps.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => closeModal()}
          className="bg-slate-900/60 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className=" bg-gradient-to-br from-teal-600 to-teal-900 text-white p-6 rounded-3xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {modalProps.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiPurposeModal;
