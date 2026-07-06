# Jose's cuisine — PWA

PWA mobile-first pour **Jose's cuisine** (cuisine camerounaise & africaine, faite maison,
livrée dans les Yvelines). React + Vite + TypeScript, sans backend ni base de données :
tout le contenu vit dans les fichiers JSON de `src/data/`.

Slogan : « food is bae* »

## Démarrer

```bash
npm install       # une seule fois
npm run dev       # serveur de développement → http://localhost:5173
npm run build     # build de production dans dist/
npm run preview   # sert le build de production → http://localhost:4173
```

> Le service worker (mode hors-ligne + installation) n'est actif que sur le **build de
> production** (`npm run build` puis `npm run preview`, ou le site déployé).

## Modifier le contenu (menus, recettes, avis…)

Tout le contenu est dans `src/data/*.json` — voir **`README-data.md`** (guide non
technique) pour modifier chaque fichier sans risque. Après modification, relancer
`npm run build` (ou laisser le dev-server recharger tout seul).

| Fichier | Contenu |
| --- | --- |
| `infos-generales.json` | Nom, slogan, n° WhatsApp, page Messenger, communes, horaires, piliers |
| `recettes.json` | La carte (recettes par catégorie, tags, ingrédients, étapes, astuce) |
| `menu-semaine.json` | Menu du lundi au dimanche |
| `compose-repas.json` | Options de « Compose ton repas » |
| `evenements.json` | Types d'événements + tarifs indicatifs |
| `avis.json` | Témoignages clients |
| `galerie.json` | Photos + légendes |
| `faq.json` | Questions / réponses |
| `blog.json` | Articles de conseils |
| `equipe.json` | Page « Qui sommes-nous » |
| `epicerie.json` | Produits d'épicerie maison |
| `ateliers.json` | Ateliers cuisine |

## Architecture

```
src/
├── data/            ← les 12 JSON de contenu (la seule chose à éditer au quotidien)
├── lib/
│   ├── data.ts      ← import statique des JSON + tri par date FR
│   ├── order.ts     ← génération centralisée des messages WhatsApp/Messenger
│   ├── toast.tsx    ← toasts (validation, « récapitulatif copié »)
│   └── usePageMeta.ts ← SEO (titre + meta description par page)
├── components/      ← Header, BottomNav, sheet « Plus », PaginatedList, placeholders…
├── pages/           ← une page par route (17 écrans)
├── App.tsx          ← routing + layout
└── index.css        ← design tokens (couleurs, typo) + styles partagés
```

### Routes

`/` accueil · `/recettes` (+ `/recettes/:id`) · `/menu` · `/composer` · `/evenements` ·
`/contact` · `/a-propos` · `/galerie` · `/avis` · `/zone` · `/epicerie` · `/ateliers` ·
`/blog` (+ `/blog/:id`, pagination partageable `?page=n`) · `/faq` · `/mentions`

### Commande WhatsApp / Messenger

- **WhatsApp** : chaque bouton construit un message pré-rempli et ouvre
  `https://wa.me/<numéro>?text=…` (fonction unique dans `src/lib/order.ts`).
- **Messenger** : `m.me` ne permet pas de pré-remplir → le clic copie le récapitulatif
  dans le presse-papiers, affiche un toast, puis ouvre Messenger.

### Pagination

Composant générique `<PaginatedList>` (`src/components/PaginatedList.tsx`) :
recettes par 8, avis par 6, galerie par 8 (« Charger plus »), blog par 6
(pages précédent/suivant + route `?page=n`). Épicerie et ateliers utilisent le même
composant — la pagination s'activera d'elle-même si le catalogue dépasse la taille de page.

### PWA

- `vite-plugin-pwa` (Workbox) : précache de tout le build (JS, CSS, polices, icônes),
  contenu JSON embarqué dans le bundle → **toutes les pages fonctionnent hors-ligne**.
- Manifest + icônes JC (192/512 + maskable) dans `public/icons/` → app installable.
- Polices auto-hébergées (Fontsource) : Bricolage Grotesque + Instrument Sans.

## Photos

Aucune photo réelle n'est encore fournie : l'app affiche des emplacements rayés
clairement identifiés (`src/components/PhotoPlaceholder.tsx`). Quand la cliente fournit
les photos : les déposer dans `public/photos/` et remplacer les `<PhotoPlaceholder …/>`
par de vraies `<img src alt>` (héro accueil, portrait, galerie, vignettes recettes/épicerie).

## Déploiement — GitHub Pages

L'app est déployée automatiquement sur **https://aziguy.github.io/pwa-joses-cuisine/**
à chaque push sur `main` (workflow `.github/workflows/deploy.yml` : build dans `app/`,
copie `404.html` pour le fallback SPA, publication via GitHub Actions → Pages).

Le base path `/pwa-joses-cuisine/` est défini dans `vite.config.ts` (constante `BASE`,
reprise par le manifest PWA et le routeur via `import.meta.env.BASE_URL`). Si le dépôt
est renommé ou déployé ailleurs, c'est le seul endroit à changer (+ les balises
`og:image`/`og:url` de `index.html`).

Pour un autre hébergeur statique (Netlify, Vercel…) : remettre `BASE = '/'` et
configurer la redirection de toutes les URL vers `index.html` (SPA fallback).
