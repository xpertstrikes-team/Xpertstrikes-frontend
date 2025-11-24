import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "xpert_admin_2025") {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Incorrect password!");
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

        <button
          onClick={handleLogin}
          className="bg-blue-600 w-full p-2 mt-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
