"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/context";
import { useHeaderContext } from "@/app/context/headerContext";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const { setShowHeader } = useHeaderContext(); // Use HeaderContext

  useEffect(() => {
    setShowHeader(false); // Hide header when on the login page
    return () => setShowHeader(true); // Restore header when leaving the login page
  }, [setShowHeader]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setUsername("");
      setPassword("");
      router.push("/"); // Redirect to homepage or dashboard
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Network Error")) {
          alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra internet.");
        } else {
          alert("Đăng nhập thất bại: " + error.message);
        }
      } else {
        alert("Đăng nhập thất bại: Lỗi không xác định");
      }
    }
  };

  return (
    <main className="min-h-screen flex section-ninja1 items-center justify-center">
      <div className="rounded-lg shadow-lg bg-black/10 backdrop-blur-sm p-4 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-primary text-center">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-white">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-white">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => router.push("/auth/fpc")}
            >
              Quên mật khẩu?
            </button>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => router.push("/auth/register")}
            >
              Đăng ký
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </main>
  );
}
