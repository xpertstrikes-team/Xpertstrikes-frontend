import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "member" });
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  // Use frontend env variable so local and deployed backends work the same way
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://xpertstrikes-backend-f4fj.onrender.com";

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
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
        navigate("/admin/login");
        return;
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (res.status === 403) throw new Error("You do not have permission to delete");
      if (!res.ok) throw new Error(result.error || "Delete failed");

      // remove from state
      setData((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete");
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const d = await res.json();
      setUsers(d.users || []);
    } catch (err) {
      console.error("Users fetch error:", err);
    }
  };

  const createUser = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newUser),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.msg || d.error || "Create failed");
      setNewUser({ username: "", password: "", role: "member" });
      fetchUsers();
      alert("User created");
    } catch (err) {
      console.error("Create user error:", err);
      alert(err.message || "Failed to create user");
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
        if (!d.success) return navigate("/admin/login");
        // store role for conditional UI
        if (d.role) localStorage.setItem("adminRole", d.role);
        // fetch current admin info
        fetch(`${BACKEND_URL}/api/admin/me`, { headers: { Authorization: `Bearer ${token}` } })
          .then((r) => r.json())
          .then((m) => { if (m.success) setMe(m.admin); });
        // if admin, fetch users
        if (d.role === "admin") fetchUsers();
      })
      .catch(() => navigate("/admin/login"));
  }, []);

  // function to change role of a user
  const changeRole = async (id, role) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/admin/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.msg || d.error || "Role change failed");
      fetchUsers();
      alert("Role updated");
    } catch (err) {
      console.error("Change role error:", err);
      alert(err.message || "Failed to change role");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchUsers();
      alert("User deleted");
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {me && (
        <p className="text-center mb-4">Logged in as <strong>{me.username}</strong> ({me.role})</p>
      )}

      {/* User management - only visible to admin */}
      {localStorage.getItem("adminRole") === "admin" && (
        <div className="mb-6 p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <div className="flex gap-2 mb-2">
            <input className="p-2 rounded bg-gray-700" placeholder="username" value={newUser.username} onChange={(e)=>setNewUser(s=>({...s, username:e.target.value}))} />
            <input className="p-2 rounded bg-gray-700" placeholder="password" value={newUser.password} onChange={(e)=>setNewUser(s=>({...s, password:e.target.value}))} />
            <select className="p-2 rounded bg-gray-700" value={newUser.role} onChange={(e)=>setNewUser(s=>({...s, role:e.target.value}))}>
              <option value="member">member</option>
              <option value="admin">admin</option>
            </select>
            <button onClick={createUser} className="bg-green-600 px-3 py-1 rounded">Create</button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Existing users</h3>
            <table className="w-full text-sm">
              <thead><tr><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map(u=> (
                  <tr key={u._id} className="odd:bg-gray-800 even:bg-gray-700">
                    <td className="p-2">{u.username}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">
                      <select value={u.role} onChange={(e)=>changeRole(u._id, e.target.value)} className="mr-2 bg-gray-700 p-1 rounded">
                        <option value="member">member</option>
                        <option value="admin">admin</option>
                      </select>
                      <button onClick={()=>deleteUser(u._id)} className="bg-red-600 px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                    {localStorage.getItem("adminRole") === "admin" ? (
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">No delete access</span>
                    )}
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
