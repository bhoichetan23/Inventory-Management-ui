import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthHome";
import illustration from "../assets/forgetpass.png";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });

      // SHOW OTP IN TOAST
      toast.success(`Your OTP is ${res.data.otp}`, {
        duration: 20000,
      });

      const expiryTime = Date.now() + 10 * 60 * 1000;
      localStorage.setItem("otpExpiry", expiryTime);

      navigate("/verify-reset-otp", { state: { email } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Email not registered. Try signing up.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Company Name"
      subtitle="Please enter your registered email ID to receive an OTP"
      image={illustration}
      showBrand={false}
    >
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
