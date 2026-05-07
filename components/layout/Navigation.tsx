"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "Profil" },
  { href: "#stages", label: "Parcours" },
  { href: "#autosoft", label: "Projet phare" },
  { href: "#projects", label: "Projets" },
  { href: "#e5", label: "Competences" },
  { href: "#veille", label: "Veille" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-fg"
            aria-label="Accueil"
          >
            MM<span className="text-accent">.</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-fg/70 transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/cv"
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent/90"
            >
              <FileText size={14} strokeWidth={1.5} />
              CV
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-fg transition-colors hover:bg-surface lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-border pb-4 pt-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-fg/70 transition-colors hover:bg-surface hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/cv"
                onClick={() => setIsOpen(false)}
                className="mt-3 inline-flex items-center gap-2 self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent/90"
              >
                <FileText size={14} strokeWidth={1.5} />
                CV
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
