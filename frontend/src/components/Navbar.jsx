import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { role, logout, token } = useAuth();

  if (!token) return null;

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1
        className="font-bold text-xl text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Rating Platform
      </h1>
      <div className="flex items-center gap-4">
        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-blue-600"
          >
            Admin Dashboard
          </button>
        )}
        {role === "STORE_OWNER" && (
          <button
            onClick={() => navigate("/owner")}
            className="hover:text-blue-600"
          >
            Store Owner Dashboard
          </button>
        )}
        {role === "NORMAL" && (
          <button
            onClick={() => navigate("/stores")}
            className="hover:text-blue-600"
          >
            Stores
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
