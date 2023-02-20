export const useAdminDetails = ({ user }) => {
  const contract = rolesContract({ read: true });
  const result = query(
    ["adminDetails", user],
    contract.cinemaAdminDetails(user)
  );
  return result;
};
