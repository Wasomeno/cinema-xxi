import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientApp } from "client/reactQueryClient";
import client from "client/wagmiClient";
import { useRouter } from "next/router";
import { WagmiConfig } from "wagmi";

import AdminLayout from "./Layouts/AdminLayout";
import AppLayout from "./Layouts/AppLayout";
import ManagerLayout from "./Layouts/ManagerLayout";
import Loading from "./Loading";
import Toast from "./Toast";

const layouts = {
  admin: AdminLayout,
  manager: ManagerLayout,
  app: AppLayout,
};

const Layout = ({ children }) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];
  const ComponentLayout = layouts[basePath];

  return basePath === "" || basePath === "about" ? (
    <main className="h-screen">{children}</main>
  ) : basePath === "admin" || basePath === "app" || basePath === "manager" ? (
    <QueryClientProvider client={queryClientApp}>
      <WagmiConfig client={client}>
        <Loading />
        <ComponentLayout>{children}</ComponentLayout>
        <Toast />
      </WagmiConfig>
    </QueryClientProvider>
  ) : (
    <>{children}</>
  );
};

export default Layout;
