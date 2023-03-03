import { useRouter } from "next/router";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const StudioDetailsMenu = () => {
  const { query } = useRouter();
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        text="Add Studio Showtimes"
        context="add"
        href={"/admin/studios/" + query?.studio + "/showtimes/add"}
      />
      <HeaderMenuLink
        text="Add Studio Movies"
        context="add"
        href={"/admin/studios/" + query?.studio + "/movies/add"}
      />
    </HeaderMenuModal>
  );
};

export default StudioDetailsMenu;
