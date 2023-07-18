import { HiXMark } from "react-icons/hi2";

import AnimatedContainer from "./AnimatedContainer";
import { ModalContainer } from "./ModalContainer";

export const TableRowDetailsModal = ({ title, children, closeModal }) => {
  return (
    <ModalContainer toggleModal={closeModal}>
      <AnimatedContainer className="fixed inset-x-1/2 inset-y-1/2 z-30 h-5/6 w-3/6 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-200 px-6 py-4 shadow-md dark:bg-slate-700">
        <div className="my-4 flex items-center justify-between">
          <h3 className="font-poppins text-lg tracking-wider">{title}</h3>
          <button onClick={closeModal}>
            <HiXMark />
          </button>
        </div>
        <div className="flex flex-col gap-2">{children}</div>
      </AnimatedContainer>
    </ModalContainer>
  );
};
