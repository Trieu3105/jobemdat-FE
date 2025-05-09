"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHeaderContext } from "@/app/context/headerContext";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { setShowHeader } = useHeaderContext();

  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, [setShowHeader]);

  useEffect(() => {
    if (!token) {
      alert("Liên kết không hợp lệ hoặc đã hết hạn.");
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reset-password`,
        {
          token,
          newPassword: password,
        }
      );

      if (res.status === 200) {
        alert("Đặt lại mật khẩu thành công!");
        router.push("/auth/login");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Lỗi khi đặt lại mật khẩu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center section-ninja1 p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-primary">
          Đặt lại mật khẩu
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-white">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </form>
      </div>
    </main>
  );
}
