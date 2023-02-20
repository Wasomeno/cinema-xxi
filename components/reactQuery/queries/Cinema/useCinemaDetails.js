export const useCinemaDetails = ({ region, cinema }) => {
  return {
    data: {
      name: "Cinema Test",
      studioAmount: 5,
      transactionAmount: 10,
      movieAmount: 120,
      capacityTotal: 100,
      showtimeAmount: 20,
      admins: ["0x", "0x", "0x", "0x", "0x"],
    },
    isLoading: false,
  };
};
