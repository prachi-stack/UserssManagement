import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
            <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
