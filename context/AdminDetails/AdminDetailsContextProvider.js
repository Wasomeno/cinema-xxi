import { useContext } from "react";

import { adminDetailsContext } from "./adminDetailsContext";

export const AdminDetailsContextProvider = ({ children, adminDetails }) => {
  const AdminDetailsContext = adminDetailsContext;
  return (
    <AdminDetailsContext.Provider
      value={{
        adminDetails: adminDetails,
      }}
    >
      {children}
    </AdminDetailsContext.Provider>
  );
};
