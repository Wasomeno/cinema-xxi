const cinemaDetailsKeys = (detail, cinemaId) => ["cinemas", cinemaId, detail];

export const cinemaQueryKeys = {
  allCinema: ["cinema", "all"],
  cinemaDetails: (cinemaid) => cinemaDetailsKeys("details", cinemaid),
  cinemaShowtimes: (cinemaId) => cinemaDetailsKeys("showtimes", cinemaId),
  cinemaMovies: (cinemaId) => cinemaDetailsKeys("movies", cinemaId),
  cinemaAdmins: (cinemaId) => cinemaDetailsKeys("admins", cinemaId),
  cinemaTransactions: (cinemaId) => cinemaDetailsKeys("transactions", cinemaId),
  cinemaMonthlyTransactions: (cinemaId, month) =>
    cinemaDetailsKeys("transactions", cinemaId, month),
};
