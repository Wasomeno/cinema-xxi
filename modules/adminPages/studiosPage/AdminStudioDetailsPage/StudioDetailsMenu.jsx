import { useRouter } from "next/router";

import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const StudioDetailsMenu = ({ toggleShowMenu }) => {
  const { query } = useRouter();
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Studio menu</p>
      </div>
      <div className="flex flex-col items-center gap-2">
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
      </div>
    </HeaderMenuModal>
  );
};

export default StudioDetailsMenu;
