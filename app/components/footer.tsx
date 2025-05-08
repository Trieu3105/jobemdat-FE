import Link from "next/link";

export default function Footer() {
  return (
    <main>
      <footer>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center h-[var(--footer-size)]">
          <div className="text-xs font-semibold">
            <span className="text-gray-500 dark:text-gray-400 mr-1">
            Ninja School Mobile |
            </span>
            <span className="text-primary-colors mr-1">2025</span>
            <span className="text-gray-500 dark:text-gray-400">CoppyRight</span>
          </div>
          <div className="text-xs font-semibold">
            <span className="text-gray-500 dark:text-gray-400 mr-1">
              Make By |
            </span>
            <Link
              href="https://www.facebook.com/"
              className="text-primary-colors"
            >
               Ninja School Mobile
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
