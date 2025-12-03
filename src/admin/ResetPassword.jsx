import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword(){
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const username = searchParams.get('username');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://xpertstrikes-backend-f4fj.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try{
      const res = await fetch(`${BACKEND_URL}/api/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, token, newPassword })
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.msg || d.error || 'Reset failed');
      setMessage('Password reset successful. You can now login.');
    }catch(err){
      console.error('Reset error:', err);
      setMessage(err.message || 'Reset failed');
    }finally{setLoading(false)}
  }

  if(!token || !username) return <div className="p-6 text-center text-white">Invalid reset link</div>

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="New password" className="w-full p-2 rounded bg-gray-700 text-white mb-3" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
          <button type="submit" className="bg-blue-600 w-full p-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={loading}>{loading? 'Resetting...':'Reset Password'}</button>
        </form>
        {message && <div className="mt-3 text-sm text-gray-300">{message}</div>}
      </div>
    </div>
  )
}
