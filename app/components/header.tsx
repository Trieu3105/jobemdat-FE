"use client";
import React from "react";
import Link from "next/link";
import Dropmenugame from "./dropmenugame";
import { useUserContext } from "../context/context";
import { useState } from "react";
import Image from "next/image";
import { useHeaderContext } from "../context/headerContext"; // Import HeaderContext
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { user, logout } = useUserContext();
  const { showHeader } = useHeaderContext(); // Use HeaderContext
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (!showHeader) return null; // Do not render Header if showHeader is false

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-black/10 backdrop-blur-sm px-4">
      {/* MOBILE HEADER (Chỉ hiện trên mobile) */}
      <div className="flex items-center justify-between md:hidden h-14 relative">
        {/* Menu Toggle */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-white z-10"
        >
          <Menu size={28} />
        </button>

        {/* Logo (centered with absolute) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              src="/image/banner1.jpg"
              alt="NSO Logo"
              width={40}
              height={40}
              className="h-10 w-auto object-cover"
            />
          </Link>
        </div>

        {/* Avatar/User icon */}
        <div className="z-10">
          {user ? (
            // <Image
            //   src={user.avatar}
            //   alt="Avatar"
            //   width={32}
            //   height={32}
            //   className="rounded-full"
            // />
            <p className="text-white text-xl font-semibold">
              Hello,{user.username}
            </p>
          ) : (
            <User className="text-white w-6 h-6" />
          )}
        </div>
      </div>

      {/* DESKTOP HEADER (Ẩn trên mobile) */}
      <div className="hidden md:flex justify-between text-primary items-center py-2">
        {/* Logo (trái trên desktop) */}
        <div className="flex items-center text-primary space-x-4 ml-10">
          <Link href="/">
            <Image
              src="/image/banner1.jpg"
              alt="NSO Logo"
              width={50}
              height={50}
              className="h-12 w-auto object-cover"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-2 text-sm lg:text-base font-medium items-center">
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
                href="/post"
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
                href="/shop"
                className="hover:bg-white/10 px-4 py-2 rounded transition-all"
              >
                Cửa Hàng
              </Link>
            </li>
            <li>
              {user ? (
                <div className="relative group flex items-center space-x-2">
                  <span className="hover:bg-white/10 px-4 py-2 rounded transition-all cursor-pointer">
                    {user.username}
                  </span>
                  <div className="absolute top-10 right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Thông tin cá nhân
                    </Link>
                    <button
                      onClick={logout}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hover:bg-white/10 px-4 py-2 rounded transition-all"
                >
                  Đăng nhập
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white z-40 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden overflow-y-auto`}
      >
        <div className="flex justify-between items-center text-white p-4 border-b bg-gray-500 border-white/20">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleMenu} className="text-black">
            <X size={28} />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="flex flex-col p-4 space-y-4 text-black font-medium">
          <SidebarItem
            title="Chức Năng"
            subMenuItems={[
              { label: "Nạp Tiền", href: "/payments" },
              { label: "Đổi Lượng", href: "/" },
              { label: "GiftCode", href: "/giftcode" },
              { label: "Vòng Quay", href: "/" },
            ]}
          />
          <SidebarItem
            title="Cửa Hàng"
            subMenuItems={[
              { label: "Cửa Hàng Tân Thủ", href: "/games/1" },
              { label: "Cửa Hàng Vũ Khí", href: "/games/2" },
              { label: "Cửa Hàng Trang Bị", href: "/games/3" },
            ]}
          />
          <SidebarItem
            title="Xếp Hạng"
            subMenuItems={[
              { label: "Vinh Danh", href: "/ranking" },
              { label: "Cao Thủ", href: "/ranking/caothu" },
              { label: "Gia Tộc", href: "/ranking/giatoc" },
            ]}
          />
          <SidebarItem
            title="Cài đặt"
            subMenuItems={[
              { label: "Game 1", href: "/games/1" },
              { label: "Game 2", href: "/games/2" },
              { label: "Game 3", href: "/games/3" },
            ]}
          />
          <SidebarItem
            title="Hỗ trợ"
            subMenuItems={[
              { label: "Game 1", href: "/games/1" },
              { label: "Game 2", href: "/games/2" },
              { label: "Game 3", href: "/games/3" },
            ]}
          />
          <SidebarItem
            title="Liên hệ"
            subMenuItems={[
              { label: "Game 1", href: "/games/1" },
              { label: "Game 2", href: "/games/2" },
              { label: "Game 3", href: "/games/3" },
            ]}
          />
          {user ? (
            <>
              <li>
                <Link href="/profile" onClick={toggleMenu}>
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  Đăng xuất
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/login" onClick={toggleMenu}>
                Đăng nhập
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
function SidebarItem({
  title,
  subMenuItems,
}: {
  title: string;
  subMenuItems: { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 text-black font-bold rounded-lg hover:bg-accent transition text-foreground"
      >
        {title}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden text-black"
          >
            <div className="pl-4 pr-2 pb-2 pt-1 space-y-1">
              {subMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
