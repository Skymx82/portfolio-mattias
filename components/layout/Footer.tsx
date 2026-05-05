import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          © 2026 Mattias Mathevon
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/mentions-legales"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
          >
            Mentions legales
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Made with Next.js + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
