import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white/10 backdrop-blur-sm rounded-md p-4">
      <div className="text-center ">
        <div className="flex flex-col items-center w-full justify-center mb-1">
          <Link
            href={"/download"}
            className="text-2xl font-bold  w-full text-primary  p-2 border-border rounded-xl  shadow-md hover:bg-muted/80 transition"
          >
            Tải game
          </Link>
          <Link href={"/"} className="text-2xl w-full font-bold text-primary p-2 my-1 border-border rounded-xl  shadow-md hover:bg-muted/80 transition">
            Cộng đồng
          </Link>
        </div>
        <aside className="w-64  border text-left border-border mx-auto rounded-xl p-4 space-y-2 shadow-md">
          {/* Sidebar with dropdown menus, each with different submenus */}
          <SidebarItem
          
            title="Chức Năng"
            subMenuItems={[
              { label: "Nạp Tiền", href: "/payments" },
              { label: "Đổi Lượng", href: "/" },
              { label: "GiftCode", href: "/giftcode" },
              { label: "GiftCode", href: "/giftcode" },
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
        </aside>
      </div>
    </main>
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
        className="w-full text-left px-4 py-2 text-white font-bold rounded-lg hover:bg-accent transition text-foreground"
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
            className="overflow-hidden text-white"
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
