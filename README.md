# Handoff: PWA "Jose's cuisine"

> **✅ Implémentation réalisée** : l'application React + Vite + PWA est dans le dossier
> [`app/`](app/) (voir [`app/README.md`](app/README.md)).
> **Démo en ligne : https://aziguy.github.io/pwa-joses-cuisine/** (déployée
> automatiquement par GitHub Actions à chaque push sur `main`).

## Overview
PWA mobile-first pour **Jose's cuisine**, activité de restauration informelle et à domicile (cuisine camerounaise/africaine, Yvelines, France). Les commandes ne se paient pas en ligne : chaque parcours (menu, recette, repas personnalisé, devis événement) se termine par un message **pré-rempli envoyé vers WhatsApp ou Messenger**. Aucune base de données : tout le contenu (recettes, menu, avis, etc.) vit dans des fichiers JSON modifiables à la main.

Slogan : « food is bae* ». Logo : monogramme **JC** dans un cercle bicolore terracotta/ocre (voir `reference-design/`).

## About the Design Files
Les fichiers dans `reference-design/` sont des **références de design** créées en HTML (format "Design Component" propriétaire — un seul fichier `.dc.html` avec template + logique JS, ce n'est **pas** du code de production). Ils montrent l'intention visuelle, la structure de contenu, les micro-interactions et les textes exacts. La tâche est de **recréer ce design dans une vraie application React + Vite + PWA**, avec une architecture de composants propre — ne pas copier/coller le fichier `.dc.html` tel quel.

`image-slot.js` est un composant "starter" (glisser-déposer d'image) propre à l'environnement de design — à remplacer en production par de vraies balises `<img>` pointant vers les photos réelles fournies par la cliente.

## Fidelity
**Haute fidélité (hifi)** : couleurs, typographie, espacements, composants, copy et micro-interactions sont définitifs. Reproduire pixel-perfect les écrans décrits ci-dessous, en utilisant React + les patterns habituels d'une PWA Vite (composants réutilisables, hooks, routing client).

## Contraintes techniques (obligatoires)
- **React** (Vite recommandé), TypeScript ou JS moderne, composants réutilisables.
- **PWA complète** : `manifest.json`, service worker, icônes (utiliser le monogramme JC comme icône d'app), installable, fonctionnement hors-ligne correct pour les pages statiques (recettes, menu, à propos, FAQ, blog).
- **seao complet**
- **Mobile-first strict** : toutes les pages sont pensées d'abord pour smartphone (largeur de référence ~390–430px), boutons ≥ 44px de haut, navigation basse fixe (bottom nav).
- **Pas de backend, pas de base de données** : tout le contenu vient des fichiers JSON du dossier `data/` (fournis dans ce package), importés statiquement dans l'app.
- Accessibilité de base : contrastes suffisants, tailles de police lisibles, `alt` sur toutes les images.
- Performance : compression des images, lazy loading, JSON chargés une fois au démarrage.
- **Pagination obligatoire** partout où une liste peut devenir longue avec le temps (voir section dédiée ci-dessous) — la cliente ajoutera du contenu dans les JSON au fil des mois, l'app doit rester utilisable avec 50+ éléments comme avec 5.
- Routing client (React Router ou équivalent) avec une route par écran, pour permettre le partage de lien direct vers une recette, un article de blog, etc.

## Pagination — sections concernées
La cliente enrichira ces fichiers JSON dans le temps ; prévoir une pagination (ou "charger plus") dès la V1, pas en optionnel :

1. **Blog / Conseils cuisine** (`blog.json`) — cas explicitement demandé : liste triée par date décroissante, **paginer par 6 articles** (bouton "Articles précédents / suivants" ou "Charger plus"). Prévoir aussi une route `?page=n` pour le lien direct.
2. **Recettes** (`recettes.json`) — la carte grossira avec les saisons. Paginer par **8 recettes** après filtrage par catégorie/tag, avec bouton "Voir plus" en bas de liste (pas de rechargement de page).
3. **Avis & témoignages** (`avis.json`) — paginer par **6 avis**, garder les 2 plus récents/mieux notés en avant sur l'accueil (logique déjà présente dans le prototype).
4. **Galerie** (`galerie.json`) — grille paginée par **8 photos** (2 colonnes mobile), "Charger plus" en bas.
5. **Épicerie** et **Ateliers** : listes courtes par nature (catalogue limité) — pagination non nécessaire pour la V1, mais garder le même pattern de composant "liste paginable" pour pouvoir l'activer facilement si le catalogue grossit.

Recommandation d'implémentation : un seul composant générique `<PaginatedList items pageSize renderItem />` réutilisé sur ces 4 écrans, pour que la logique de pagination soit écrite une seule fois.

## Écrans / Vues

### 1. Accueil (`/`)
- **But** : convertir immédiatement — pousser vers le menu ou WhatsApp dès le premier écran.
- **Layout** : header sticky (logo JC + nom + slogan + bouton "Commander") → héro plein cadre (photo plat signature 16:9 arrondie 18px, titre H1, sous-texte, 2 boutons pleine largeur empilés) → bandeau zone de livraison (fond vert émeraude `#1C6B52`) → grille 2 colonnes des 7 "piliers" de service → carrousel horizontal de 3–4 recettes phares (cartes 200px) → 2 avis clients extraits → bloc CTA événements (fond marron foncé `#2B1B12`, motif pointillé ocre) → footer.
- **Composants** : boutons pleine largeur `border-radius:14px`, cartes recette avec image + nom + temps + prix, bandeau zone avec lien "voir les communes".
- **Copy exact** : titre H1 "La cuisine camerounaise, faite maison, livrée chez vous.", boutons "Voir le menu de la semaine" / "Commander sur WhatsApp".

### 2. Recettes — liste (`/recettes`)
- Filtres par catégorie (chips horizontaux scrollables : Tous, Entrées, Plats, Desserts, Boissons, Sauces & Marinades, Gâteaux) + filtres secondaires par tag (Bio, Petit budget, Végétarien, Épicé — chips en bordure pointillée).
- Liste de cartes : photo 88×88 + nom + prix + catégorie/temps/difficulté + description tronquée (2 lignes, `line-clamp`) + 2 boutons ("Voir la recette" / "Commander").
- **Pagination par 8** après filtrage (voir section Pagination).
- État vide : "Aucune recette ne correspond à ces filtres."

### 3. Recette — détail (`/recettes/:id`)
- Photo pleine largeur 200px, titre, badges (temps, difficulté, prix), description, liste d'ingrédients à puces, étapes numérotées (cercles verts numérotés), encart "Astuce de la chef" (fond jaune pâle `#FDF3DE`), 2 boutons de commande (WhatsApp vert / Messenger bleu).

### 4. Menu de la semaine (`/menu`)
- Chips des 7 jours (lundi→dimanche), le jour courant sélectionné par défaut.
- Carte du jour : header sombre avec nom du jour + total, liste des plats (type/nom/prix + bouton "Commander" individuel), 2 boutons pour commander le menu complet du jour.
- Message WhatsApp généré : nom du plat/jour, quantité, prix, champs libres nom/adresse.

### 5. Compose ton repas (`/composer`)
- 4 catégories à choix unique (entrée, plat, dessert, boisson) + 1 catégorie à choix multiples (extras/sauces), rendues en cartes avec radio/checkbox custom.
- Champ "Précisions" (textarea) pour allergies/piment/sans porc.
- Récapitulatif sticky en bas (fond `#2B1B12`) : lignes sélectionnées + total, 2 boutons d'envoi.
- Règle : bouton d'envoi bloqué (toast d'erreur) si rien n'est sélectionné.

### 6. Événements & Traiteur (`/evenements`)
- Liste des types d'événements avec tarif indicatif.
- Formulaire de devis : type d'événement (select), date, nombre d'invités, budget indicatif, message libre → 2 boutons d'envoi (WhatsApp/Messenger) qui formatent tous les champs dans un message unique.

### 7. Contact (`/contact`)
- 3 boutons directs (WhatsApp / Messenger / Appel téléphonique `tel:`).
- Formulaire simple (nom, téléphone, message) → envoi WhatsApp.
- Encart zone/horaires en bas.

### 8. Qui sommes-nous (`/a-propos`)
- Portrait rond 150×150, prénom + titre, 2–3 paragraphes d'histoire, encart "philosophie" (fond jaune pâle), lien vers la galerie.

### 9. Galerie (`/galerie`)
- Grille 2 colonnes de photos + légende. **Pagination par 8** (charger plus).

### 10. Avis & témoignages (`/avis`)
- Note moyenne calculée automatiquement en en-tête. Liste de cartes (étoiles, commentaire, nom, date). **Pagination par 6**. Bouton "Laisser un avis sur WhatsApp" en bas.

### 11. Zone de livraison & infos pratiques (`/zone`)
- Liste de chips des communes livrées + liste clé/valeur (horaires, délai, frais, minimum, paiement).

### 12. Épicerie (`/epicerie`, optionnelle — activée)
- Liste de produits (marinades, sauces, épices en pot) avec photo, format, description, prix, bouton commander.

### 13. Ateliers cuisine (`/ateliers`, optionnelle — activée)
- Liste de 3 ateliers (nom, durée, prix, description, bouton "Réserver sur WhatsApp").

### 14. Blog / Conseils cuisine — liste (`/blog`)
- Liste de cartes (date, titre, extrait, lien "Lire l'article"). **Pagination par 6, obligatoire dès la V1.**

### 15. Blog — article (`/blog/:id`)
- Date, titre, paragraphes de contenu, CTA final vers "Compose ton repas".

### 16. FAQ (`/faq`)
- Accordéon de questions/réponses (une seule question ouverte à la fois dans le prototype — libre d'autoriser plusieurs ouvertes en production).

### 17. Mentions légales / Confidentialité (`/mentions`)
- Texte statique : éditeur, données personnelles (aucune collecte, pas de cookie de tracking), hygiène/transparence, propriété intellectuelle.

### Navigation globale
- **Header sticky** : logo JC (lien accueil) + nom + slogan + bouton "Commander" (ouvre WhatsApp direct).
- **Bottom nav fixe** (5 items) : Accueil, Recettes, Menu, Composer, **Plus** (ouvre une bottom sheet listant les 11 pages restantes — événements, à propos, galerie, avis, zone, épicerie, ateliers, blog, FAQ, contact, mentions).
- **Toast** : message centré en haut, auto-disparition après 3s (utilisé pour "récapitulatif copié" et erreurs de validation).

## Interactions & Behavior
- **WhatsApp** : chaque action de commande construit un message texte (plat/jour/quantité/prix/précisions + champs libres nom/adresse) et ouvre `https://wa.me/<numero>?text=<message encodé>` dans un nouvel onglet.
- **Messenger** : `m.me/<page>` ne permet pas de pré-remplir un message (limitation Meta). Le clic doit **copier le récapitulatif dans le presse-papiers** (`navigator.clipboard.writeText`), afficher un toast "Récapitulatif copié ! Colle-le dans la conversation Messenger.", puis ouvrir le lien Messenger après un court délai.
- Centraliser la génération de texte de commande dans une fonction utilitaire unique, réutilisée par Menu de la semaine / Compose ton repas / Événements / Recette détail / Contact / Épicerie / Ateliers.
- FAQ : accordéon, clic sur une question bascule son ouverture (icône +/−).
- Compose ton repas : sélection radio par catégorie simple, checkbox pour les extras, récap et total recalculés en temps réel, envoi bloqué avec toast si rien n'est sélectionné.
- Pas d'animations complexes : transitions courtes (~200–250ms) sur l'ouverture de la bottom sheet et l'apparition du toast (translate + fade).
- Responsive : le design est pensé mobile (max-width ~430px centré) ; sur desktop, centrer le contenu dans une colonne mobile plutôt que d'étaler la mise en page (usage tablette/desktop secondaire, cf. demande initiale "utilisable aussi sur desktop" mais mobile-first prioritaire).

## State Management
- Page/route courante, id de recette ouverte, id d'article de blog ouvert, jour sélectionné dans le menu, catégorie/tags actifs sur Recettes, sélections de "Compose ton repas" (objet par catégorie + tableau pour les extras), question FAQ ouverte, état ouverture de la bottom sheet "Plus", message de toast courant.
- Données chargées une fois au démarrage depuis les fichiers JSON (fetch ou import statique — pas de refetch).
- Pas d'état serveur : tout est local à la session (pas de panier persistant requis par le brief, à confirmer avec la cliente si un panier "Compose ton repas" doit survivre à un refresh).

## Design Tokens

### Couleurs
- Fond principal (crème) : `#FBF6EC`
- Fond page/backdrop : `#EDE4D3`
- Terracotta (accent principal, CTA menu) : `#BE4E24`
- Ocre (accent secondaire, motifs) : `#E8A93A`
- Vert émeraude (WhatsApp, zone livraison) : `#1C6B52` / bouton WhatsApp `#1E8E4F`
- Bleu Messenger : `#0B69C7`
- Marron foncé (texte, blocs sombres) : `#2B1B12`
- Texte secondaire : `#5C4B3E`, `#7A6A5C`
- Bordures / fonds de carte clairs : `#EEDFC9`, `#F6EDDD`
- Jaune pâle (encarts astuce/philosophie) : fond `#FDF3DE`, bordure `#F0DBB0`, texte `#A97817`

### Typographie
- Titres : **Bricolage Grotesque**, 700–800, tailles 17–30px selon le niveau.
- Corps de texte / UI : **Instrument Sans**, 400–700, tailles 11–15px.
- Style bandeau "motifs africains" (wax/bogolan) : bande de 6–8px en rayures diagonales tricolores (terracotta / ocre / émeraude), utilisée avec sobriété comme séparateur de section (accueil, footer) — pas de motif figuratif complexe.

### Espacements & rayons
- Rayon standard des cartes : 14–18px ; boutons : 11–14px ; pastilles/chips : 999px (pill).
- Paddings de section : 16–22px horizontal.
- Grille piliers/galerie : 2 colonnes, gap 10–12px.

### Boutons
- Primaire terracotta (navigation menu) : fond `#BE4E24`, texte blanc, 700.
- Commande WhatsApp : fond `#1E8E4F`, texte blanc, 700.
- Commande Messenger : fond `#0B69C7`, texte blanc, 700.
- Secondaire : fond `#F6EDDD`, bordure `#EEDFC9`, texte `#2B1B12`.

## Assets
- **Logo** : monogramme "JC" dans un cercle terracotta à double liseré crème/ocre (voir header dans `reference-design/`). Pas de fichier SVG fourni — à vectoriser proprement par un designer ou recréer en CSS/SVG simple à partir de la description.
- **Photos** : aucune photo réelle fournie. Le prototype utilise des emplacements "glisser-déposer" (`image-slot.js`, outil propre à l'environnement de design) pour : photo héro accueil, portrait de la cheffe, 8 photos de galerie, vignettes recettes/épicerie (actuellement des placeholders rayés avec légende monospace "photo"). **La cliente doit fournir les photos réelles** ; en attendant, utiliser des placeholders visuels clairement identifiés (pas de fausses photos générées).
- Pas d'icônes de librairie externe : les icônes de la bottom nav sont des SVG traits simples (accueil, livre de recettes, calendrier menu, bol composer, points "plus") — à recréer avec une librairie d'icônes du projet (Lucide, Heroicons...) ou en SVG inline équivalents.

## Fichiers de ce package
- `screenshots/` — captures d'écran de la maquette (18 écrans : accueil, recettes liste/détail, menu, composer, sheet "Plus", événements, contact, à propos, galerie, avis, zone, épicerie, ateliers, blog liste/article, FAQ, mentions) — référence visuelle rapide sans avoir à ouvrir le prototype.
- `reference-design/Jose's Cuisine.dc.html` — prototype interactif complet (référence visuelle et comportementale, format propriétaire — ne pas copier tel quel).
- `reference-design/image-slot.js` — composant d'emplacement photo utilisé uniquement dans le prototype (à remplacer par de vraies images en prod).
- `data/*.json` — les 12 fichiers de données sources (recettes, menu, avis, etc.), prêts à être importés tels quels dans l'app React, ou à faire évoluer.
- `README-data.md` — guide (à destination de la cliente, non technique) expliquant comment modifier chaque fichier JSON sans risque. À conserver tel quel dans le repo final, potentiellement lié depuis un back-office minimal ou un simple lien vers le dossier `data/` sur GitHub.
- `prompt-original.md` — brief original complet rédigé par la cliente, à consulter pour tout point non couvert par ce README.

## Prochaines étapes suggérées pour Claude Code
1. Initialiser un projet Vite + React (+ TypeScript recommandé), PWA plugin (`vite-plugin-pwa`).
2. Mettre en place le routing (React Router) avec une route par écran listé ci-dessus.
3. Importer les fichiers `data/*.json` tels quels dans `src/data/`.
4. Construire les composants partagés en premier : Header, BottomNav, BottomSheet "Plus", Toast, PaginatedList, boutons WhatsApp/Messenger (fonction utilitaire `buildOrderMessage()` + `openWhatsApp()` / `copyAndOpenMessenger()`).
5. Construire les écrans dans l'ordre : Accueil → Recettes (liste + détail) → Menu de la semaine → Compose ton repas → Événements → Contact → puis les pages secondaires.
6. Configurer manifest PWA + icônes (dériver du logo JC) + service worker (cache des pages statiques : recettes, menu, à propos, FAQ, blog).
7. Vérifier l'accessibilité (contrastes, alt, tailles de tap ≥ 44px) et le mode hors-ligne.
