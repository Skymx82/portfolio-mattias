# CLAUDE.md - Portfolio v2 Mattias Mathevon

> Document opérationnel pour toute session Claude Code travaillant sur ce repo.
> **À lire intégralement avant tout edit de code.**

@AGENTS.md

---

## Contexte projet (rappel rapide)

- **Cible primaire** : passage oral E6 BTS SIO fin mai 2026 (~26 mai 2026), jury mixte profs + pros invités.
- **Awwwards Honorable Mention** : objectif **post-E6** uniquement, pas pendant. Ne pas sacrifier la lisibilité jury à la cinématique.
- **Scope animation** : moyen sur l'ensemble, **cinématique uniquement sur 2 scènes** (Hero + ouverture AutoSoft).
- **Documents stratégiques** : tout le concept, design system, storyboard et références sont dans [`docs/`](docs/). Les ouvrir si doute, ne pas réinventer.

---

## Conventions du projet

### Structure des dossiers

```
portfolio-v2/
├── app/                       Next.js App Router routes
│   ├── (home)/                groupe pour la home, si besoin
│   ├── projets/[slug]/        route dynamique projets
│   ├── cv/                    page CV imprimable
│   ├── mentions-legales/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── scenes/                composants de scènes principales (Hero, AutoSoft, etc.)
│   ├── ui/                    primitives réutilisables (boutons, badges)
│   ├── shaders/               GLSL fragment + vertex shaders
│   └── layout/                Navigation, Footer
├── lib/                       données + utilitaires (projects.ts, motion.ts)
├── public/                    assets statiques (projets/, photo, fonts si self-hosted)
├── docs/                      documents stratégiques (concept, design system, storyboard, references)
└── CLAUDE.md
```

### Naming

- Fichiers composants React : **PascalCase** (`HeroScene.tsx`, `MagneticButton.tsx`).
- Fichiers utilitaires : **kebab-case** (`use-lenis.ts`, `motion-tokens.ts`).
- Variables CSS : **kebab-case** avec préfixe sémantique (`--motion-fast`, `--bg`).
- Hooks : préfixe `use` obligatoire (`useScrollProgress`).
- Types TS exportés : **PascalCase** (`type ProjectImage`, `type MotionTokens`).
- Slugs URL : **kebab-case** stricte (`/projets/auto-soft`, jamais `/projets/AutoSoft`).

### Commits

Format **Conventional Commits** strict, atomique, en français :

```
type(scope): description courte

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

Types autorisés : `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `perf`, `test`.

Scope recommandé pour ce projet : `scene`, `ui`, `shader`, `data`, `layout`, `config`.

Exemples :
- `feat(scene): hero shader R3F avec distortion scrollée`
- `feat(scene): autosoft pin GSAP avec cascade captures`
- `fix(ui): magnetic button decroche sur mobile`
- `chore: add cinematic stack` (commit phase 3)

**Un commit = un changement logique**. Pas de "wip", pas de "various improvements".

### TypeScript

- `strict: true` activé. Ne pas désactiver, même temporairement.
- Pas de `any` : utiliser `unknown` puis narrow.
- Pas de `as` casting sauvage : préférer type guards.
- Tous les composants exportés doivent avoir leur type props explicite.

---

## Libs autorisées (versions exactes installées)

### Production

| Lib | Version | Usage |
|---|---|---|
| `next` | `16.2.4` | Framework, App Router, Server Components |
| `react` | `19.2.4` | UI |
| `react-dom` | `19.2.4` | UI |
| `gsap` | `^3.15.0` | **Toutes** les animations scroll, timelines, tweens. Inclut ScrollTrigger via `gsap/ScrollTrigger`. |
| `lenis` | `^1.3.23` | Scroll smoothing global. Lerp 0.08, duration 1.2. |
| `three` | `^0.184.0` | Renderer WebGL bas niveau (utilisé via R3F) |
| `@react-three/fiber` | `^9.6.1` | React renderer pour Three.js, compatible React 19 |
| `@react-three/drei` | `^10.7.7` | Helpers R3F (Canvas wrappers, postprocessing, shaders helpers) |

