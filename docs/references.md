# References

Trois sites de référence : un en boussole haute non reproductible, deux en modèles d'implémentation accessibles.

---

## 1. Active Theory (boussole esthétique haute)

**URL** : https://activetheory.net/

**Statut** : référence donnée par Mattias en phase 1. Inspiration esthétique, **non reproduite techniquement**.

**Stack probable (basé sur leurs productions connues)**
- Three.js + custom GLSL fragment shaders
- GSAP pour timelines orchestrées
- Vidéos H.265 / AV1 plein écran
- Pages "single canvas" : un seul `WebGLRenderer` pour tout le site
- Transitions inter-pages WebGL (pas de navigation classique)
- Custom font loading + animations split-text au caractère
- Probablement Vue ou framework custom (leur runtime interne, "Hydra" ou variante)

**Constat brutal** : Active Theory est un studio LA + Brooklyn de ~25 personnes, clients Apple, Google, HBO, budget par projet 6 à 7 chiffres. Tenter de reproduire = livraison ratée à coup sûr.

**Ce qu'on extrait pour `portfolio-v2`**
1. Palette dominante sombre + un accent saturé unique.
2. Typographie display lourde, éditoriale, large.
3. Espace négatif et silence entre les scènes.
4. Rythme de scroll lent (Lenis lerp 0.08).
5. Une signature visuelle WebGL unique (notre transition shader option B), pas du WebGL partout.

**Ce qu'on jette explicitement**
- Single canvas WebGL pour tout le site
- Transitions inter-pages WebGL custom
- Vidéos plein écran orchestrées
- Toute la R&D de leur framework interne (8+ ans)

---

## 2. Robin Noguier (référence reproduisible)

**URL** : https://robin-noguier.com

**Pourquoi ce choix** : portfolio dev senior français, narratif, sombre, GSAP + Lenis, scroll cinématique mais maîtrisé, sections sticky bien dosées, typographie éditoriale forte. Cas d'usage le plus proche de ce qu'on vise : un dev solo qui se met en scène sans tomber dans le studio.

**Techniques reproductibles identifiables**
- Lenis pour le scroll smoothing
- GSAP ScrollTrigger.scrub sur certaines scènes clés (image qui se redimensionne au scroll)
- Sticky containers avec contenu animé en superposition
- Transitions de page courtes (overlay noir 400ms)
- Typographie display lourde mêlée à du sans-serif technique
- Cursor custom (à éviter pour nous, ajout de complexité non utile pour le BTS)

**Ce qu'on extrait**
1. Structure de scènes pin/sticky avec timeline GSAP claire.
2. Rythme inter-sections (transitions courtes, espace négatif délibéré).
3. Hiérarchie typographique display vs body.

**Ce qu'on ne reprend pas**
- Cursor custom : coût/bénéfice trop faible pour un BTS.
- Mode case study profond projet par projet : on a déjà nos pages `/projets/[slug]`, format suffisant pour le jury.

---

## 3. Olivier Larose (référence pédagogique)

**URL** : https://www.olivierlarose.com

**Pourquoi ce choix** : Olivier Larose publie ses techniques sur YouTube (chaîne ~150k abonnés). Tutos GSAP + Lenis + Framer Motion accessibles avec code source. C'est notre référence d'**implémentation pratique** quand on doute d'un pattern.

**Techniques reproductibles**
- Page transitions élégantes (overlay slide + reveal de la nouvelle page)
- Magnetic buttons (boutons qui suivent le curseur)
- Split-text animé caractère par caractère
- Parallax simple sur images
- Marquee horizontal lent
- Reveals au scroll avec stagger

**Ce qu'on extrait**
1. Patterns d'implémentation `useGSAP` + `useScroll` propres avec cleanup correct.
2. Magnetic buttons pour les CTAs (mail, télécharger CV) : peu coûteux, très bel effet.
3. Marquee horizontal pour le bandeau Tolarys 14 noms.
4. Pattern de page transition simple à mettre en place avec Next 16.

**Ce qu'on ne reprend pas**
- Framer Motion : interdit sur ce projet (décision phase 1, GSAP only sur scroll). On fera les équivalents en GSAP.

---

## Synthèse boussole

| Source | Ce qu'on prend | Ce qu'on jette |
|---|---|---|
| Active Theory | Esthétique, palette, typographie large, silence | Stack WebGL custom, single canvas |
| Robin Noguier | Structure de scènes, rythme, hiérarchie typo | Cursor custom, case studies profonds |
| Olivier Larose | Patterns d'implémentation, magnetic buttons, marquee | Framer Motion |

## Sites volontairement écartés

- **Locomotive Mtl** (locomotive.ca) : trop tape-à-l'oeil, scroll horizontal, n'aide pas le jury BTS.
- **Bruno Simon** (bruno-simon.com) : voiture 3D ludique, ton trop décalé pour un passage E6.
- **Linear** (linear.app) : trop B2B propre, pas assez narratif.
- **Stripe Press** (press.stripe.com) : trop éditorial-livre, pas assez portfolio.
