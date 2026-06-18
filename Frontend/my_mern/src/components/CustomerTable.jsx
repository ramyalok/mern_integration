import API from "../utils/ApiAuth";

function CustomerTable({ customers, loadCustomers }) {
  const remove = async (id) => {
    await API.delete(`/customer/${id}`);

    loadCustomers();
  };
  const filter = async (id) => {
    await API.put(`/customer/${id}`);

    loadCustomers();
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.customerName}</td>

              <td>{c.email}</td>

              <td>{c.phone}</td>

              <td>
                <button
                  onClick={() => filter(c._id)}
                  className="bg-red-600 text-white px-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(c._id)}
                  className="bg-red-600 text-white px-3"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
