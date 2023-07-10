export const AdminSubHeader = ({ children }) => {
  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <div className="w-2/6">
          <p className="font-poppins text-xs font-medium lg:text-sm">
            {children}
          </p>
        </div>
      </div>
    </>
  );
};
