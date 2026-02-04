import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthLayout from "../components/AuthHome";
import illustration from "../assets/hero.png";
import openeye from "../assets/openeye.png";
import closeeye from "../assets/closeeye.png";
import toast from "react-hot-toast";

const Signup = () => {
  const passwordRules = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
    { label: "One special character", test: (p) => /[!@#$%^&*]/.test(p) },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      return setErrors(["Passwords do not match"]);
    }

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();

      const res = await api.post("/auth/signup", {
        name,
        email: normalizedEmail,
        password,
      });

      // SHOW OTP IN TOAST
      toast.success(`Your OTP is ${res.data.otp}`, {
        duration: 20000,
      });

      // store OTP expiry for cooldown
      const expiryTime = Date.now() + 10 * 60 * 1000;
      localStorage.setItem("otpExpiry", expiryTime);

      // redirect to signup OTP verification
      navigate("/verify-signup-otp", {
        state: { email: normalizedEmail },
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors([err.response?.data?.message || "Signup failed"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Please enter your details to get started."
      image={illustration}
      showBrand={true}
    >
      {errors.length > 0 && (
        <div className="auth-error">
          {errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
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

        <ul className="password-checklist">
          {passwordRules.map((rule, i) => (
            <li key={i} className={rule.test(password) ? "valid" : "invalid"}>
              {rule.label}
            </li>
          ))}
        </ul>

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

        <button
          disabled={passwordRules.some((r) => !r.test(password)) || loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <div className="auth-bottom-link ">
        Already have an account?
        <Link to="/login">Log in</Link>
      </div>
    </AuthLayout>
  );
};

export default Signup;
