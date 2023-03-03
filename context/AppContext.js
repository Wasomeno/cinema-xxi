import { createContext, useContext, useState } from "react";

export const appContext = createContext();

export const AppContextDOM = ({ children }) => {
  const Context = appContext;
  const [adminDetails, setAdminDetails] = useState({ region: 0, cinema: 0 });
  return (
    <Context.Provider
      value={{
        adminDetails: adminDetails,
        setAdminDetails: setAdminDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAdminDetailsContext() {
  const { adminDetails } = useContext(appContext);
  return adminDetails;
}
