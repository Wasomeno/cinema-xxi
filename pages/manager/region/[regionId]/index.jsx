import { prisma } from "lib/prisma";
import { ManagerRegionDetailsPage } from "modules/managerPages/regionsPage/ManagerRegionDetailsPage";

export async function getServerSideProps(context) {
  const { params } = context;
  const regionDetails = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
    include: { cinema: true },
  });

  return { props: { regionDetails: regionDetails } };
}

const RegionDetails = ({ regionDetails }) => {
  return <ManagerRegionDetailsPage regionDetails={regionDetails} />;
};

export default RegionDetails;
