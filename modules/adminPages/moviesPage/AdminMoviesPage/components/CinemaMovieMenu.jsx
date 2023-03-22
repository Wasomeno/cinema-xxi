import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const CinemaMovieMenu = ({ toggleShowMenu, toggleDeleteMode }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Cinema movies menu</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HeaderMenuLink href="/admin/movies/add" icon="plus" text="Add Movie" />
        <DeleteModeButton
          onClick={() => {
            toggleShowMenu();
            toggleDeleteMode();
          }}
        >
          Delete Movies
        </DeleteModeButton>
      </div>
    </HeaderMenuModal>
  );
};

export default CinemaMovieMenu;
