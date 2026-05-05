import type { ComponentType, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";
import { Globe, Newspaper } from "lucide-react";
import { GitHubIcon, XIcon } from "@/components/ui/BrandIcons";

type IconComponent =
  | LucideIcon
  | ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export type VeilleSource = {
  name: string;
  type: string;
  url: string;
  icon: IconComponent;
};

export const veille = {
  topic: "Claude Code dans mon workflow de developpeur",
  updatedAt: "Mai 2026",
  method: [
    "Suivi quotidien des releases Anthropic et des analyses de la communaute developpeur.",
    "Chaque nouvelle feature majeure de Claude est testee en conditions reelles sur AutoSoft ou un projet Tolarys avant d'etre integree au workflow.",
  ],
  sources: [
    {
      name: "Anthropic News",
      type: "Blog officiel",
      url: "https://www.anthropic.com/news",
      icon: Globe,
    },
    {
      name: "Claude Code releases",
      type: "GitHub changelog",
      url: "https://github.com/anthropics/claude-code/releases",
      icon: GitHubIcon,
    },
    {
      name: "Simon Willison's Weblog",
      type: "Blog technique",
      url: "https://simonwillison.net",
      icon: Newspaper,
    },
    {
      name: "@AnthropicAI",
      type: "Annonces produit",
      url: "https://x.com/AnthropicAI",
      icon: XIcon,
    },
  ] as VeilleSource[],
};
