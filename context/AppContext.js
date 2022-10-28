import { createContext, useContext, useState } from "react";

export const AppContextDOM = ({ children, Context }) => {
  const [account, setAccount] = useState([]);
  return (
    <Context.Provider
      value={{
        account: account,
        setAccount: setAccount,
        isConnected: Boolean(account[0]),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const appContext = createContext();
