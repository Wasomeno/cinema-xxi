import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { HiXMark } from "react-icons/hi2";

import { ModalContainer } from "@/components/ModalContainer";

export const TransactionDetailsModal = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return;
  return (
    <ModalContainer closeModal={() => router.push("/app/transactions")}>
      <div className="fixed left-1/2 top-1/2 z-30 h-4/6 w-3/6 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4">
        <div className="flex justify-between">
          <h5 className="font-poppins lg:text-base">Transaction Details</h5>
          <button onClick={() => router.push("/app/transactions")}>
            <HiXMark size="20" />
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};
