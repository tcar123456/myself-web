"use client";

/**
 * 關燈開關。預設一律開燈（見 globals.css），按下後在 <html> 掛 data-theme="dark"
 * 並記住選擇。標籤用 CSS 切換而不是 React state，所以不會有 hydration 不一致，
 * 也不會在載入時閃一下錯的字。
 */
export default function LightsToggle() {
  function toggle() {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";

    if (isDark) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "dark");
    }

    try {
      localStorage.setItem("theme", isDark ? "light" : "dark");
    } catch {
      // 無痕視窗或封鎖網站資料時會丟例外，記不住就算了，不影響切換
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-10 cursor-pointer items-center gap-2 border border-rule px-3.5 text-[13px] font-medium text-soft transition-colors hover:border-soft hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="size-4 shrink-0 text-accent"
      >
        <g strokeWidth="1.4" className="transition-opacity duration-300 dark:opacity-0">
          <path d="M12 1.7V0.5" />
          <path d="M19.6 4.4l-.85.85" />
          <path d="M4.4 4.4l.85.85" />
        </g>
        <path
          d="M12 3.4a5.6 5.6 0 0 0-3.3 10.1c.46.34.75.88.75 1.45v.35h5.1v-.35c0-.57.29-1.11.75-1.45A5.6 5.6 0 0 0 12 3.4Z"
          className="fill-accent/25 transition-opacity duration-300 dark:fill-transparent"
        />
        <path d="M9.6 18.3h4.8" />
        <path d="M10.7 21h2.6" />
      </svg>
      <span className="dark:hidden">關燈</span>
      <span className="hidden dark:inline">開燈</span>
    </button>
  );
}
