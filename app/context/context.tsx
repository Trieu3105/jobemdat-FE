'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback, // Import useCallback
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Định nghĩa interface cho User và UserContextType
interface User {
  id: number;
  username: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  avatar: string;
  gender: number;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authenticate: () => Promise<boolean>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = Cookies.get("access_token");

  // Hàm fetch thông tin người dùng từ API
  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        setUser(response.data); // Ensure avatar is included in response
        localStorage.setItem("user", JSON.stringify(response.data)); // Lưu vào localStorage
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 && response.data.authenticated) {
        await fetchUserData(token); // Fetch user data if authenticated
        return true;
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }

    setUser(null);
    Cookies.remove("access_token");
    localStorage.removeItem("user");
    return false;
  }, [token]); // Add 'token' as a dependency

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        { username, password }
      );

      if (response.status === 200) {
        const newToken = response.data.token;
        Cookies.set("access_token", newToken, { expires: 1 }); // Lưu token vào cookies
        await fetchUserData(newToken); // Fetch and set user data in context
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("access_token"); // Xóa token khi đăng xuất
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    authenticate(); // Gọi authenticate luôn, nếu có token nó sẽ xử lý
  }, [authenticate]); // Add 'authenticate' to the dependency array

  return (
    <UserContext.Provider
      value={{ user, setUser, authenticate, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
