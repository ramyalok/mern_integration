import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const logout = () => {
    localStorage.clear();

    sessionStorage.clear();

    window.location = "/authreglog";
  };

  return (
    <>
      <nav className="bg-gray-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hyundai</h1>

          <div className="space-x-4">
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>

            {(role === "user" || role === "admin") && (
              <Link to="/service" className="hover:text-yellow-300">
                Service
              </Link>
            )}

            {(role === "user" || role === "admin") && (
              <Link to="/profile" className="hover:text-yellow-300">
                Profile
              </Link>
            )}
            {role === "admin" && (
              <Link to="/customers" className="hover:text-yellow-300">
                customers
              </Link>
            )}

            {role === "admin" && (
              <Link to="/dashboard" className="hover:text-yellow-300">
                Dashboard
              </Link>
            )}

            <Link to="/authreglog" className="hover:text-yellow-300">
              Login
            </Link>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
