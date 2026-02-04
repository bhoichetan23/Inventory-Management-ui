import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

import homeIcon from "../assets/homeIcon.png";
import productIcon from "../assets/productIcon.png";
import invoiceIcon from "../assets/invoiceIcon.png";
import statIcon from "../assets/statIcon.png";
import settingIcon from "../assets/settingIcon.png";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="sidebar-divider-top"></div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          <img src={homeIcon} alt="" />
          Home
        </NavLink>

        <NavLink to="/products">
          <img src={productIcon} alt="" />
          Products
        </NavLink>

        <NavLink to="/invoices">
          <img src={invoiceIcon} alt="" />
          Invoices
        </NavLink>

        <NavLink to="/statistics">
          <img src={statIcon} alt="" />
          Statistics
        </NavLink>

        <NavLink to="/settings">
          <img src={settingIcon} alt="" />
          Settings
        </NavLink>
      </nav>

      {/* Bottom User */}
      <div className="sidebar-user">
        <div className="sidebar-divider-bottom"></div>
        <p>{user?.name ?? user}</p>
      </div>
    </div>
  );
};

export default Sidebar;
