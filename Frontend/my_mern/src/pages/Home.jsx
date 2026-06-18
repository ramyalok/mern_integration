import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-white ">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <h1 className="text-5xl font-bold mb-5">
            Hyundai Customer Relationship Portal
          </h1>

          <p className="text-lg text-gray-700 max-w-2xl">
            Manage customer records, maintain engagement, track customer
            activities and deliver better service experiences.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              className="
              bg-gray-600
              px-6
              py-3
              rounded
              hover:bg-gray-300
              "
            >
              Explore Customers
            </button>

            <button
              className="
              border
              px-6
              py-3
              rounded
              hover:bg-white
              hover:text-black
              "
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}

      <section className="max-w-7xl mx-auto p-10">
        <h2 className="text-3xl font-bold mb-8">Customer Management</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-4xl font-bold text-blue-600">2500+</h3>

            <p className="mt-2">Registered Customers</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-4xl font-bold text-green-600">840</h3>

            <p className="mt-2">Active Service Requests</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-4xl font-bold text-red-600">120</h3>

            <p className="mt-2">Pending Followups</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-4xl font-bold text-purple-600">98%</h3>

            <p className="mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="bg-white">
        <div className="max-w-7xl mx-auto p-10">
          <h2 className="text-3xl font-bold mb-10 text-center">CRM Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="shadow p-8 rounded">
              <div className="text-5xl mb-4">👥</div>

              <h3 className="text-xl font-semibold">Customer Profiles</h3>

              <p className="mt-3 text-gray-600">
                Store customer details, address, service history and
                communication.
              </p>
            </div>

            <div className="shadow p-8 rounded">
              <div className="text-5xl mb-4">📊</div>

              <h3 className="text-xl font-semibold">Analytics Dashboard</h3>

              <p className="mt-3 text-gray-600">
                View reports and customer relationship insights.
              </p>
            </div>

            <div className="shadow p-8 rounded">
              <div className="text-5xl mb-4">🔒</div>

              <h3 className="text-xl font-semibold">Secure Access</h3>

              <p className="mt-3 text-gray-600">
                JWT authentication and role-based access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto p-6 text-center">
          Hyundai CRM Portal © 2026
        </div>
      </footer>
    </div>
  );
}

export default Home;