### Développement

| Lib | Version | Usage |
|---|---|---|
| `tailwindcss` | `^4` | Utility-first CSS |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin Tailwind 4 |
| `eslint` | `^9` | Linter |
| `eslint-config-next` | `16.2.4` | Règles ESLint Next.js |
| `typescript` | `^5` | Type system |
| `@types/three` | `^0.184.0` | Types Three.js |

### Ajouts permis sans validation

- `lucide-react` (icônes) : à installer si besoin en phase 4.
- `clsx` ou `tailwind-merge` (gestion classes conditionnelles) : OK si argumenté.

### Ajouts interdits sauf validation explicite Mattias

- Toute lib qui dupliquerait une fonctionnalité GSAP/Lenis/R3F existante.
- Toute lib non maintenue (last commit > 12 mois).
- Toute lib > 50kb gzipped si une alternative légère existe.

---

## Libs INTERDITES (non négociable)

| Lib | Raison |
|---|---|
| `framer-motion` | Décision phase 1. **GSAP only sur scroll**. Aucune exception, même pour reveals simples. |
| `motion` | Même raison (rebrand framer-motion). |
| `react-spring` | Redondant avec GSAP. |
| `@studio-freight/lenis` | **Ancien nom**. Le bon paquet est `lenis` (sans scope). Ne jamais l'installer. |
| `locomotive-scroll` | Lenis suffit, plus performant. |
| `material-ui`, `@mui/*` | Trop opinioned, look incompatible avec le DA. |
| `chakra-ui` | Idem. |
| `styled-components`, `emotion` | Tailwind 4 + CSS variables suffisent. |
| `bootstrap` | Hors-sujet. |
| `jquery` | Hors-sujet. |

Si tu hésites à installer quelque chose qui n'est ni listé autorisé ni interdit : **demande à Mattias avant `npm install`**.

---

## Design tokens (extrait de docs/design-system.md)

À déclarer dans `app/globals.css` au démarrage. **Source de vérité** : `docs/design-system.md`. Toute modification de palette ou typo doit d'abord passer par le doc.

### Palette

```css
:root {
  --bg: #0A0A0B;
  --fg: #F4F4F5;
  --accent: #FF4D2E;
  --surface: #18181B;
  --border: #27272A;
  --muted: #71717A;
}
```

### Motion

```css
:root {
  --motion-fast: 200ms;
  --motion-base: 600ms;
  --motion-scene: 1200ms;
  --motion-cinematic: 2400ms;
}
```

### Easings GSAP (à exposer dans `lib/motion.ts`)

```ts
export const easings = {
  standard: "power3.out",
  enter: "power2.out",
  exit: "power3.in",
  cinematic: "expo.out",
  scrub: "none",
} as const;
```

### Lenis config

```ts
{ lerp: 0.08, duration: 1.2, smoothWheel: true, syncTouch: false }
```

---

## Règle d'or anti-hallucination

**Tu n'inventes aucune API GSAP, Lenis, R3F, drei ou Next 16.**

- En cas de doute sur une signature : ouvre la doc dans `node_modules/<lib>/dist/docs/` ou la doc officielle web (URL connue : `gsap.com/docs/v3/`, `lenis.darkroom.engineering/`, `r3f.docs.pmnd.rs/`).
- Si la doc dit autre chose que ce que tu pensais : la doc gagne.
- Si une fonctionnalité demandée par le storyboard n'est pas spécifiée précisément (ex : "transition shader RGB shift" : avec quelle intensité ? quels canaux ?), **demande à Mattias avant de coder**.

### Pièges GSAP courants à NE PAS faire

```ts
// ❌ FAUX : gsap.scrollTrigger n'existe pas
gsap.scrollTrigger({ ... });

// ✅ CORRECT : ScrollTrigger.create() ou option scrollTrigger sur tween
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero", {
  y: -100,
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
});
```

### Pièges SSR Next 16

- **GSAP, Lenis, Three.js, R3F sont client-only**. Toujours :
  - Soit composant `'use client'` au top du fichier.
  - Soit `dynamic(() => import('./XScene'), { ssr: false })`.
