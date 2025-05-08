// app/auth/login/page.tsx

"use client";

import React, { useState } from "react";
import { useUserContext } from "../../context/context"; // Giữ nguyên context này
import { useLoginModal } from "../../context/LoginModalContext"; // Import context mới để sử dụng modal

interface HomeProps {
  isLoginModalOpen: boolean;
  toggleLoginModal: () => void;
}

export default function Home({ isLoginModalOpen, toggleLoginModal }: HomeProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext(); // Giữ nguyên

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password); // Use login function from context
      setUsername(""); // Clear username input
      setPassword(""); // Clear password input
      toggleLoginModal();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Network Error")) {
          alert("Login failed: Unable to connect to the server. Please check your internet connection.");
        } else {
          alert("Login failed: " + error.message);
        }
      } else {
        alert("Login failed: Unknown error");
      }
    }
  };

  return (
    <main>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm text-gray-900 font-medium">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-gray-900 font-medium">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleLoginModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
