import { useEffect, useState } from "react";
import API from "../utils/ApiAuth";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [customers, setCustomers] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadProfile();
    loadCustomers();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setProfile(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCustomers = async () => {
    try {
      const res = await API.get("/customer");

      setCustomers(res.data.customers || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">My Profile</h1>

      {profile && (
        <div className="bg-white p-5 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          {/*So profile page can display without exposing password. Name: ramya Email: ram@gmail.com Role: admin */}
          <p>
            <strong>Name:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong>

            <span
              className={`ml-2 px-2 py-1 rounded text-white ${
                role === "admin" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {role}
            </span>
          </p>
        </div>
      )}

      {/* Customer View */}

      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {role === "admin" ? "All Customers" : "Customer List"}
        </h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.customerName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
