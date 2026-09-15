import Link from "next/link";
import LightsToggle from "./LightsToggle";
import NavLinks from "./NavLinks";

/**
 * 全站頂欄。捲到任何位置都看得到「首頁」「所有作品」與關燈開關；
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

          <div className="flex items-center gap-3 sm:gap-5">
            <NavLinks />
            <LightsToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
