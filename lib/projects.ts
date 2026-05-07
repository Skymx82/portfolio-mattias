import type { LucideIcon } from "lucide-react";
import { Car, Smartphone, Terminal, Monitor } from "lucide-react";

export type ProjectStatus = "production" | "en-cours" | "termine" | "prototype";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectFile = {
  name: string;
  description: string;
  type: "pdf" | "doc" | "image" | "link" | "zip";
  url: string;
  size?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  context: string;
  objectives: string[];
  features: string[];
  techs: string[];
  competences: number[];
  status: ProjectStatus;
  periode: string;
  client?: string;
  icon: LucideIcon;
  images: ProjectImage[];
  files: ProjectFile[];
  github?: string;
  demo?: string;
};

export const projects: ProjectMeta[] = [
  {
    slug: "autosoft",
    title: "AutoSoft",
    tagline: "ERP SaaS complet pour auto-ecoles, en production",
    description:
      "AutoSoft est un ERP SaaS complet pour auto-ecoles, developpe de zero en Next.js et Supabase. Dashboard temps reel, gestion des eleves, planning multi-moniteurs, comptabilite, paiements Stripe et application mobile dediee aux moniteurs. Une architecture multitenant scalable en production.",
    context:
      "Face au manque de solutions modernes et abordables pour les auto-ecoles, AutoSoft est ne en reponse a un besoin reel du marche. Les gerants passaient des heures a gerer manuellement plannings, dossiers eleves et paiements. AutoSoft centralise tout en une interface intuitive, avec une app mobile pour les moniteurs. Le projet est ne dans le cadre du statut etudiant-entrepreneur SNEE avec l'Universite Federale Toulouse Midi-Pyrenees.",
    objectives: [
      "Centraliser la gestion complete d'une auto-ecole (eleves, moniteurs, vehicules, comptabilite)",
      "Fournir un dashboard avec KPIs en temps reel (CA, eleves actifs, leçons, examens)",
      "Automatiser le planning multi-moniteurs avec vue jour/semaine/mois",
      "Proposer une app mobile pour les moniteurs (planning, progression eleve, evaluation)",
      "Integrer un systeme de paiement Stripe et suivi comptable",
      "Architecture multitenant pour gerer plusieurs auto-ecoles independantes",
    ],
    features: [
      "Dashboard KPIs : eleves actifs, examens prevus, leçons par semaine",
      "Repartition eleves : Actif, Complet, En attente, Incomplet, Archive",
      "Gestion eleves : tableau filtrable (nom, age, email, tel, categorie A/B/C1E)",
      "Planning semaine multi-moniteurs avec creneaux colores par moniteur",
      "App mobile moniteur : leçon en cours, progression (4h/20h), evaluation, observation, examen blanc",
      "Modules : Comptabilite, Vehicules, Paiements, Mon auto-ecole",
      "Architecture multitenant Supabase RLS, plusieurs auto-ecoles isolees",
      "Integration API ANTS pour les demarches liees au permis de conduire",
    ],
    techs: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
      "REST API",
    ],
    competences: [2, 3, 4, 5],
    status: "production",
    periode: "Mai 2025 - present (dont 2 mois SNEE Janv-Fev 2026)",
    icon: Car,
    images: [
      {
        src: "/projets/autosoft/images/dashboard.png",
        alt: "Dashboard principal AutoSoft",
        caption:
          "KPIs temps reel : eleves actifs, chiffre d'affaires, examens, leçons",
      },
      {
        src: "/projets/autosoft/images/eleves.png",
        alt: "Gestion des eleves",
        caption:
          "Liste filtree des eleves : nom, age, email, telephone, categorie permis",
      },
      {
        src: "/projets/autosoft/images/planning.png",
        alt: "Planning des leçons",
        caption:
          "Vue semaine multi-moniteurs avec creneaux colores et filtres par moniteur",
      },
      {
        src: "/projets/autosoft/images/mobile.png",
        alt: "Application mobile moniteur",
        caption:
          "App mobile : planning en cours, progression eleve, evaluation, observation",
      },
    ],
    files: [
      {
        name: "Presentation AutoSoft",
        description:
          "Presentation complete : fonctionnalites, architecture technique, modele economique",
        type: "pdf",
        url: "/projets/autosoft/files/Autosoft.pdf",
      },
      {
        name: "Strategie d'adoption",
        description:
          "Plan de deploiement, acquisition clients et strategie de croissance",
        type: "pdf",
        url: "/projets/autosoft/files/STRATEGIE_ADOPTION_AUTOSOFT.pdf",
      },
    ],
  },
  {
    slug: "android-studio",
    title: "Application Android GSB",
    tagline: "Gestion RDV visiteurs medicaux, Java + SQLite",
    description:
      "Application mobile Android developpee en Java pour les visiteurs medicaux du laboratoire Galaxy Swiss Bourdin (GSB). Elle permet de gerer les professionnels de sante, planifier des rendez-vous et consulter le planning journalier. Base SQLite embarquee, architecture MVC et tests JUnit 4.",
    context:
      "Le laboratoire Galaxy Swiss Bourdin, issu de la fusion entre Galaxy et Swiss Bourdin, souhaitait moderniser les outils de ses visiteurs medicaux. Apres la gestion du parc informatique (projet C# GSB), le laboratoire s'est concentre sur l'activite terrain. Objectif : une app mobile autonome, sans serveur, pour organiser efficacement les tournees.",
    objectives: [
      "Gerer le fichier des professionnels de sante (pharmaciens, generalistes, dentistes)",
      "Planifier et enregistrer des rendez-vous via un calendrier natif Android",
      "Consulter le planning journalier avec jointure SQL",
      "Rechercher des professionnels par ville ou code postal",
      "Garantir la fiabilite du code via des tests instrumentes JUnit 4",
      "Documenter l'ensemble du code via Javadoc",
    ],
    features: [
      "4 ecrans : Professionnel, Prise de RDV, Planning, Recherche medecins",
      "Base de donnees SQLite embarquee via SQLiteOpenHelper, sans serveur",
      "Couche DAO dediee : DataConnect.java centralise toutes les requetes SQL",
      "Navigation commune entre tous les ecrans (barre de 4 boutons)",
      "Recherche de medecins filtree par ville et/ou code postal",
      "Tests instrumentes JUnit 4 : contexte, insertion medecin, insertion RDV",
      "Architecture MVC : separation IHM (XML + Activities) et acces donnees (DAO)",
      "Documentation Javadoc complete sur classes et methodes cles",
      "Tutoriel de deploiement APK inclus",
    ],
    techs: [
      "Android Studio",
      "Java",
      "SQLite",
      "JUnit 4",
      "Javadoc",
      "XML",
      "Gradle",
    ],
    competences: [2, 3, 4, 5],
    status: "termine",
    periode: "2024 - 2025",
    client: "GSB (projet BTS SIO)",
    icon: Smartphone,
    images: Array.from({ length: 13 }, (_, i) => ({
      src: `/projets/android-studio/images/${i + 1}.png`,
      alt: `Application Android GSB - capture ${i + 1}`,
    })),
    files: [
      {
        name: "Rapport de projet GSB Android",
        description:
          "Contexte GSB, MCD/MLD, architecture MVC, tests JUnit 4, Javadoc et tutoriel APK",
        type: "pdf",
        url: "/projets/android-studio/files/rapport-android.pdf",
      },
    ],
  },
  {
    slug: "c-sharp",
    title: "Projet C# GSB",
    tagline: "Gestion parc informatique, .NET + SQL Server",
    description:
      "Application de gestion du parc informatique et des incidents developpee en C# pour le laboratoire fictif Galaxy Swiss Bourdin (GSB). Le systeme permet de gerer l'inventaire du materiel, de centraliser les incidents (tickets) et de fournir des statistiques aux responsables.",
    context:
      "Le laboratoire Galaxy Swiss Bourdin, ne de la fusion entre Galaxy et Swiss Bourdin, possede plus de 350 equipements terminaux et un nombre croissant de serveurs. Pour assurer une gestion efficace de ce parc, le laboratoire a souhaite une application permettant de gerer le materiel et d'assurer l'assistance en cas de panne.",
    objectives: [
      "Gerer l'inventaire du materiel (achat, location, garantie)",
      "Centraliser la gestion des incidents sous forme de tickets",
      "Optimiser le suivi des interventions par les techniciens",
      "Fournir des statistiques et tableaux de bord aux responsables",
    ],
    features: [
      "Gestion du materiel : processeur, memoire, donnees contractuelles",
      "Systeme de tickets d'incidents (objet, urgence, etat)",
      "Suivi des interventions techniciens (heures, travail realise)",
      "Gestion des profils : Techniciens, Visiteurs, Responsables",
      "Modele Conceptuel de Donnees (MCD) complet",
      "Base de donnees relationnelle avec entites liees",
    ],
    techs: ["C#", ".NET", "SQL Server", "WinForms", "MCD/MLD"],
    competences: [0, 1, 3, 4],
    status: "termine",
    periode: "2024 - 2025",
    client: "GSB (projet BTS SIO)",
    icon: Terminal,
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/projets/c-sharp/images/${i + 1}.png`,
      alt: `Projet C# GSB - capture ${i + 1}`,
    })),
    files: [
      {
        name: "Rapport de projet GSB",
        description:
          "Rapport complet : presentation GSB, MCD, conception et realisation de l'application C#",
        type: "pdf",
        url: "/projets/c-sharp/files/rapport-de-projet.pdf",
      },
    ],
  },
  {
    slug: "glpi-customized",
    title: "GLPI Customized",
    tagline: "Gestion de parc sur mesure, PHP + REST API",
    description:
      "Personnalisation complete de GLPI pour une grande entreprise : interface adaptee, modules metier specifiques, API REST pour integration avec les outils existants.",
    context:
      "Une entreprise avait besoin d'un systeme de gestion de parc informatique et de tickets adapte a ses processus internes. La solution GLPI open-source a ete choisie comme base, puis entierement personnalisee pour repondre aux besoins specifiques.",
    objectives: [
      "Adapter GLPI aux processus metier de l'entreprise",
      "Developper des modules sur mesure (suivi, reporting)",
      "Integrer une API REST pour la communication avec d'autres outils",
      "Former les utilisateurs a la nouvelle interface",
    ],
    features: [
      "Interface personnalisee selon la charte graphique",
      "Modules de gestion d'inventaire sur mesure",
      "Systeme de tickets avec workflows personnalises",
      "API REST pour integrations tierces",
      "Tableaux de bord et rapports automatises",
      "Import/export de donnees",
    ],
    techs: ["PHP", "MySQL", "JavaScript", "REST API", "GLPI"],
    competences: [0, 1, 3, 4],
    status: "termine",
    periode: "2024",
    icon: Monitor,
    images: [],
    files: [
      {
        name: "Rapport de projet (1)",
        description: "Documentation technique partie 1",
        type: "pdf",
        url: "/projets/glpi-customized/files/Compte_rendu1.pdf",
      },
      {
        name: "Rapport de projet (2)",
        description: "Documentation technique partie 2",
        type: "pdf",
        url: "/projets/glpi-customized/files/Compte_Rendu2.pdf",
      },
      {
        name: "Rapport de projet (3)",
        description: "Documentation technique partie 3",
        type: "pdf",
        url: "/projets/glpi-customized/files/Compte_Rendu3.pdf",
      },
    ],
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

export const COMPETENCES_BTS = [
  "Gerer le patrimoine informatique",
  "Repondre aux incidents et demandes d'assistance et d'evolution",
  "Developper la presence en ligne de l'organisation",
  "Travailler en mode projet",
  "Mettre a disposition des utilisateurs un service informatique",
  "Organiser son developpement professionnel",
];

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}
