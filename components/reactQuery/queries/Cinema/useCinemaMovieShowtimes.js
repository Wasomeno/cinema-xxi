export const useRegionMovieShowtimes = ({ region, movie }) => {
  return {
    data: {
      showtimes: [
        [5000, 1400, 3000],
        [5000, 1400, 3000],
        [5000, 1400, 3000],
      ],
      cinemas: [1, 2, 3],
    },
    isLoading: false,
  };
};
