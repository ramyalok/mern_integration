import { useState } from "react";
import API from "../utils/ApiAuth";

function CustomerForm({ loadCustomers }) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "active",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    await API.post("/customer/create", form);

    loadCustomers();

    setForm({
      customerName: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      status: "active",
    });
  };

  return (
    <form onSubmit={submit} className="bg-white p-5 rounded shadow">
      <input
        name="customerName"
        placeholder="Customer Name"
        className="border p-2 w-full mb-3"
        value={form.customerName}
        onChange={change}
      />

      <input
        name="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={form.email}
        onChange={change}
      />

      <input
        name="phone"
        placeholder="Phone"
        className="border p-2 w-full mb-3"
        value={form.phone}
        onChange={change}
      />

      <input
        name="company"
        placeholder="Company"
        className="border p-2 w-full mb-3"
        value={form.company}
        onChange={change}
      />

      <input
        name="address"
        placeholder="Address"
        className="border p-2 w-full mb-3"
        value={form.address}
        onChange={change}
      />

      <button className="bg-blue-600 text-white p-2 w-full">
        Add Customer
      </button>
    </form>
  );
}

export default CustomerForm;
