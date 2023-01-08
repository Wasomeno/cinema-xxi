import AdminHeader from "@/components/Admin/AdminHeader";
import StudioDetailsMenu from "modules/adminPages/studiosPage/StudioDetailsMenu";
import AnimatedContainer from "@/components/AnimatedContainer";
import { useStudioDetails } from "@/components/reactQuery/queries/Cinema/useStudioDetails";
import { Paragraph, Subtitle } from "@/components/shared/Texts";
import { useRouter } from "next/router";
import React from "react";

const StudioDetails = () => {
  const { query } = useRouter();
  const studioDetails = useStudioDetails(1, 1, query.studio);
  return (
    <AnimatedContainer className="p-4">
      <AdminHeader
        title={"Studio " + query.studio}
        withOption
        withBackButton
        OptionMenu={<StudioDetailsMenu studio={query.studio} />}
      />
      <div className="my-4">
        <Subtitle text="Studio Details" size="sm" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-lg bg-slate-50 shadow">
          <div className="my-1 flex justify-between items-center">
            <Paragraph text="Movies" size="sm" style="medium" />
            <Paragraph text="40" size="xs" style="medium" />
          </div>
          <div className="mt-2 flex flex-col justify-start items-center gap-3 h-36 overflow-y-scroll">
            <div className="p-2 bg-gray-200 rounded-md w-4/6 h-12">Test</div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 shadow">
          <div className="my-1 flex justify-between items-center">
            <Paragraph text="Showtimes" size="sm" style="medium" />
            <Paragraph text="40" size="xs" style="medium" />
          </div>
          <div className="mt-2 flex flex-col justify-start items-center gap-3 h-36 overflow-y-scroll">
            <div className="p-2 bg-gray-200 rounded-md w-4/6 h-12">Test</div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default StudioDetails;
