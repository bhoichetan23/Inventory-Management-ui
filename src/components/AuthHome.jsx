import logo from "../assets/logo.png";
import "../styles/AuthHomeStyles.css";

const AuthLayout = ({ title, subtitle, image, showBrand = true, children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </div>

      <div className="auth-right">
        {showBrand && (
          <>
            <img src={logo} className="auth-logo" alt="logo" />
            <h1>
              Welcome to <br /> Company Name
            </h1>
          </>
        )}

        <img src={image} alt="auth illustration" />
      </div>
    </div>
  );
};

export default AuthLayout;
