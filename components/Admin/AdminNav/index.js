import AdminNavMobile from "./AdminNavMobile";
import AdminNavRegular from "./AdminNavRegular";

const AdminNav = ({ width }) => {
  return width < 700 ? <AdminNavMobile /> : <AdminNavRegular />;
};

export default AdminNav;
