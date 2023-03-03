const cinemaDetailsKeys = (detail, cinemaId) => ["cinemas", cinemaId, detail];

export const cinemaKeys = {
  allCinema: ["cinema", "all"],
  cinemaDetails: (cinemaid) => cinemaDetailsKeys("details", cinemaid),
  cinemaShowtimes: (cinemaId) => cinemaDetailsKeys("showtimes", cinemaId),
  cinemaMovies: (cinemaId) => cinemaDetailsKeys("movies", cinemaId),
};
