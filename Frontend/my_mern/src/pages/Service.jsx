import React from "react";

function Service() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Services</h1>

        <ul className="space-y-4">
          <li className="bg-blue-300 p-4 rounded">Customer authority</li>

          <li className="bg-blue-300 p-4 rounded">Customer Attendance Tracking</li>

          <li className="bg-blue-300 p-4 rounded">customer Management</li>

          <li className="bg-blue-300 p-4 rounded">customer Support</li>
        </ul>
      </div>
    </div>
  );
}

export default Service;
