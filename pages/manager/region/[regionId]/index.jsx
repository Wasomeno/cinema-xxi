import { prisma } from "lib/prisma";
import { ManagerRegionDetailsPage } from "modules/managerPages/regionsPage/ManagerRegionDetailsPage";

export async function getStaticPaths() {
  const regions = await prisma.region.findMany();
  const regionIdPaths = regions.map((region) => ({
    params: {
      regionId: region.id.toString(),
    },
  }));

  return { paths: regionIdPaths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { params } = context;
  const regionDetails = await prisma.region.findUnique({
    where: { id: parseInt(params.regionId) },
    include: { cinema: true },
  });

  return { props: { regionDetails: regionDetails }, revalidate: 30 };
}

const RegionDetails = ({ regionDetails }) => {
  console.log(regionDetails);
  return <ManagerRegionDetailsPage />;
};

export default RegionDetails;
