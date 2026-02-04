import { useEffect, useState } from "react";
import { getProfile, changePassword, updateProfile } from "../api/settingsApi";
import { toast } from "react-hot-toast";
import "../styles/settingsStyles.css";

import eyeopen from "../assets/openeye.png";
import eyeclose from "../assets/closeeye.png";

import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuth();

  // Load Profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setName(data.name);
      } catch {
        toast.error("Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  //Password Validation
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialCharacter: /[!@#$%^&*]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const firstName = profile?.name || "";

  const isNameChanged = name !== firstName;
  const isPasswordEntered = password.length > 0;

  const canSave =
    isNameChanged ||
    (isPasswordEntered && isPasswordValid && password === confirmPassword);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("First name cannot be empty");
      return;
    }

    if (password || confirmPassword) {
      if (!isPasswordValid) {
        toast.error("Password does not meet criteria");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);

      if (name !== profile.name) {
        await updateProfile(name);

        // update local profile state
        setProfile((prev) => ({
          ...prev,
          name,
        }));

        // update sidebar (AuthContext)
        updateUser({ name });
      }

      // Update password
      if (password) {
        await changePassword(password);
        setPassword("");
        setConfirmPassword("");
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div className="table-loading">Loading settings...</div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h4>Settings</h4>
      </div>

      <hr />

      <div className="card settings-card">
        <h3>Edit Profile</h3>
        <div className="settings-form">
          <hr />

          <div className="settings-field">
            <label>First Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="settings-field">
            <label>Last Name</label>
            <input value={profile.lastName} disabled />
          </div>

          <div className="settings-field">
            <label>Email</label>
            <input value={profile.email} disabled />
          </div>

          <div className="settings-field password-field">
            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? eyeclose : eyeopen}
                alt="toggle"
                className="password-eye"
                onClick={() => setShowPassword((p) => !p)}
              />
            </div>

            <ul className="password-rules">
              <li className={passwordRules.length ? "valid" : ""}>
                At least 8 characters
              </li>
              <li className={passwordRules.uppercase ? "valid" : ""}>
                At least 1 uppercase letter
              </li>
              <li className={passwordRules.lowercase ? "valid" : ""}>
                At least 1 lowercase letter
              </li>
              <li className={passwordRules.number ? "valid" : ""}>
                At least 1 number
              </li>
              <li className={passwordRules.specialCharacter ? "valid" : ""}>
                At least 1 special Character
              </li>
            </ul>
          </div>

          <div className="settings-field password-field">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={showConfirm ? eyeclose : eyeopen}
                alt="toggle"
                className="password-eye"
                onClick={() => setShowConfirm((p) => !p)}
              />
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={loading || !canSave}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
