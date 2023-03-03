import XMark from "@/components/Icons/XMark";
import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const ManagerRegionMenu = ({ toggleDeleteMode, toggleShowMenu }) => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/manager/region/add"
        text="Add new region"
        context="add"
      />
      <button
        onClick={() => {
          toggleShowMenu();
          toggleDeleteMode();
        }}
        className="flex h-full w-full items-center justify-evenly p-1 text-sm"
      >
        <div className="w-1/6">
          <XMark size="4" />
        </div>
        <div className="w-4/6 text-center">
          <p className="font-poppins text-xs">Delete Regions</p>
        </div>
      </button>
    </HeaderMenuModal>
  );
};
