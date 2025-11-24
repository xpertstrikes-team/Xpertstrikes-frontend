import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "https://xpertstrikes-backend-f4fj.onrender.com";

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`);
      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">Phone</th>
                <th className="p-3 border border-gray-700">Company</th>
                <th className="p-3 border border-gray-700">Service</th>
                <th className="p-3 border border-gray-700">Message</th>
                <th className="p-3 border border-gray-700">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="bg-gray-800 hover:bg-gray-700">
                  <td className="p-3 border border-gray-700">{item.name}</td>
                  <td className="p-3 border border-gray-700">{item.email}</td>
                  <td className="p-3 border border-gray-700">{item.phone}</td>
                  <td className="p-3 border border-gray-700">{item.company}</td>
                  <td className="p-3 border border-gray-700">{item.service}</td>
                  <td className="p-3 border border-gray-700">{item.message}</td>
                  <td className="p-3 border border-gray-700">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <a
          href="/admin"
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => localStorage.removeItem("admin")}
        >
          Logout
        </a>
      </div>
    </div>
  );
}
