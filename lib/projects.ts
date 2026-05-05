import type { LucideIcon } from "lucide-react";
import { Car, Smartphone, Terminal, Monitor } from "lucide-react";

export type ProjectStatus = "production" | "en-cours" | "termine" | "prototype";

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  techs: string[];
  competences: number[];
  status: ProjectStatus;
  periode: string;
  icon: LucideIcon;
};

export const projects: ProjectMeta[] = [
  {
    slug: "autosoft",
    title: "AutoSoft",
    tagline: "ERP SaaS pour auto-ecoles, en production",
    techs: ["Next.js", "Supabase", "Stripe", "TypeScript"],
    competences: [2, 3, 4, 5],
    status: "production",
    periode: "Mai 2025 - present",
    icon: Car,
  },
  {
    slug: "android-studio",
    title: "Application Android GSB",
    tagline: "Gestion RDV visiteurs medicaux, Java + SQLite",
    techs: ["Java", "Android", "SQLite", "JUnit 4"],
    competences: [2, 3, 4, 5],
    status: "termine",
    periode: "2024 - 2025",
    icon: Smartphone,
  },
  {
    slug: "c-sharp",
    title: "Projet C# GSB",
    tagline: "Gestion parc informatique, .NET + SQL Server",
    techs: ["C#", ".NET", "SQL Server", "WinForms"],
    competences: [0, 1, 3, 4],
    status: "termine",
    periode: "2024 - 2025",
    icon: Terminal,
  },
  {
    slug: "glpi-customized",
    title: "GLPI Customized",
    tagline: "Gestion de parc sur mesure, PHP + REST API",
    techs: ["PHP", "MySQL", "REST API", "GLPI"],
    competences: [0, 1, 3, 4],
    status: "termine",
    periode: "2024",
    icon: Monitor,
  },
];

export const TOLARYS_PROJECTS = [
  "Tolarys Auto",
  "Prestigear",
  "Porsche",
  "Afro Burger",
  "Odyssee Sucree",
  "RL Auto",
  "Auto-ecole",
  "Portfolio Louis",
  "Gym Club",
  "Sport Club",
  "JS Barber",
  "Eldon Camp",
  "BDB Buy",
  "AppForge",
] as const;

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  production: "En production",
  "en-cours": "En cours",
  termine: "Termine",
  prototype: "Prototype",
};

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
