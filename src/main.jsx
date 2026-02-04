import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import AuthProvider from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster position="top-right" />
    <App />
  </AuthProvider>,
);
