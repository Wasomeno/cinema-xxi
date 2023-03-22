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
      <div className="my-4 flex justify-center">
        <p className="font-poppins text-xs">Manage Cinemas Menu</p>
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
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
      </div>
    </HeaderMenuModal>
  );
};
