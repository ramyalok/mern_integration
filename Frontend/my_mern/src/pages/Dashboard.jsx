import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold">Total Customers</h2>

            <p className="text-3xl mt-3">1000</p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold">Active Users</h2>

            <p className="text-3xl mt-3">880</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold">Services</h2>

            <p className="text-3xl mt-3">94</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
