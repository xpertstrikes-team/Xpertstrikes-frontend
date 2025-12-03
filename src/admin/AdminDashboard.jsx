import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://xpertstrikes-backend-f4fj.onrender.com";

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === 401) {
        // unauthorized
        localStorage.removeItem("adminToken");
        return (window.location.href = "/admin/login");
      }

      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Delete failed");

      // remove from state
      setData((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) return (window.location.href = "/admin/login");

    fetch(`${BACKEND_URL}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d.success) window.location.href = "/admin/login";
      })
      .catch(() => (window.location.href = "/admin/login"));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
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
                <th className="p-3 border border-gray-700">Actions</th>
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
                  <td className="p-3 border border-gray-700">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
