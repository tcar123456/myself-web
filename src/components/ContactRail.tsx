"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { LINE_URL } from "@/lib/contact";
import EmailChooser from "./EmailChooser";

const circle =
  "group relative flex size-14 items-center justify-center rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.14),0_10px_24px_-10px_rgba(0,0,0,0.45)] transition-shadow hover:ring-2 hover:ring-accent";

const tooltip =
  "pointer-events-none absolute right-[68px] hidden bg-ink px-2.5 py-1 text-[12.5px] font-medium whitespace-nowrap text-ground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block";

/**
 * 全站浮動聯絡出口。桌機吸在右側中央，手機移到右下角免得蓋住內文。
 * z-index 壓在案例詳情頁的燈箱（z-50）底下，所以放大圖片時不會擋到左右切換鍵。
 * 本地後台不需要聯絡自己，那裡不出現。
 *
 * LINE 那顆照 LINE 官方商標規範（台灣版 v3）：
 * - logo 用官方原檔、不裁切不改色不加特效，所以放在白底圓裡，而不是把圖裁成圓
 * - 不能放在相近顏色的背景上，所以圓是白色（LINE 品牌白），不跟開關燈變
 * - 手機最小高度 40px、電腦 20px；hover 只動圓框，不動 logo
 */
export default function ContactRail() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed right-3.5 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 flex flex-col gap-3 md:top-1/2 md:right-[18px] md:bottom-auto md:-translate-y-1/2">
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="加 LINE 好友聊聊"
        className={`${circle} border border-rule bg-white`}
      >
        <Image
          src="/line-icon.png"
          alt=""
          width={40}
          height={40}
          className="size-10 object-contain md:size-9"
        />
        <span className={tooltip}>加 LINE 聊聊</span>
      </a>

      <EmailChooser
        ariaLabel="寄 Email 給 Alvin"
        className={`${circle} bg-rail text-rail-ink transition-[background-color,color,box-shadow] duration-400`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-6"
        >
          <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2" />
          <path d="m3.4 6.6 8.6 6 8.6-6" />
        </svg>
        <span className={tooltip}>寄 Email</span>
      </EmailChooser>
    </div>
  );
}
