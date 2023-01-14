import AdminHeader from "@/components/Admin/AdminHeader";
import AnimatedContainer from "@/components/AnimatedContainer";
import DataContainer from "@/components/DataContainer";
import { addShowTimesToStudio } from "@/components/reactQuery/mutations/Cinema/addStudioShowTime";
import { useCinemaShowTimes } from "@/components/reactQuery/queries/Cinema/useCinemaShowTimes";
import { Paragraph } from "@/components/shared/Texts";
import { useSelectDeselect } from "hooks/useSelectDeselect";
import { useRouter } from "next/router";

const AddStudioShowtimes = () => {
  const { query } = useRouter();
  const cinemaShowtimes = useCinemaShowTimes({ region: 1, cinema: 1 });
  const [selectedShowtimes, selectShowtime, deselectShowtime] =
    useSelectDeselect([]);

  console.log(selectedShowtimes);

  const addStudioShowtimeMutation = addShowTimesToStudio({
    region: 1,
    cinema: 1,
    showtimes: selectedShowtimes,
    studio: query.studio,
  });

  return (
    <AnimatedContainer className="p-4">
      <AdminHeader title="Add Showtimes" withBackButton />
      <div className="mb-4 h-40">
        <Paragraph text="Available Showtimes" size="sm" margin="2" />
        <DataContainer
          className="flex flex-col gap-4 justify-start items-center"
          object="showtimes"
          loading={cinemaShowtimes.isLoading}
        >
          {cinemaShowtimes.data?.length < 1 ? (
            <Paragraph text="No active showtimes" size="sm" />
          ) : (
            cinemaShowtimes.data?.map((showtime) => (
              <div
                onClick={() => selectShowtime(parseInt(showtime))}
                className="w-4/6 h-10 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
              >
                <Paragraph text={parseInt(showtime)} size="sm" />
              </div>
            ))
          )}
        </DataContainer>
      </div>

      <div className="mb-4 h-40">
        <Paragraph text="Selected Showtimes" size="sm" margin="2" />
        <div className="flex flex-col gap-4 justify-start items-center">
          {selectedShowtimes.length < 1 ? (
            <div className="flex justify-center items-center h-20">
              <Paragraph text="No active showtimes" size="sm" />
            </div>
          ) : (
            selectedShowtimes.map((showtime) => (
              <div
                onClick={() => deselectShowtime(showtime)}
                className="w-4/6 h-10 flex justify-evenly items-center rounded-md bg-slate-200 shadow-md p-2"
              >
                <Paragraph text={parseInt(showtime)} size="sm" />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => addStudioShowtimeMutation()}
          className="p-2 w-3/6 text-sm bg-slate-900 text-white font-poppins rounded-md"
        >
          Submit
        </button>
      </div>
    </AnimatedContainer>
  );
};

export default AddStudioShowtimes;
