# Comment ajouter des images et fichiers à un projet

## Structure des dossiers

```
public/projets/
├── autosoft/
│   ├── images/   ← tes screenshots, maquettes, photos
│   └── files/    ← tes PDF, rapports, docs
├── tolarys/
│   ├── images/
│   └── files/
├── glpi-customized/
│   ├── images/
│   └── files/
└── smiletex/
    ├── images/
    └── files/
```

## Etape 1 — Déposer le fichier

Glisse ton fichier dans le bon dossier.
Exemple : `public/projets/autosoft/images/dashboard.png`

## Etape 2 — L'ajouter dans lib/projects.ts

Ouvre `lib/projects.ts` et trouve ton projet.

### Pour une image :
```ts
images: [
  { src: "/projets/autosoft/images/dashboard.png", alt: "Dashboard", caption: "Vue principale" },
  { src: "/projets/autosoft/images/planning.png",   alt: "Planning" },
],
```

### Pour un fichier :
```ts
files: [
  {
    name: "Business Plan",
    description: "Étude de marché et projections financières",
    type: "pdf",                                           // pdf | doc | image | link | zip
    url: "/projets/autosoft/files/business-plan.pdf",
    size: "2.4 MB",                                        // optionnel
  },
],
```

C'est tout !
