const cinemaDetailsKeys = (detail, cinemaId, studio) => [
  "studio",
  detail,
  cinemaId,
  studio,
];

export const cinemaStudioQueryKeys = {
  allStudio: ["studio", "all"],
  studioDetails: (studio, cinemaId) =>
    cinemaDetailsKeys("details", cinemaId, studio),
  studioShowtimes: (studio, cinemaId) =>
    cinemaDetailsKeys("showtimes", cinemaId, studio),
  studioMovies: (studio, cinemaId) =>
    cinemaDetailsKeys("movies", cinemaId, studio),
};
