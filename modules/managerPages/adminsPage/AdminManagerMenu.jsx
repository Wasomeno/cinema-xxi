import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const AdminManagerMenu = ({ regionId, cinemaId, toggleShowMenu }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <HeaderMenuLink
        href={"/manager/region/" + regionId + "/" + cinemaId + "/admins/add"}
        icon="plus"
        text="Add Admin"
      />
    </HeaderMenuModal>
  );
};

export default AdminManagerMenu;
