const AdminHeader = ({ children }) => {
  return (
    <div className="flex items-center justify-start">
      <div className="space-y-1">
        <h1 className="font-poppins text-sm font-medium sm:text-lg lg:text-xl">
          {children}
        </h1>
      </div>
    </div>
  );
};

export default AdminHeader;
