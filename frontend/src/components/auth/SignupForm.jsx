import { useState } from "react";
import API from "../../services/api";

export default function SignupForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/signup", form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        name="name"
        placeholder="Name"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
