import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useUserDetails = () => {
  const account = useAccount();
  const [details, setDetails] = useState({
    user: "",
    isConnected: false,
    isReconnecting: true,
  });

  useEffect(() => {
    setDetails({
      user: account.address,
      isConnected: account.isConnected,
      isReconnecting: account.isReconnecting,
    });
  }, [account.isReconnecting, account.isConnected]);

  return details;
};
