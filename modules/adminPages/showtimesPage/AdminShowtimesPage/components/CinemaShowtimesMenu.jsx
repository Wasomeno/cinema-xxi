import DeleteModeButton from "@/components/DeleteModeButton";
import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const CinemaShowtimesMenu = ({ toggleShowMenu, toggleDeleteMode }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <HeaderMenuLink
        href="/admin/showtimes/add"
        text="Add Showtimes"
        icon="plus"
      />
      <DeleteModeButton
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
      >
        Delete Showtimes
      </DeleteModeButton>
    </HeaderMenuModal>
  );
};

export default CinemaShowtimesMenu;
