import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

const ManagerRegionMenu = ({ toggleDeleteMode, toggleShowMenu }) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Manage Region menu</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
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
      </div>
    </HeaderMenuModal>
  );
};

export default ManagerRegionMenu;
