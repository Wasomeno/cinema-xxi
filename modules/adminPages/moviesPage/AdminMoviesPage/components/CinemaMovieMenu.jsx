import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const CinemaMovieMenu = ({ toggleShowMenu, toggleDeleteMode }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink href="/admin/movies/add" context="add" text="Add Movie" />
      <button
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
        className="flex h-full w-full items-center justify-evenly p-1 text-sm"
      >
        <div className="w-1/6">
          <XMark size="4" />
        </div>
        <div className="w-4/6 text-center">
          <p className="font-poppins text-xs">Delete Movies</p>
        </div>
      </button>
    </HeaderMenuModal>
  );
};

export default CinemaMovieMenu;
