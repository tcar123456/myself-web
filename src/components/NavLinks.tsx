"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items: {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
  /** 手機寬度放不下三個，「關於」只是首頁上的一段，手機先藏起來 */
  desktopOnly?: boolean;
}[] = [
  { href: "/", label: "首頁", isActive: (p) => p === "/" },
  {
    href: "/work",
    label: "所有作品",
    isActive: (p) => p === "/work" || p.startsWith("/work/"),
  },
  { href: "/#about", label: "關於", isActive: () => false, desktopOnly: true },
];

/** 頂欄選單，依目前所在頁面亮起對應的那一個 */
export default function NavLinks() {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label="主選單" className="flex items-center gap-4 sm:gap-6">
      {items.map((item) => {
        const active = item.isActive(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`${item.desktopOnly ? "hidden sm:inline-flex" : "inline-flex"} min-h-11 items-center text-sm transition-colors ${
              active ? "font-medium text-accent" : "text-soft hover:text-ink"
            }`}
          >
            <span
              className={`border-b pb-0.5 ${active ? "border-accent" : "border-transparent"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
