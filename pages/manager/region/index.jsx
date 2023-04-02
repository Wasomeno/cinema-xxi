import { prisma } from "lib/prisma";
import { ManagerRegionPage } from "modules/managerPages/regionsPage/ManagerRegionPage";

export async function getServerSideProps() {
  const regions = await prisma.region.findMany({ include: { cinema: true } });
  return {
    props: {
      regions: regions,
    },
  };
}

const ManageRegions = ({ regions }) => {
  return <ManagerRegionPage regions={regions} />;
};

export default ManageRegions;
