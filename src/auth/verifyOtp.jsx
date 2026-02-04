import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthHome";
import illustration from "../assets/verifyotp.png";

const VerifyOtp = ({ mode }) => {
  const { state } = useLocation();
  const email = state?.email;
  const initialError = state?.error || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(initialError);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  // load timer
  useEffect(() => {
    const expiry = localStorage.getItem("otpExpiry");
    if (expiry) {
      const remaining = Math.floor((expiry - Date.now()) / 1000);
      if (remaining > 0) setTimer(remaining);
    }
  }, []);

  // countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint =
        mode === "signup"
          ? "/auth/verify-signup-otp"
          : "/auth/verify-reset-otp";

      await api.post(endpoint, { email, otp });

      if (mode === "signup") {
        navigate("/login");
      } else {
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP does not match");
    }
  };

  const handleResend = async () => {
    try {
      const resendEndpoint =
        mode === "signup" ? "/auth/signup" : "/auth/forgot-password";

      await api.post(resendEndpoint, { email });

      const expiryTime = Date.now() + 10 * 60 * 1000;
      localStorage.setItem("otpExpiry", expiryTime);
      setTimer(600);
    } catch {
      setError("Failed to resend OTP");
    }
  };

  return (
    <AuthLayout
      title="Enter your OTP"
      subtitle="We’ve sent a 6-digit OTP to your registered mail. Please enter it below."
      image={illustration}
      showBrand={false}
    >
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleVerify}>
        <label>OTP</label>
        <input
          type="text"
          placeholder="XXXX12"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
        />

        <button>Confirm</button>
      </form>

      {timer > 0 ? (
        <p style={{ marginTop: "12px", color: "#555", textAlign: "center" }}>
          Resend OTP in {Math.floor(timer / 60)}:
          {(timer % 60).toString().padStart(2, "0")}
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          style={{ marginTop: "12px" }}
        >
          Resend OTP
        </button>
      )}
    </AuthLayout>
  );
};

export default VerifyOtp;
