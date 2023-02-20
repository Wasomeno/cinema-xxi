import CinemaListCard from "./CinemaListCard";

const CinemaList = ({ cinemas, region }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {cinemas?.length < 1 ? (
        <p className="font-poppins text-sm">No active cinemas</p>
      ) : (
        cinemas?.map((cinema) => (
          <CinemaListCard key={cinema.id} cinema={cinema} region={region} />
        ))
      )}
    </div>
  );
};

export default CinemaList;
