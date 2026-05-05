# Design System

## Palette

3 couleurs primaires, plus 3 nuances structurelles.

### Primaires

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0A0A0B` | Fond principal, dominant >70% de l'écran |
| `--fg` | `#F4F4F5` | Texte principal, titres, contenus lisibles |
| `--accent` | `#FF4D2E` | Accent narratif unique : transitions, hover, soulignements clés, badges importants |

### Structures

| Token | Hex | Usage |
|---|---|---|
| `--surface` | `#18181B` | Cards, sections en relief, modals |
| `--border` | `#27272A` | Séparateurs, contours fins |
| `--muted` | `#71717A` | Texte secondaire, légendes, métadonnées |

**Règle d'usage de l'accent** : le vermillon `#FF4D2E` est un signal narratif rare. Pas de boutons accent partout. Réservé à : titres-clés (mot mis en évidence), hover état actif, soulignements section, transition shader R3F. Maximum 2 occurrences accent visibles à la fois sur une scène.

**Justification du choix vermillon** : 
- Il ne ressemble à aucun portfolio dev BTS classique (qui sont 90% bleu/violet/vert).
- Il porte une chaleur narrative (cinéma sombre, palette tarantino-esque) cohérente avec "narratif sombre précis".
- Il est suffisamment saturé pour fonctionner sur fond charbon sans devenir flashy si bien dosé.

## Typographies

2 familles Google Fonts + 1 mono.

| Rôle | Famille | Justification |
|---|---|---|
| Display (titres h1, h2) | **Fraunces** (variable, optical size axis) | Serif moderne avec axe optical size variable. Elle peut passer d'humaniste à brutaliste selon les paramètres. Cohérente avec le ton éditorial narratif. |
| Body (paragraphes, UI) | **Inter** | Sans-serif technique, neutre, parfaitement lisible. Standard du dev moderne, n'attire pas l'attention indûment. |
| Mono (code, tags techniques C1-C6) | **JetBrains Mono** | Précision technique. Renforce la lecture des tags compétences et des stack technologiques. |

Chargement via `next/font/google` avec `display: 'swap'`. Une seule weight par fonte si possible (Fraunces 600 + 400 italic, Inter 400 + 500, JetBrains Mono 400). Subset `latin` uniquement.

## Grille

- Container max-width : `1280px`
- Colonnes : 12 sur desktop, 4 sur mobile
- Gutter : `24px` desktop, `16px` mobile
- Outer padding : `32px` desktop, `24px` mobile
- Hauteur de section min : `100vh` pour scènes cinématiques, `auto` (avec min-height) sinon

## Espacements

Système base 8pt strict. Tokens disponibles uniquement :

```
0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256
```

Mapping Tailwind 4 (déjà conforme) : `0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64`.

## Motion tokens

### Durations

| Token | Valeur | Usage |
|---|---|---|
| `--motion-fast` | `200ms` | Hover boutons, micro-interactions |
| `--motion-base` | `600ms` | Reveals au scroll, transitions état |
| `--motion-scene` | `1200ms` | Entrées de scène, split-text orchestrés |
| `--motion-cinematic` | `2400ms` | Hero opening, transition shader option B |

### Easings GSAP

| Token | Valeur GSAP | Usage |
|---|---|---|
| Standard | `power3.out` | 90% des animations |
| Entrée douce | `power2.out` | Reveals texte |
| Sortie | `power3.in` | Disparitions, exits |
| Cinématique | `expo.out` (`cubic-bezier(0.16, 1, 0.3, 1)`) | Hero, transitions clés |
| Scrub scroll | `none` (linear) | ScrollTrigger.scrub uniquement |

**Règle** : ne pas mélanger plus de 2 easings différents dans une même scène. Cohérence > virtuosité.

### Lenis

```ts
{ lerp: 0.08, duration: 1.2, smoothWheel: true, syncTouch: false }
```

`syncTouch: false` car sur mobile, le scroll natif est meilleur que Lenis touch (Lenis recommend lui-même `false` sur mobile).

## Accessibilité

- **prefers-reduced-motion** : toutes les animations passent en `opacity` simple sur 200ms. Pas de transform, pas de R3F, pas de scroll-pin.
- Contraste minimum WCAG AA : `#F4F4F5` sur `#0A0A0B` = 19.4:1, OK. `#FF4D2E` sur `#0A0A0B` = 5.8:1, OK pour texte de taille >= 18px ou bold.
- Focus visible : outline `2px solid var(--accent)` avec `outline-offset: 4px`.
- Interactivité au clavier : aucun effet hover-only critique, tout doit être accessible au focus.

## Breakpoints

| Nom | Min-width | Comportement |
|---|---|---|
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablette. **Au-dessous : pas de R3F, pas de pin, animations simplifiées** |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop large |

## Iconographie

Conserver `lucide-react` (déjà installé). Stroke width par défaut `1.5`. Taille par défaut `16` ou `20`.

## Imagerie

- Format : AVIF en priorité, WebP fallback, via `next/image`.
- Captures projets AutoSoft : recadrage propre 16:10 ou 16:9, fond charbon ajouté en CSS si transparence manque.
- Photo Mattias : un seul élément hero, traitement noir et blanc ou très désaturé pour rester dans la palette sombre. Pas de portrait coloré pétant.
