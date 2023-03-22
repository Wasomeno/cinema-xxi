import { useLayoutEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useUserConnectionDetails = () => {
  const account = useAccount();

  const [details, setDetails] = useState({
    user: "",
    isConnected: true,
    isReconnecting: false,
    isConnecting: false,
  });

  useLayoutEffect(() => {
    setDetails((currentDetails) => ({
      ...currentDetails,
      user: account.address,
      isConnected: account.isConnected,
      isReconnecting: account.isReconnecting,
      isConnecting: account.isConnecting,
    }));
  }, [account.status]);

  return details;
};
