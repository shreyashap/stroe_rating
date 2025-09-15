import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (role) => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "STORE_OWNER") navigate("/owner");
    else navigate("/stores");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Welcome Back 👋
        </h1>
        <LoginForm onSuccess={handleSuccess} />
        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
