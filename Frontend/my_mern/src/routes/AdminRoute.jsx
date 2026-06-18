import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return children; //view all pages
  }
  return <h2>Access Denied admin only</h2>;
}
export default AdminRoute;
