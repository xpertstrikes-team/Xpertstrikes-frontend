import { useState } from "react";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://xpertstrikes-backend-f4fj.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("adminToken", data.token);
      window.location.href = "/admin";
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-900 text-white">
      <form
        onSubmit={login}
        className="bg-blue-800 p-6 rounded-xl w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded bg-blue-700"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-blue-700"
          onChange={handleChange}
        />

        <button className="w-full bg-green-600 p-2 rounded">Login</button>
      </form>
    </div>
  );
}
