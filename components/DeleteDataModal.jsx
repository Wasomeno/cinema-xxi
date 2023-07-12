import { RxCrossCircled } from "react-icons/rx";

import AnimatedContainer from "@/components/AnimatedContainer";
import { ModalContainer } from "@/components/ModalContainer";

export const DeleteDataModal = ({
  closeModal,
  title,
  description,
  deleteFunction,
}) => {
  return (
    <ModalContainer closeModal={closeModal}>
      <AnimatedContainer className="fixed inset-x-1/2 inset-y-1/2 z-30 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-200 px-6 py-4 shadow-md dark:bg-slate-900 lg:h-80 lg:w-80">
        <div className="flex h-5/6 w-full flex-col items-center justify-center gap-2">
          <h5 className="font-poppins text-sm font-medium tracking-wider lg:text-base">
            {title}
          </h5>
          <RxCrossCircled size="30" className="text-red-600" />
          <p className="text-xs tracking-wider lg:text-sm">{description}</p>
        </div>
        <div className="flex h-1/6 items-center justify-center gap-4">
          <button
            onClick={() => {
              deleteFunction();
              closeModal();
            }}
            className="h-9 w-28 rounded-lg bg-green-600 text-xs text-slate-100 lg:text-sm"
          >
            Continue
          </button>
          <button
            onClick={closeModal}
            className="h-9 w-28 rounded-lg bg-red-600 text-xs text-slate-100 lg:text-sm"
          >
            Cancel
          </button>
        </div>
      </AnimatedContainer>
    </ModalContainer>
  );
};
