import { Transactions } from "modules/appPages/transactionPage/TransactionPage";

import AppLayout from "@/components/Layouts/AppLayout";

export default function AppTransactionsPage() {
  return (
    <AppLayout pageTitle="Transactions">
      <Transactions />
    </AppLayout>
  );
}
