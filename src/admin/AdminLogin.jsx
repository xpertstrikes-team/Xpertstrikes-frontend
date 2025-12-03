import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        console.error("Failed to parse JSON from login response", parseErr);
        setError("Invalid server response");
        setLoading(false);
        return;
      }

      console.log(
        "Login response status:",
        res.status,
        "ok:",
        res.ok,
        "data:",
        data
      );

      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/admin/dashboard";
        return;
      }

      // If server returned ok but no token, show diagnostic message
      if (res.ok && !data.token) {
        console.warn("Login succeeded but no token returned", data);
        setError(data.msg || "Login succeeded but no token returned by server");
        setLoading(false);
        return;
      }

      // Handle common error responses
      setError(data.msg || data.error || "Login failed");
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="password"
          placeholder="Enter Admin Password"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 w-full p-2 mt-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-400 mt-3">
          Using backend: {BACKEND_URL}
        </p>
      </div>
    </div>
  );
}
