import { prisma } from "lib/prisma";
import { AppHomePage } from "modules/appPages/homePage";

export async function getServerSideProps() {
  const firstRegion = await prisma.region.findFirst();
  return {
    props: {
      firstRegion: firstRegion,
    },
  };
}

const CinemaApp = ({ firstRegion }) => {
  console.log(firstRegion);
  return <AppHomePage firstRegion={firstRegion} />;
};

export default CinemaApp;
