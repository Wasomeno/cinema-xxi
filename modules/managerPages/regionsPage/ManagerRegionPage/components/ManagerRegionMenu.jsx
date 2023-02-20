import HeaderMenuLink from "@/components/shared/HeaderMenuLink";
import HeaderMenuModal from "@/components/shared/HeaderMenuModal";

export const ManagerRegionMenu = () => {
  return (
    <HeaderMenuModal>
      <HeaderMenuLink
        href="/manager/region/add"
        text="Add new region"
        context="add"
      />
    </HeaderMenuModal>
  );
};
