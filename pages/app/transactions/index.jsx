import { UserTransactions } from "modules/appPages/ticketPages/TicketPage";

import AppLayout from "@/components/Layouts/AppLayout";

export default function AppTransactionsPage() {
  return (
    <AppLayout pageTitle="Transactions">
      <UserTransactions />
    </AppLayout>
  );
}
