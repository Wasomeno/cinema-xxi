import { prisma } from "lib/prisma";
import { AppHome } from "modules/appPages/homePage";

import AppLayout from "@/components/Layouts/AppLayout";

export async function getServerSideProps() {
  const firstRegion = await prisma.region.findFirst();
  return {
    props: {
      firstRegion: firstRegion,
    },
  };
}

export default function AppHomePage({ firstRegion }) {
  return (
    <AppLayout>
      <AppHome firstRegion={firstRegion} />
    </AppLayout>
  );
}
