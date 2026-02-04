import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthHome";
import illustration from "../assets/hero.png";
import openeye from "../assets/openeye.png";
import closeeye from "../assets/closeeye.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log in to your account"
      subtitle="Welcome back! Please enter your details."
      image={illustration}
      showBrand={true}
    >
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
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
              opacity: 1,
            }}
          />
        </div>

        <div className="auth-forgot">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="auth-bottom-link">
        Don't you have an account?
        <Link to="/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
