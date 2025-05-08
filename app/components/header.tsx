"use client";
import React from "react";
import Link from "next/link";
import Dropmenugame from "./dropmenugame";
import Login from "../auth/login/page";
import { useUserContext } from "../context/context";
// import { useLoginModal } from "../context/LoginModalContext"; // Import LoginModalContext

interface HomeProps {
  isLoginModalOpen: boolean;
  toggleLoginModal: () => void;
}

export default function Home({ isLoginModalOpen, toggleLoginModal }: HomeProps) {
  const { user, logout } = useUserContext(); // Access user and logout from context
  // const { isLoginModalOpen, toggleLoginModal } = useLoginModal(); // Use LoginModalContext

  return (
    <>
      <header className="fixed top-0 left-0 w-full text-primary flex justify-between items-center z-20 bg-black/10 backdrop-blur-sm  px-4">
        {/* Logo */}
        <div className="py-2 lg:ml-24 ">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/image/banner1.jpg"
              alt="NSO Logo"
              className="h-10 w-auto object-cover"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-2 text-sm lg:text-base font-medium items-center ">
            <li>
              <form action="/search" method="GET" className="relative">
                <input
                  type="search"
                  name="q"
                  placeholder="Tìm kiếm..."
                  className="bg-white/10 text-primary placeholder-white/70 px-4 py-2 rounded pl-10 focus:outline-none focus:bg-white/20 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                  />
                </svg>
              </form>
            </li>
            <li>
              <Link
                href="/"
                className="hover:bg-white/10 px-4 py-2 rounded transition-all"
              >
                Trang chủ
              </Link>
            </li>
            <li className="relative group">
              <span className="hover:bg-white/10 px-4 py-2 rounded transition-all inline-block">
                <Dropmenugame />
              </span>
            </li>
            <li>
              <Link
                href="/"
                className="hover:bg-white/10 px-4 py-2 rounded transition-all"
              >
                Sự kiện
              </Link>
            </li>
            <li>
              <Link
                href="/ranking"
                className="hover:bg-white/10 px-4 py-2 rounded transition-all"
              >
                Bảng xếp hạng
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:bg-white/10 px-4 py-2 rounded transition-all"
              >
                Cửa Hàng
              </Link>
            </li>
            <li>
              {user ? (
                <div className="relative group flex items-center space-x-2">
                  {/* <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  /> */}
                  <span className="hover:bg-white/10 px-4 py-2 rounded transition-all cursor-pointer">
                    {user.username}
                  </span>
                  <div className="absolute top-10 right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/profile" className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded ">
                      Thông tin cá nhân
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded "
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={toggleLoginModal}
                  className="hover:bg-white/10 px-4 py-2 rounded transition-all"
                >
                  Đăng nhập
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Login
        isLoginModalOpen={isLoginModalOpen}
        toggleLoginModal={toggleLoginModal}
      />
    </>
  );
}
