export const ManagerSubHeader = ({ children }) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="w-2/6">
        <p className="font-poppins text-xs tracking-wide lg:text-base">
          {children}
        </p>
      </div>
    </div>
  );
};
