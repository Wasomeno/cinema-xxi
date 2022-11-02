import { createContext, useContext, useState } from "react";

export const AppContextDOM = ({ children, Context }) => {
  const [account, setAccount] = useState([]);
  const [adminDetails, setAdminDetails] = useState({ region: 0, cinema: 0 });
  return (
    <Context.Provider
      value={{
        account: account,
        setAccount: setAccount,
        isConnected: Boolean(account[0]),
        adminDetails: adminDetails,
        setAdminDetails: setAdminDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const appContext = createContext();
