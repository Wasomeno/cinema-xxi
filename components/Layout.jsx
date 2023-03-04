import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientApp } from "client/reactQueryClient";
import client from "client/wagmiClient";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { WagmiConfig } from "wagmi";

const layouts = {
  admin: dynamic(() =>
    import("./Layouts/AdminLayout").then((component) => component.AdminLayout)
  ),
  manager: dynamic(() => import("./Layouts/ManagerLayout")),
  app: dynamic(() => import("./Layouts/AppLayout")),
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "500",
});

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];

  const Loading = dynamic(() => import("./Loading"));
  const Toast = dynamic(() => import("./Toast"));
  const ComponentLayout = layouts[basePath];

  return (
    <main className={poppins.variable + " " + "h-screen"}>
      {basePath === "" || basePath === "about" ? (
        children
      ) : basePath === "admin" ||
        basePath === "app" ||
        basePath === "manager" ? (
        <QueryClientProvider client={queryClientApp}>
          <WagmiConfig client={client}>
            <Loading />
            <ComponentLayout>{children}</ComponentLayout>
            <Toast />
          </WagmiConfig>
        </QueryClientProvider>
      ) : (
        <>{children}</>
      )}
    </main>
  );
};

export default Layout;
