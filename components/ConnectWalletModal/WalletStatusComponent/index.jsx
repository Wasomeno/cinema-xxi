import { useConnect } from "wagmi";

import { WalletError } from "./WalletError";
import { WalletIdle } from "./WalletIdle";
import { WalletLoading } from "./WalletLoading";
import { WalletSuccess } from "./WalletSuccess";

const WalletStatusComponent = ({ toggleWalletModal }) => {
  const { connect, connectors, status, error } = useConnect();
  const walletComponents = {
    loading: WalletLoading,
    error: WalletError,
    success: WalletSuccess,
    idle: WalletIdle,
  };
  const WalletStatus = walletComponents[status];

  return (
    <WalletStatus
      connectors={connectors}
      connect={connect}
      error={error}
      toggleWalletModal={toggleWalletModal}
    />
  );
};

export default WalletStatusComponent;
