import Link from "next/link";
import LightsToggle from "./LightsToggle";

/**
 * 全站頂欄。捲到任何位置都看得到「所有作品」與關燈開關；
 * 聯絡出口不放這裡，由右側浮動的 ContactRail 負責，避免同一件事出現三次。
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-ground transition-colors duration-400">
      <div className="mx-auto w-full max-w-[1000px] px-5 sm:px-8 md:px-15">
        <div className="flex min-h-[62px] items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-[19px] font-black tracking-tight text-ink"
          >
            Alvin
          </Link>

          <div className="flex items-center gap-5">
            <nav className="hidden items-center gap-6 sm:flex">
              <Link
                href="/work"
                className="border-b border-accent pb-0.5 text-sm font-medium text-accent"
              >
                所有作品
              </Link>
              <Link
                href="/#about"
                className="text-sm text-soft transition-colors hover:text-ink"
              >
                關於
              </Link>
            </nav>
            <LightsToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
