import { HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import AnimatedContainer from "./AnimatedContainer";
import { ModalContainer } from "./ModalContainer";

const FormModalContainer = ({
  title = "",
  children,
  closeModal,
  onSubmit,
  className,
}) => {
  return (
    <ModalContainer closeModal={closeModal}>
      <AnimatedContainer
        className={twMerge(
          "fixed inset-x-1/2 inset-y-1/2 z-30 h-full w-full -translate-x-1/2  -translate-y-1/2 rounded-lg bg-slate-100 px-6 py-4 shadow-md dark:bg-slate-700 sm:h-3/6 sm:w-4/6 lg:h-5/6 lg:w-4/6",
          className
        )}
      >
        <div className="mb-4 mt-2 flex items-center justify-between">
          <h3 className="font-poppins text-sm tracking-wider lg:text-lg">
            {title}
          </h3>
          <button onClick={closeModal}>
            <HiXMark size="20" />
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
            closeModal();
          }}
          className="flex h-5/6 flex-col gap-4 overflow-y-scroll"
        >
          {children}
        </form>
      </AnimatedContainer>
    </ModalContainer>
  );
};

const Input = ({ type = "", labelText = "", value, setValue }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs lg:text-sm">{labelText}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="rounded-lg border border-slate-600 bg-transparent px-2 py-2 text-xs lg:text-sm"
      />
    </div>
  );
};

const Submit = ({ text = "" }) => {
  return (
    <div className="my-3 text-center">
      <button className="h-10 w-44 rounded-lg bg-slate-100 font-poppins text-xs font-medium shadow-md transition duration-200 hover:bg-green-200 dark:bg-slate-500 dark:bg-opacity-75 lg:text-sm">
        {text}
      </button>
    </div>
  );
};

FormModalContainer.Input = Input;
FormModalContainer.Submit = Submit;

export default FormModalContainer;
