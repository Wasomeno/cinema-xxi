import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const CinemaShowtimesMenu = ({ toggleShowMenu, toggleDeleteMode }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/admin/showtimes/add"
        context="add"
        text="Add Showtimes"
      />
      <button
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
        className="flex h-full w-full items-center justify-evenly p-1"
      >
        <span className="w-1/6">
          <XMark size="4" />
        </span>
        <span className="w-4/6 text-center">
          <p className="font-poppins text-xs lg:text-sm">Delete Showtimes</p>
        </span>
      </button>
    </HeaderMenuModal>
  );
};

export default CinemaShowtimesMenu;
