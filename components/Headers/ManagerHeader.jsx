import { useRouter } from "next/router";

import ChevronLeft from "../Icons/ChevronLeft";
import { Title } from "../shared/Texts";

const ManagerHeader = ({ children, withBackButton }) => {
  const { back } = useRouter();
  return (
    <>
      <div className="grid h-14 w-full grid-cols-5 items-center justify-center gap-4">
        {withBackButton && (
          <div className="col-span-1 text-center">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 shadow-md dark:bg-slate-700"
              onClick={back}
            >
              <ChevronLeft
                color="stroke-slate-800 dark:stroke-slate-50"
                size="5"
              />
            </button>
          </div>
        )}
        <div className="col-span-3 col-start-2 col-end-5 text-center">
          <Title>{children}</Title>
          <div className="mx-auto mt-2 h-1 w-3/6 rounded-full bg-blue-400" />
        </div>
      </div>
    </>
  );
};

export default ManagerHeader;
