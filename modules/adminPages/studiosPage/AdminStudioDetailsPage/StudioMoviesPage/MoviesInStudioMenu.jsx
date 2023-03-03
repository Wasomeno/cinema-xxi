import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const MoviesInStudioMenu = ({ studio }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        context="add"
        text="Add movies"
        href={"/admin/studios/" + studio + "/movies/add"}
      />
    </HeaderMenuModal>
  );
};

export default MoviesInStudioMenu;
