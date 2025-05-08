import Link from "next/link";
import React from "react";

export default function Dropmenugame() {
  return (
    <main className=" ">
      <li className="relative ">
        <Link
          href="/post"
          className="hover:bg-white/10 px-4 py-2 rounded transition-all inline-block"
        >
          Game
        </Link>

        {/* Dropdown menu */}
        <ul className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
          <li>
            <Link
              href="/download"
              className="block px-4 py-2 hover:bg-white/10"
            >
              Tải game
            </Link>
          </li>
          <li>
            <Link
              href="/payments"
              className="block px-4 py-2 hover:bg-white/10"
            >
              Nạp tiền
            </Link>
          </li>
          <li>
            <Link
              href="/giftcode"
              className="block px-4 py-2 hover:bg-white/10"
            >
              Giftcode
            </Link>
          </li>
          <li>
            <Link
              href="/doiluong"
              className="block px-4 py-2 hover:bg-white/10"
            >
              Đổi lượng
            </Link>
          </li>

          <li>
            <Link
              href="/vongquay"
              className="block px-4 py-2 hover:bg-white/10"
            >
              Vòng quay
            </Link>
          </li>
        </ul>
      </li>
    </main>
  );
}
