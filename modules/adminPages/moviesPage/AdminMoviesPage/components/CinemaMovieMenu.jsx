import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const CinemaMovieMenu = ({ toggleShowMenu, toggleDeleteMode }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <HeaderMenuLink href="/admin/movies/add" icon="plus" text="Add Movie" />
      <DeleteModeButton
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
      >
        Delete Movies
      </DeleteModeButton>
    </HeaderMenuModal>
  );
};

export default CinemaMovieMenu;
