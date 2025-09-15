import { useState } from "react";
import API from "../services/api";

export default function UpdatePasswordPage() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await API.post("/user/update-password", form);
      setSuccess(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Update Password 🔑
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            className="border p-2 rounded"
            value={form.oldPassword}
            onChange={handleChange}
          />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            className="border p-2 rounded"
            value={form.newPassword}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
