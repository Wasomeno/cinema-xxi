import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientApp } from "client/reactQueryClient";
import client from "client/wagmiClient";
import dynamic from "next/dynamic";
import { Open_Sans, Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { WagmiConfig } from "wagmi";

const Loading = dynamic(() => import("./Loading"));
const Toast = dynamic(() => import("./Toast"));

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["500", "300"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={twMerge(
        poppins.variable,
        openSans.variable,
        "bg-white antialiased dark:bg-slate-800"
      )}
    >
      <QueryClientProvider client={queryClientApp}>
        <WagmiConfig client={client}>
          <Loading />
          {children}
          <Toast />
        </WagmiConfig>
      </QueryClientProvider>
      <div id="modal-portal-container" />
    </main>
  );
};

export default Layout;
