"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHeaderContext } from "@/app/context/headerContext";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const { setShowHeader } = useHeaderContext(); // Use HeaderContext

  useEffect(() => {
    setShowHeader(false); // Hide header when on the register page
    return () => setShowHeader(true); // Restore header when leaving the register page
  }, [setShowHeader]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        alert("Đăng ký thành công!");
        router.push("/auth/login");
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("Tên đăng nhập đã tồn tại.");
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center section-ninja1">
      <div className="bg-black/10 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md lg:my-auto">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Đăng ký
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập Email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>

          <p className="text-sm text-center mt-4">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-blue-600 hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}
