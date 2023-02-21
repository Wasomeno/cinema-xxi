export const WalletIdle = ({ connectors, connect }) => {
  return (
    <>
      <div className="my-2">
        <p className="font-poppins text-sm text-white">Connect a Wallet</p>
      </div>
      <div className="my-2 flex flex-col gap-4">
        {connectors.map((connector, index) => (
          <button
            key={index}
            onClick={() => connect({ connector: connector, chainId: 5 })}
            className="font-poppins w-full rounded-lg bg-slate-700 p-3 text-sm tracking-wide text-white"
          >
            Metamask Wallet
          </button>
        ))}
      </div>
    </>
  );
};
