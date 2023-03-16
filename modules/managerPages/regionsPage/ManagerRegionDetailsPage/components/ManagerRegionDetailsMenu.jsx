import DeleteModeButton from "@/components/DeleteModeButton";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const ManagerRegionDetailsMenu = ({
  region,
  toggleShowMenu,
  toggleDeleteMode,
}) => {
  return (
    <HeaderMenuModal toggleShowMenu={toggleShowMenu}>
      <HeaderMenuLink
        href={"/manager/region/" + region + "/add/cinema"}
        text="Add new cinema"
        icon="plus"
      />
      <DeleteModeButton
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
      >
        Delete Cinemas
      </DeleteModeButton>
    </HeaderMenuModal>
  );
};
