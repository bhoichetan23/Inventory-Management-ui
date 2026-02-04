import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import VerifyOtp from "./auth/verifyOtp";
import ForgotPassword from "./auth/forgetPassword";
import ResetPassword from "./auth/resetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Products from "./pages/Products";
import Invoices from "./pages/Invoices";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-signup-otp" element={<VerifyOtp mode="signup" />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-reset-otp" element={<VerifyOtp mode="reset" />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
