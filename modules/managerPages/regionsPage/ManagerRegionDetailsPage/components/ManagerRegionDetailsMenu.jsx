import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const ManagerRegionDetailsMenu = ({
  region,
  toggleShowMenu,
  toggleDeleteMode,
}) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href={"/manager/region/" + region + "/add/cinema"}
        text="Add new cinema"
        context="add"
      />
      <button
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
        className="flex h-full w-full items-center justify-evenly p-1 text-sm"
      >
        <span className="w-1/6">
          <XMark size="4" />
        </span>
        <span className="w-4/6 text-center">
          <p className="font-poppins text-xs">Delete Cinema</p>
        </span>
      </button>
    </HeaderMenuModal>
  );
};
