import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

export const AuthContext = createContext(null);

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");
    // दोनों चीजें होनी चाहिए
    return storedUser && token ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const restoredUser = getInitialUser();
      setUser(restoredUser);
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback((data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedFields) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
