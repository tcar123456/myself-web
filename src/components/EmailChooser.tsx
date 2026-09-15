"use client";

import { useId, useRef, useState } from "react";
import { EMAIL, EMAIL_HREF, GMAIL_COMPOSE_HREF } from "@/lib/contact";

/**
 * 「寄 Email」按鈕 + 選擇寄信方式的小視窗。
 *
 * 只放寄信連結不夠：它要靠電腦有設定信件軟體才會動，很多 Windows 電腦沒設定，
 * 點了只開一個空白瀏覽器視窗，客人以為壞了就走掉。所以給三條路：
 * 網頁版 Gmail、裝置上的信件軟體、直接複製信箱。
 *
 * 用原生 <dialog>：Esc 關閉、焦點鎖在視窗內、蓋在浮動按鈕與頂欄上面，都是瀏覽器內建的。
 */
export default function EmailChooser({
  className = "",
  ariaLabel,
  children,
}: {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const uid = useId();
  const titleId = `${uid}-title`;
  const addressId = `${uid}-address`;

  function open() {
    setCopied(false);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪貼簿被瀏覽器擋下時，改成把地址整段選起來，讓人自己按複製
      const el = document.getElementById(addressId);
      const selection = window.getSelection();
      if (el && selection) {
        const range = document.createRange();
        range.selectNodeContents(el);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  const option =
    "group flex items-center justify-between gap-4 border-b border-rule py-4 transition-colors hover:text-accent";

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        className={`cursor-pointer ${className}`}
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // 點視窗外面的暗色區域也能關
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[min(100%_-_2rem,26rem)] border border-rule bg-ground p-0 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] backdrop:bg-black/45"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-serif text-[22px] font-bold leading-snug">
              寄信給 Alvin
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="-mt-1.5 -mr-2.5 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center text-soft transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-soft">
            主旨和要填的項目都幫你打好了，選一個方便的方式。
          </p>

          <div className="mt-5 flex flex-col border-t border-rule">
            <a
              href={GMAIL_COMPOSE_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className={option}
            >
              <span>
                <span className="block text-[15px] font-medium">用 Gmail 寫信</span>
                <span className="mt-0.5 block text-[13px] text-soft">
                  在瀏覽器打開 Gmail，有登入就能直接寄
                </span>
              </span>
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* 手機一定有信件 App，這條在手機上排第一；電腦上 Gmail 比較可靠，排第一 */}
            <a href={EMAIL_HREF} onClick={close} className={`${option} max-md:order-first`}>
              <span>
                <span className="block text-[15px] font-medium">用信件軟體寫信</span>
                <span className="mt-0.5 block text-[13px] text-soft">
                  手機的郵件 App，或電腦的 Outlook
                </span>
              </span>
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <span id={addressId} className="text-sm text-body select-all">
              {EMAIL}
            </span>
            <button
              type="button"
              onClick={copyAddress}
              className={`min-h-10 cursor-pointer border px-3.5 text-[13px] font-medium transition-colors ${
                copied
                  ? "border-accent text-accent"
                  : "border-rule text-body hover:border-accent hover:text-accent"
              }`}
            >
              <span aria-live="polite">{copied ? "已複製" : "複製信箱"}</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
