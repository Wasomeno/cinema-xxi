import { TableRowDetailsModal } from "@/components/TableRowDetailsModal";

export const StudioDetailsModal = ({ studioDetails, closeModal }) => {
  return (
    <TableRowDetailsModal
      title={"Studio " + studioDetails.studio + " Details"}
      closeModal={closeModal}
    ></TableRowDetailsModal>
  );
};
