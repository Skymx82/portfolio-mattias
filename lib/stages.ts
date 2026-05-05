import type { LucideIcon } from "lucide-react";
import { Building2, Plane, Sparkles } from "lucide-react";

export type Stage = {
  entreprise: string;
  poste: string;
  periode: string;
  duree: string;
  lieu: string;
  description: string;
  missions: string[];
  rapport?: string | null;
  icon: LucideIcon;
  badge?: string;
};

export const stagesBts: Stage[] = [
  {
    entreprise: "Voltier Electronics",
    poste: "Stage Erasmus en informatique",
    periode: "Janv. - Fev. 2024",
    duree: "6 semaines",
    lieu: "Saint-Jacques-de-Compostelle, Espagne",
    description:
      "Stage Erasmus dans une entreprise d'electronique espagnole : automatisation, WordPress, optimisation SQL.",
    missions: [
      "Script AutoIt pour automatiser la mise en ligne d'articles WordPress",
      "Correction et optimisation de requetes SQL",
      "Participation au developpement d'un plugin WordPress",
    ],
    rapport: "#",
    icon: Plane,
    badge: "Erasmus",
  },
  {
    entreprise: "Lycee Antoine Bourdelle",
    poste: "Stagiaire en informatique",
    periode: "Mai - Juin 2024",
    duree: "6 semaines",
    lieu: "Montauban, France",
    description:
      "Installation et configuration de serveurs Microsoft pour la gestion centralisee des utilisateurs et ressources.",
    missions: [
      "Installation et configuration de serveurs Microsoft",
      "Gestion centralisee des utilisateurs et des ressources",
    ],
    rapport: "#",
    icon: Building2,
  },
  {
    entreprise: "Odyssee Sucree",
    poste: "Stagiaire en informatique",
    periode: "Mai - Juin 2025",
    duree: "6 semaines",
    lieu: "Toulouse, France",
    description:
      "Creation from scratch d'une application web de gestion de stock et de comptabilite pour des marches gourmands.",
    missions: [
      "Authentification securisee Supabase Auth",
      "Gestion des stocks en temps reel",
      "Module comptable : recettes/depenses par evenement",
      "Tableau de bord statistique et KPIs",
    ],
    rapport: "#",
    icon: Building2,
  },
];

export const stagesSnee: Stage[] = [
  {
    entreprise: "Tolarys",
    poste: "Cofondateur, developpeur web",
    periode: "Mars 2025 - present",
    duree: "En cours",
    lieu: "Toulouse, France",
    description:
      "Agence de developpement web specialisee Next.js, Supabase et e-commerce Medusa. Cinq clients accompagnes.",
    missions: [
      "Developpement d'applications web Next.js + Supabase",
      "Audit et mise en conformite RGAA 4.1 / EN 301 549",
      "Apps multitenant avec donnees separees par client",
      "Boutiques e-commerce custom Medusa.js",
    ],
    rapport: null,
    icon: Building2,
    badge: "SNEE",
  },
  {
    entreprise: "AutoSoft",
    poste: "Fondateur, developpeur full stack",
    periode: "Janv. - Fev. 2026 (cadre SNEE)",
    duree: "1 an de dev cumule",
    lieu: "Toulouse, France et a distance",
    description:
      "ERP SaaS complet pour auto-ecoles, developpe de zero. En production avec 4 auto-ecoles partenaires.",
    missions: [
      "Architecture multitenant Supabase RLS",
      "Integration API ANTS (demarches permis de conduire)",
      "Mise en conformite RGPD (collecte et traitement)",
      "Negociation partenariat avec un editeur logiciel (Tolarys/Prestadoss)",
      "Integration de deux auto-ecoles partenaires en beta",
    ],
    rapport: "#",
    icon: Sparkles,
    badge: "SNEE",
  },
];

export const stagesPreBts: Stage[] = [
  {
    entreprise: "3R - Recherches et Realisations Remy",
    poste: "Stagiaire en informatique",
    periode: "Mars - Avril 2023",
    duree: "8 semaines",
    lieu: "Montauban, France",
    description:
      "Scripts d'automatisation et outils de monitoring serveur dans une entreprise de R&D.",
    missions: [
      "Scripts C# pour automatiser des taches internes",
      "Script serveur de verification DNS avec rapport mail",
    ],
    rapport: "#",
    icon: Building2,
  },
  {
    entreprise: "MAF RODA AGROBOTIC",
    poste: "Stagiaire en informatique",
    periode: "Nov. - Dec. 2022",
    duree: "8 semaines",
    lieu: "Montauban, France",
    description:
      "Stage technique dans une entreprise de calibreuses de fruits : production, montage, configuration.",
    missions: [
      "Montage et configuration de PC, boot a partir d'images systeme",
      "Realisation de baies de brassage",
      "Soudure de composants traversants",
    ],
    rapport: "#",
    icon: Building2,
  },
];
