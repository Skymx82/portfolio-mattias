# Storyboard

Sections du site dans l'ordre, comportement scroll de chacune en prose.

## Architecture globale

- Scroll géré par **Lenis** en lerp 0.08, duration 1.2.
- **GSAP ScrollTrigger** pin uniquement sur 2 scènes : Hero et ouverture AutoSoft.
- Reveals légers (`y: 24, opacity: 0` => `y: 0, opacity: 1`, ease `power3.out`, duration 600ms) sur tous les éléments au viewport ~25%.
- Mobile (<768px) : aucun pin, aucun R3F. Animations remplacées par fades courts.
- prefers-reduced-motion : tout devient un fade `opacity` 200ms.

---

## 1. Hero (scène cinématique 1)

**Comportement** : pin pendant ~120vh de scroll. À l'entrée, R3F mesh shader plein écran en background (distortion subtile, bruit Perlin, ondulations lentes). Texte hero en superposition : nom + accroche en 2 lignes courtes.

**Séquence scroll (sur le pin)** :
- 0-30% : R3F idle, texte fade-in caractère par caractère (split-text).
- 30-70% : R3F intensifie sa distortion à mesure qu'on scrolle (uniform `uIntensity` lié à scroll progress). Texte commence à se retirer en bas.
- 70-100% : transition shader option B s'enclenche (RGB shift + displacement) en préparation de la scène suivante.

**Contenu texte** :
- Ligne 1 : "Mattias Mathevon"
- Ligne 2 : "Dev fullstack 18 ans. Fondateur AutoSoft, cofondateur Tolarys."
- Petite ligne service : "BTS SIO SLAM, candidat E6 mai 2026."
- 3 liens icônes : GitHub, LinkedIn, Mail.

**Garde-fous** : photo Mattias non plus en hero (déplacée en section About). Le hero porte uniquement le shader et le texte. Sur mobile, R3F désactivé, fond `#0A0A0B` plein, texte centré statique.

---

## 2. Transition shader (option B validée phase 1)

**Comportement** : durée scroll ~80vh. Plein écran. Le R3F du Hero morphe en plan plein noir avec ses dernières frames de RGB shift, puis fade-out. Cette transition prépare l'arrivée d'AutoSoft sans casser la continuité.

**Implémentation** : c'est en réalité la deuxième moitié du pin Hero. Pas de composant séparé. Réduit le risque de désynchronisation.

**Mobile** : remplacé par un simple fond noir avec délai 300ms.

---

## 3. AutoSoft (scène cinématique 2)

**Comportement** : pin pendant ~200vh. La carte projet AutoSoft prend tout l'écran, ses captures (dashboard, élèves, planning, mobile) se déploient successivement avec parallax léger.