- Tout accès à `window`, `document`, `navigator` doit être dans `useEffect` ou dans un composant client.
- **Note Next 16** : si navigation client lente, `Suspense` ne suffit pas, il faut exporter `unstable_instant` de la route (cf. `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx`).

### Garde-fous accessibilité (obligatoires sur chaque scène)

```ts
const prefersReducedMotion = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  // Fallback fade simple, pas de transform, pas de R3F
  return;
}
```

```ts
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
if (isMobile) {
  // Pas de pin, pas de R3F, animations courtes
}
```

---

## Pattern de travail "scène par scène"

**Règle de méthode** : on ne code jamais plusieurs scènes en parallèle. Pour chaque scène listée dans [`docs/storyboard.md`](docs/storyboard.md) :

1. Annoncer la scène à Mattias + plan en 5 lignes max.
2. Attendre "go" explicite.
3. Coder le composant dans `components/scenes/[Name].tsx`.
4. Vérifier que `npm run build` compile sans erreur.
5. Présenter le diff à Mattias.
6. Attendre "validé" / "ajuste X" / "rollback".
7. Si ajustement : maximum 2 itérations sans revalidation (anti-spirale).
8. Une fois validée, commit `feat(scene): [name]` avant de passer à la suivante.

**Aucune scène ne reste à moitié faite**. Si une scène n'aboutit pas dans les 2 itérations, on la simplifie ou on la rollback. Pas de TODO posés dans le code.

---

## Tests et qualité

- `npm run build` doit compiler sans erreur ni warning critique avant chaque commit.
- `npm run lint` doit passer.
- Pas de `console.log` en production.
- Aucun fichier `.tsx` au-delà de 250 lignes : si ça déborde, factoriser en sous-composants.

---

## Performance (cibles Lighthouse phase 5)

- LCP < 2.5s
- CLS < 0.1
- TBT < 200ms
- Performance score >= 85 (mobile et desktop)

Mesures :
- `next/image` partout, jamais `<img>` direct.
- `priority` uniquement sur l'image LCP (probablement la première capture AutoSoft).
- Lazy-load des scènes hors viewport via `dynamic({ ssr: false, loading: () => <SceneFallback /> })`.
- R3F : `frameloop="demand"` quand scène statique, `dpr={[1, 2]}` pour cap haute densité.

---

## SEO et metadata (phase 5)

- Metadata Next 16 : `export const metadata: Metadata = {...}` dans `app/layout.tsx` et chaque page projet.
- OpenGraph image générée via `app/opengraph-image.tsx` (Edge function).
- `sitemap.ts` et `robots.ts` à la racine de `app/`.
- JSON-LD `Person` dans `app/layout.tsx` pour Mattias.

---

## Drapeaux rouges automatiques

Si tu rencontres un de ces signaux pendant ton travail, **arrête-toi et demande** :

- Une animation qui demande de modifier les tokens motion : non, modifier d'abord `docs/design-system.md`.
- Une scène cinématique non listée dans le storyboard : non, le storyboard est la source.
- Une lib non listée à installer : non, demander avant `npm install`.
- Un changement de palette en production : non, passer par le doc.
- Un commit qui touche plus de 5 fichiers non liés : non, splitter.

---

## Liens utiles

- [docs/concept.md](docs/concept.md) - positionnement, ton
- [docs/design-system.md](docs/design-system.md) - palette, typo, motion tokens
- [docs/storyboard.md](docs/storyboard.md) - sections + comportement scroll
- [docs/references.md](docs/references.md) - sites de référence + ce qu'on extrait
- Doc Next 16 locale : `node_modules/next/dist/docs/`
- GSAP : https://gsap.com/docs/v3/
- Lenis : https://lenis.darkroom.engineering/
- R3F : https://r3f.docs.pmnd.rs/
- Drei : https://drei.docs.pmnd.rs/

---

## Mémoire long terme

Les memories Claude Code pour ce projet sont dans :
`/Users/mattiasmathevon/.claude/projects/-Users-mattiasmathevon-Desktop-Portfolio/memory/`

Lire `MEMORY.md` (index) en début de session.
