import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoresPage from "./pages/StoresPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import AdminPage from "./pages/AdminPage";
import StoreOwnerPage from "./pages/SroreOwnerPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/stores"
          element={
            <ProtectedRoute allowedRoles={["NORMAL"]}>
              <StoresPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
              <StoreOwnerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute allowedRoles={["NORMAL", "STORE_OWNER", "ADMIN"]}>
              <UpdatePasswordPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
