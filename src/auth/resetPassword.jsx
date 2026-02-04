import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthHome";
import illustration from "../assets/resetpass.png";
import openeye from "../assets/openeye.png";
import closeeye from "../assets/closeeye.png";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await api.post("/auth/reset-password", {
        email,
        newPassword: password,
      });

      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Reset failed";

      if (msg.toLowerCase().includes("otp")) {
        navigate("/verify-reset-otp", {
          state: { email, error: msg },
        });
      } else {
        setError(msg);
      }
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Please enter and confirm your new password"
      image={illustration}
      showBrand={false}
    >
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleReset}>
        <label>New Password</label>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? closeeye : openeye}
            alt="toggle password"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "35%",
              transform: "translateY(-50%)",
              width: "15px",
              cursor: "pointer",
            }}
          />
        </div>

        <label>Confirm Password</label>

        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <img
            src={showConfirmPassword ? closeeye : openeye}
            alt="toggle confirm password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "35%",
              transform: "translateY(-50%)",
              width: "15px",
              cursor: "pointer",
            }}
          />
        </div>

        <button>Reset Password</button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
