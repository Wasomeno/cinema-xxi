import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ManagerRegionMenu = ({ toggleDeleteMode, toggleShowMenu }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <HeaderMenuLink
        href="/manager/region/add"
        text="Add new region"
        icon="plus"
      />
      <DeleteModeButton
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
      >
        Delete Region
      </DeleteModeButton>
    </HeaderMenuModal>
  );
};

export default ManagerRegionMenu;
