import { useState } from "react";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || "Request failed");
      // For convenience the backend returns resetUrl in dev
      setMessage(`Reset link: ${data.resetUrl}`);
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage(err.message || "Failed to request reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-2 rounded bg-gray-700 text-white mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 w-full p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
        {message && (
          <div className="mt-3 text-sm text-gray-300 wrap-break-word">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
