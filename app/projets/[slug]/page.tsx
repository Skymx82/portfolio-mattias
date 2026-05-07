import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileDown,
  Layers,
  ExternalLink,
} from "lucide-react";
import {
  COMPETENCES_BTS,
  STATUS_LABELS,
  getProjectBySlug,
  projects,
} from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.title} | Mattias Mathevon`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const Icon = project.icon;

  return (
    <main className="relative bg-bg pt-32 pb-32 sm:pt-40">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Retour aux projets
        </Link>

        <header className="mt-10 flex flex-col gap-6 border-b border-border pb-12">
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-accent">
              <Icon size={22} strokeWidth={1.5} />
            </div>
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {STATUS_LABELS[project.status]}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <Calendar size={12} strokeWidth={1.5} />
              {project.periode}
            </span>
            {project.client && (
              <span className="font-mono text-[11px] text-muted">
                {project.client}
              </span>
            )}
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-tight text-fg">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg sm:text-xl text-fg/85 leading-relaxed">
            {project.tagline}
          </p>
        </header>

        {/* Description */}
        <section className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Description
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="text-base sm:text-lg leading-relaxed text-fg/85">
              {project.description}
            </p>
          </div>
        </section>

        {/* Contexte */}
        <section className="mt-12 grid gap-10 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Contexte
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="text-base leading-relaxed text-muted">
              {project.context}
            </p>
          </div>
        </section>

        {/* Objectifs */}
        <section className="mt-12 grid gap-10 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Objectifs
            </p>
          </div>
          <ul className="space-y-3 md:col-span-8">
            {project.objectives.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm sm:text-base text-fg/85 leading-relaxed"
              >
                <CheckCircle2
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-accent"
                />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Fonctionnalites */}
        <section className="mt-12 grid gap-10 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Fonctionnalites
            </p>
          </div>
          <ul className="space-y-3 md:col-span-8">
            {project.features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm sm:text-base text-fg/85 leading-relaxed"
              >
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Stack + competences */}
        <section className="mt-12 grid gap-10 border-t border-border pt-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Stack &amp; competences
            </p>
          </div>
          <div className="space-y-6 md:col-span-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Technologies
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techs.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-fg/85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Competences BTS mobilisees
              </p>
              <ul className="mt-3 space-y-2">
                {project.competences.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-fg/85"
                  >
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-[10px] font-medium text-accent">
                      C{c + 1}
                    </span>
                    <span>{COMPETENCES_BTS[c]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Captures */}
        {project.images.length > 0 && (
          <section className="mt-12 border-t border-border pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Captures
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.images.map((img, i) => (
                <figure
                  key={i}
                  className="space-y-3 rounded-lg border border-border bg-surface p-4"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-bg">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="text-xs text-muted leading-relaxed">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Fichiers */}
        {project.files.length > 0 && (
          <section className="mt-12 border-t border-border pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Documents
            </p>
            <ul className="mt-8 space-y-3">
              {project.files.map((file) => (
                <li key={file.url}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/40 hover:bg-bg"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-bg text-fg/80 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <FileDown size={18} strokeWidth={1.5} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-medium text-fg group-hover:text-accent transition-colors">
                        {file.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {file.description}
                      </span>
                    </span>
                    <ExternalLink
                      size={14}
                      strokeWidth={1.5}
                      className="shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer nav */}
        <div className="mt-16 flex justify-between border-t border-border pt-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Retour aux projets
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            <Layers size={14} strokeWidth={1.5} />
            Me contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
