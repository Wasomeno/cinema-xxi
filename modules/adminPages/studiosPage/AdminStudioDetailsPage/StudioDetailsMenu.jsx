import { useRouter } from "next/router";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const StudioDetailsMenu = ({ toggleShowMenu }) => {
  const { query } = useRouter();
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <HeaderMenuLink
        text="Add Studio Showtimes"
        icon="plus"
        href={"/admin/studios/" + query?.studio + "/showtimes/add"}
      />
      <HeaderMenuLink
        text="Add Studio Movies"
        icon="plus"
        href={"/admin/studios/" + query?.studio + "/movies/add"}
      />
    </HeaderMenuModal>
  );
};

export default StudioDetailsMenu;
