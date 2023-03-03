import AnimatedContainer from "../AnimatedContainer";

const HeaderMenuModal = ({ children }) => {
  return (
    <AnimatedContainer className="absolute right-0 top-5 z-20 flex w-40 flex-col items-center justify-center gap-3 rounded-md bg-slate-50 p-3 shadow-md sm:w-48 md:w-56">
      {children}
    </AnimatedContainer>
  );
};

export default HeaderMenuModal;
