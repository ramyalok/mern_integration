import { useEffect, useState } from "react";
import API from "../utils/ApiAuth";

function Customers() {
  const role = localStorage.getItem("role");

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    customerName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "active",
  };

  const [form, setForm] = useState(emptyForm);

  // Load Customers
  const loadCustomers = async () => {
    try {
      let url = "/customer";

      if (search) {
        url = `/customer/search?search=${search}`;
      }

      const res = await API.get(url);

      setCustomers(res.data.customers || res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update
  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/customer/${editingId}`, form);
      } else {
        await API.post("/customer/create", form);
      }

      loadCustomers();

      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Edit
  const editCustomer = (customer) => {
    setEditingId(customer._id);

    setForm({
      customerName: customer.customerName,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      address: customer.address,
      status: customer.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const remove = async (id) => {
    try {
      await API.delete(`/customer/${id}`);

      loadCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Customer Management</h1>

      {/* ADMIN */}
      {role === "admin" && (
        <>
          <input
            type="text"
            placeholder="Search customer"
            className="border p-3 w-full mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={loadCustomers}
            className="bg-blue-600 text-white px-5 py-2 mb-5"
          >
            Search
          </button>

          <form
            onSubmit={submit}
            className="bg-white p-6 rounded-xl shadow-lg mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              {editingId ? "Update Customer" : "Add Customer"}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                name="customerName"
                value={form.customerName}
                onChange={change}
                placeholder="Customer Name"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="email"
                value={form.email}
                onChange={change}
                placeholder="Email"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="Phone"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="company"
                value={form.company}
                onChange={change}
                placeholder="Company"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="address"
                value={form.address}
                onChange={change}
                placeholder="Address"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="status"
                value={form.status}
                onChange={change}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editingId ? "Update Customer" : "Add Customer"}
            </button>
          </form>
        </>
      )}

      {/* TABLE */}

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-300">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>

            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.customerName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.company}</td>

              {role === "admin" && (
                <td className="space-x-2">
                  <button
                    onClick={() => editCustomer(c)}
                    className="bg-yellow-500 px-3 py-1 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => remove(c._id)}
                    className="bg-red-600 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;

// // import { useEffect, useState } from "react";

// // import API from "../utils/ApiAuth";

// // import CustomerForm from "../components/CustomerForm";

// // import CustomerTable from "../components/CustomerTable";

// // function Customers() {
// //   const [customers, setCustomers] = useState([]);

// //   const loadCustomers = async () => {
// //     const res = await API.get("/customer");

// //     setCustomers(res.data.customers);
// //   };

// //   useEffect(() => {
// //     loadCustomers();
// //   }, []);

// //   return (
// //     <div className="p-10">
// //       <h1 className="text-3xl mb-5">Customer Management</h1>

// //       <CustomerForm loadCustomers={loadCustomers} />

// //       <CustomerTable customers={customers} loadCustomers={loadCustomers} />
// //     </div>
// //   );
// // }

// // export default Customers;

// //// pages/Customers.jsx

// import { useEffect, useState } from "react";
// import API from "../utils/ApiAuth";

// import CustomerForm from "../components/CustomerForm";
// import CustomerTable from "../components/CustomerTable";

// function Customers() {
//   const role = localStorage.getItem("role");
//   const [customers, setCustomers] = useState([]);
//   const [search, setSearch] = useState("");

//   const loadCustomers = async () => {
//     let url = "/customer";
//     if (search) {
//       url = `/customer/search?search=${search}`;
//     }
//     const res = await API.get(url);
//     setCustomers(res.data.customers || res.data.data);
//   };

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   return (
//     <div className="p-10bg-gray-100min-h-screen"    >

//       <h1 className="text-3xlmb-5font-bold" > Customer Management</h1>
//        {role === "admin" && ( <input type="text" placeholder="Search byid /customerName /company" className="borderp-3mb-5w-full"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         />
//       )}

//       {role === "admin" && (<button onClick={loadCustomers} className="bg-blue-600text-whitepx-5py-2mb-6" > Search</button>
//       )}

//       {role === "admin" && <CustomerForm loadCustomers={loadCustomers} />}

//       <CustomerTable customers={customers} loadCustomers={loadCustomers} />
//     </div>
//   );
// }

// export default Customers;
