# JS cuisine — Guide de modification des données

Tout le contenu du site vit dans le dossier **`data/`**, en fichiers JSON.
Pour changer un menu, un prix ou un avis : ouvrez le fichier, modifiez le texte, enregistrez. **Aucun code à toucher.**

## Règles d'or (pour ne rien casser)
1. Ne supprimez jamais les guillemets `"` autour des textes.
2. Chaque élément d'une liste est séparé par une virgule — **sauf le dernier** (pas de virgule après).
3. Les prix sont des nombres **sans guillemets** et avec un **point** décimal : `3.5` (affiché « 3,50 € »).
4. En cas de doute, copiez une ligne existante et modifiez-la.
5. Testez votre fichier sur https://jsonlint.com avant d'enregistrer si vous n'êtes pas sûr·e.

## Les fichiers

### `infos-generales.json` — coordonnées & infos pratiques
- `whatsapp` : numéro au format international **sans le +** (ex. `33753442592`)
- `messenger` : lien m.me de la page Facebook
- `communes` : liste des communes livrées
- `horaires`, `delaiCommande`, `fraisLivraison`, `minimumCommande` : textes libres
- `piliers` : les points forts affichés sur l'accueil (`nom` + `desc`)

### `menu-semaine.json` — le menu lundi → dimanche
7 blocs `jour`. Chaque jour contient une liste `plats` avec `type` (Entrée/Plat/Dessert/Boisson), `nom` et `prix`.
**C'est le fichier à mettre à jour chaque semaine.**

### `recettes.json` — la carte
Chaque recette : `id` (unique, sans espaces ni accents), `nom`, `categorie`
(exactement : `Entrées`, `Plats`, `Desserts`, `Boissons`, `Sauces & Marinades` ou `Gâteaux`),
`prix`, `temps`, `difficulte`, `tags` (parmi `bio`, `petit-budget`, `vegetarien`, `epice`),
`description`, `ingredients` (liste), `etapes` (liste), `astuce`.

### `compose-repas.json` — options « Compose ton repas »
Catégories `entree`, `plat`, `dessert`, `boisson`, `extra`. Chaque option : `nom` + `prix`.
La catégorie `extra` autorise plusieurs choix ; les autres un seul.

### `avis.json` — témoignages clients
`nom`, `note` (1 à 5), `commentaire`, `date`. Les 2 premiers s'affichent sur l'accueil.

### `evenements.json` — offres traiteur
`nom`, `desc`, `tarif` (texte libre, ex. « à partir de 15 €/pers »).

### `galerie.json` — photos
`id` (unique) + `legende`. Les photos se glissent directement dans les cases de la page Galerie.

### `faq.json` — questions fréquentes
Paires `q` / `r`.

### `blog.json` — articles conseils
`id`, `titre`, `date`, `extrait`, `contenu` (liste de paragraphes).

### `equipe.json` — page « Qui sommes-nous »
`prenom`, `titre`, `histoire` (liste de paragraphes), `philosophie`.

### `epicerie.json` — produits maison
`nom`, `format`, `prix`, `desc`.

### `ateliers.json` — cours de cuisine
`nom`, `duree`, `prix` (texte), `desc`.

## Ce qui se met à jour tout seul
- Les boutons WhatsApp génèrent automatiquement le message de commande (plat, prix, jour, total).
- Les boutons Messenger copient le récapitulatif dans le presse-papiers avant d'ouvrir la conversation.
- Le menu de la semaine s'ouvre automatiquement sur le jour actuel.
- La note moyenne des avis est calculée automatiquement.