**Séquence scroll (sur le pin)** :
- 0-20% : titre "AutoSoft" entre en split-text. Tagline "ERP complet pour auto-écoles" suit.
- 20-40% : 3 chiffres clés apparaissent en grande typographie : "4 auto-écoles", "30 utilisateurs actifs", "1 an de dev solo". Pas de "200k LOC" au premier plan (le chiffre reste défendable dans la fiche détail mais n'ouvre pas la scène).
- 40-70% : 4 captures déploient en cascade. La capture mobile finit centrée, plus grosse, comme un device dans la lumière.
- 70-100% : techs (Next.js, Supabase, Stripe, API ANTS), badges compétences C3-C4-C5-C6, bouton "Voir le projet en détail" qui mène à `/projets/autosoft`.

**Garde-fous** : les captures sont préchargées (priority sur la première). Le pin se débraye proprement à la fin du scroll de la scène, pas de saut.

---

## 4. About

**Comportement** : section non pinnée. Reveals classiques au scroll.

**Contenu** :
- Photo Mattias (traitement désaturé) à gauche.
- À droite : présentation 3 paragraphes courts. Parcours BTS, statut SNEE, double activité Tolarys + AutoSoft.
- 3 chiffres en bandeau : âge (18), entreprises (2), clients (5+).

**Animation** : photo arrive avec léger parallax (translateY différentiel de la colonne texte), texte apparaît en split-paragraph.

---

## 5. Projets (autres que AutoSoft)

**Comportement** : grille de cartes 2x2 sur desktop. Hover : la carte se détache (translate -y, ombre accentuée), accent vermillon souligne le titre.

**Contenu** : Android GSB, C# GSB, GLPI Customized. Plus une 4e carte "Voir tous les projets Tolarys" qui ouvre le bandeau.

**Bandeau Tolarys** : marquee horizontal lent (~30s loop), 14 noms, défile dans les deux sens (top droite à gauche, bottom gauche à droite). Cliquable pour ouvrir une modal ou route dédiée si on documente quelques projets.

---

## 6. Stages (3 blocs)

**Comportement** : section non pinnée. Trois sous-sections clairement séparées par titre.

**Bloc 1 - Stages BTS officiels** : timeline horizontale ou cards verticales. Voltier Erasmus / Bourdelle / Odyssée Sucrée.

**Bloc 2 - Projets SNEE** : section dédiée avec badge SNEE en accent. Tolarys + AutoSoft mis en valeur.

**Bloc 3 - Avant le BTS** : timeline compacte, format minimal. 3R + MAF RODA.

Chaque card : entreprise, période, durée, lieu, missions principales (3-4 puces max), lien rapport PDF.

---

## 7. E5 (compétences C1-C6)

**Comportement** : tableau compétences x projets. Au scroll, chaque case se révèle individuellement (stagger).

**Format** : tableau 6 lignes (compétences) x N colonnes (projets). Une case cochée si la compétence est mobilisée. Hover : explication détaillée en tooltip.

**Lien E5** : bouton "Télécharger le dossier E5 complet (PDF)".

---

## 8. Veille technologique

**Comportement** : section non pinnée. Card unique mise en valeur.

**Contenu** : sujet de veille (à confirmer avec Mattias en phase 4), 3-4 sources (URLs, RSS, podcasts), méthode de veille en 2 phrases.

---

## 9. Perspectives

**Comportement** : section sobre, fond uni `--surface`.

**Contenu** : 2 paragraphes. Poursuite d'études (Bachelor / école d'ingé visée), projet pro (continuer AutoSoft + Tolarys, vers indépendance complète après le bac+3).

Pas de blabla "rêves et ambitions". Du factuel, du précis.

---

## 10. Contact / Footer

**Comportement** : pleine largeur, fond `--bg`. Grand titre `Mettons-nous en contact.` (ou variante).

**Contenu** :
- Email cliquable en grand
- Liens GitHub, LinkedIn
- Bouton "Télécharger CV (PDF)"
- Footer minuscule : mentions légales, copyright, lien "Made with Next.js + GSAP".

---

## Pages secondaires

- `/projets/[slug]` : détail projet, conserve la structure de l'ancien `ProjectDetailClient.tsx` (à migrer en phase 4 avec ajustements palette/typo).
- `/cv` : page CV imprimable, conserver le `@media print` existant.
- `/mentions-legales` : page sobre, sans animation.

## Récapitulatif scope animation

| Section | Pin | R3F | Reveal | Mobile équivalent |
|---|---|---|---|---|
| Hero | Oui | Oui | Split-text | Statique + fade |
| Transition shader | (continu) | Oui | - | Délai 300ms |
| AutoSoft | Oui | Non | Cascade | Statique + fade |
| About | Non | Non | Parallax léger | Fade |
| Projets | Non | Non | Hover | Statique |
| Stages | Non | Non | Stagger | Stagger court |
| E5 | Non | Non | Stagger cellules | Statique |
| Veille | Non | Non | Reveal | Fade |
| Perspectives | Non | Non | Reveal | Fade |
| Contact | Non | Non | Reveal | Fade |
