export const WalletIdle = ({ connectors, connect }) => {
  return (
    <>
      <div className="my-2">
        <p className="font-poppins text-sm">Connect a Wallet</p>
      </div>
      <div className="my-2 flex flex-col gap-4">
        {connectors.map((connector, index) => (
          <button
            key={index}
            onClick={() => connect({ connector: connector, chainId: 11155111 })}
            className="w-full rounded-lg bg-slate-200 p-3 font-poppins text-sm tracking-wide dark:bg-slate-700"
          >
            Metamask Wallet
          </button>
        ))}
      </div>
    </>
  );
};
