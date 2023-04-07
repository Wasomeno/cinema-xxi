import { useRouter } from "next/router";

import ChevronRight from "@/components/Icons/ChevronRight";

const CinemaDetailsCard = ({ title, value, withLink, link }) => {
  const { push } = useRouter();
  return (
    <div
      className="col-span-1 rounded-lg bg-slate-200 p-2 shadow dark:bg-slate-600"
      onClick={() => withLink && push(link)}
    >
      <div className="flex h-full flex-row-reverse items-center justify-evenly">
        {withLink && (
          <div>
            <ChevronRight size="4" color="gray" />
          </div>
        )}
        <div className="w-3/6 text-center">
          <p className="font-poppins text-sm font-medium">{title}</p>
        </div>
        <div className="text-center">
          <p className=" font-poppins font-medium ">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default CinemaDetailsCard;
