import { query } from "@/components/reactQuery/queries/query";
import { TableRowDetailsModal } from "@/components/TableRowDetailsModal";

export const CinemaMovieDetailsModal = ({ closeModal, movieId }) => {
  const movieDetails = query({
    queryKey: ["movieDetails", movieId],
    url: `/api/movies/${movieId}`,
  });

  return (
    <TableRowDetailsModal title="Movie Details" closeModal={closeModal}>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Title</span>
        <h5>{movieDetails.data?.title}</h5>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Casts</span>
        <h5>{movieDetails.data?.casts}</h5>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Casts</span>
        <h5>{movieDetails.data?.duration}</h5>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Synopsis</span>
        <p className="tracking-wide">{movieDetails.data?.synopsis}</p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">Watched Amount</span>
        <p className="tracking-wide">{movieDetails.data?.watchedAmount}</p>
      </div>
    </TableRowDetailsModal>
  );
};
