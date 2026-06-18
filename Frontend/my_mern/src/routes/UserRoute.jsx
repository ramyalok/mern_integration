import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role === "user" || role === "admin") {
    return children;
  }

  return <Navigate to="/authreglog" />;
}

export default UserRoute;
