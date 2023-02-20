export const useCinemaAdminDetails = ({ admin }) => {
  const contract = rolesContract({ read: true });
  const adminDetails = query({
    queryKey: ["cinemaAdminDetails", admin],
    queryFunction: async () => await contract.cinemaAdminDetails(admin),
  });
  return adminDetails;
};
