"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useHeaderContext } from "@/app/context/headerContext";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setShowHeader } = useHeaderContext();

  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, [setShowHeader]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/forgot-password`;

    try {
      const res = await axios.post(API_URL, { email });

      const { token } = res.data;

      if (token) {
        toast.success("Xác thực email thành công. Đang chuyển hướng...");
        router.push(`/auth/rs-password?token=${token}`);
      } else {
        toast.error("Lỗi: Không nhận được token.");
      }

      setEmail("");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Có lỗi xảy ra.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center section-ninja1">
      <div className="bg-black/10 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-4xl text-primary font-bold mb-6 text-center">
          Quên mật khẩu
        </h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Nhập Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác thực Email"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            <a href="/auth/login" className="text-sm text-gray-200 mr-4">
              Quay lại
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
