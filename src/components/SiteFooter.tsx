const LINE_URL = "https://line.me/R/ti/p/%40989evvhq";
const LINE_ID = "@989evvhq";
const EMAIL = "enghuang100@gmail.com";

export default function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-[1000px] px-5 py-10 text-sm text-soft sm:px-8 md:px-15">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <p>© {new Date().getFullYear()} Alvin · Built with Next.js + Tailwind</p>

          <div className="flex flex-col gap-1.5 md:items-end">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-soft/70 uppercase">
              Contact
            </span>
            <p>
              LINE ID：
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {LINE_ID}
              </a>
            </p>
            <p>
              Email：
              <a
                href={`mailto:${EMAIL}`}
                className="underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
