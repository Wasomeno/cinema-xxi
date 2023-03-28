import { useRouter } from "next/router";

const RegionListCard = ({
  region,
  regionsToDelete,
  deleteMode,
  deselectRegionsToDelete,
  selectRegionsToDelete,
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        deleteMode
          ? selectRegionsToDelete(region.id)
          : router.push("/manager/region/" + region.id)
      }
      className={
        (regionsToDelete.includes(region.id) && deleteMode && "bg-red-300") +
        " relative flex h-16 w-full items-center justify-evenly rounded-md bg-slate-200 p-2 shadow-md dark:bg-slate-700"
      }
    >
      <div className="w-2/12 text-center lg:w-1/12">
        <p className="font-poppins text-xs font-medium lg:text-sm">
          {region.id}
        </p>
      </div>
      <div className="w-4/12 text-center lg:w-3/12">
        <p className="font-poppins text-xs font-medium lg:text-sm">
          {region.name}
        </p>
      </div>
      <div className="w-2/12 text-center lg:w-2/12">
        <p className="text-center font-poppins text-xs lg:text-sm">
          {region.cinema.length}
        </p>
      </div>
      {regionsToDelete.includes(region.id) && deleteMode && (
        <button
          onClick={() => deselectRegionsToDelete(region.id)}
          className="flex-items-center absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full bg-slate-50 font-poppins text-xs font-medium shadow-md"
        >
          X
        </button>
      )}
    </button>
  );
};

export default RegionListCard;
