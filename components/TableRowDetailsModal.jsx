import { HiXMark } from "react-icons/hi2";

import { CenteredModalContainer } from "./ModalContainer";

export const TableRowDetailsModal = ({ title, children, closeModal }) => {
  return (
    <CenteredModalContainer title={title} closeModal={closeModal}>
      {children}
    </CenteredModalContainer>
  );
};
