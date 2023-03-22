import DeleteModeButton from "@/components/DeleteModeButton";
import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const CinemaShowtimesMenu = ({ toggleShowMenu, toggleDeleteMode }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Cinema showtimes menu</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
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
      </div>
    </HeaderMenuModal>
  );
};

export default CinemaShowtimesMenu;
