# Prompt — PWA "Jose's cuisine" (mobile-first, sans base de données) 

---

## 1. Contexte du projet

Je gère une activité de restauration **informelle et à domicile**, basée dans les **Yvelines (France)** **Jose's cuisine**, d'inspiration **camerounaise et africaine**. Je cuisine chez moi et je livre. Je ne suis pas un restaurant classique : pas de vitrine, pas de terminal de paiement, pas de système de réservation en ligne classique. Les commandes se finalisent par **WhatsApp ou Messenger**.

Je veux une **PWA mobile-first** (accessible depuis le web, installable sur téléphone, utilisable aussi sur desktop) construite en **React**, **sans base de données réelle** : toutes les données (recettes, menus, plats personnalisables, avis, etc.) doivent être gérées via des **fichiers JSON** faciles à modifier à la main, sans toucher au code.

## 2. Objectif

Donner une image professionnelle, chaleureuse et rassurante à une activité artisanale, tout en gardant une **simplicité de gestion totale** (je modifie des fichiers JSON, pas de code, pas de back-office complexe). L'app doit convertir : chaque page clé doit pousser vers une commande WhatsApp/Messenger.

## 3. Identité de marque et ton

- Univers visuel : couleurs chaleureuses (terracotta, ocre, vert émeraude, jaune épices), touches de motifs africains (wax, bogolan) utilisées avec sobriété, typographie moderne et lisible.
- slogan: food is bae*
- Ton : convivial, familial, fait-maison, transparent sur les ingrédients et le "fait avec amour".
- Mettre en avant : fait-maison, produits bio/frais, petits budgets possibles, marinades maison, savoir-faire camerounais/africain.

## 4. Arborescence des pages (complétée)

### Pages principales (déjà demandées)
1. **Accueil** — présentation détaillée de l'activité
2. **Recettes** — par catégories (entrées, plats, desserts, boissons, sauces/marinades…)
3. **Menu de la semaine** (lundi → dimanche) — commande directe via WhatsApp/Messenger
4. **Compose ton repas** — personnalisation par catégories, commande envoyée à WhatsApp/Messenger
5. **Contact** — demandes spécifiques

### Pages complémentaires proposées
6. **Qui sommes-nous / Notre histoire** — le parcours, les origines camerounaises, la philosophie "cuisine maison", photos de la cheffe/du chef en action
7. **Événements & Traiteur** (anniversaires, mariages, baptêmes, entreprises) — formulaire de demande de devis avec nombre d'invités, date, type d'événement, budget indicatif → envoi WhatsApp
8. **Galerie** — photos des plats, événements réalisés, avant/après
9. **Avis & Témoignages** — retours clients (gérés via JSON, avec note et commentaire)
10. **Zone de livraison & Infos pratiques** — communes livrées dans les Yvelines, horaires, délais, frais de livraison, minimum de commande
11. **Épicerie / Produits maison** (optionnel) — vente de marinades, sauces, épices en pots, à emporter ou en livraison
12. **Ateliers cuisine** (optionnel) — cours de cuisine africaine à domicile ou en petit groupe, réservation via formulaire
13. **Blog / Conseils cuisine** — articles courts : astuces, bienfaits des ingrédients africains, comment bien conserver une marinade, cuisiner bio à petit budget, etc.
14. **FAQ** — allergènes, délais de commande, zones livrées, moyens de paiement, modalités d'annulation
15. **Mentions légales / Politique de confidentialité** — même pour une activité informelle, utile et rassurant pour les clients (statut, données collectées, cookies éventuels)

## 5. Détail des fonctionnalités clés

### 5.1 Page d'accueil
- Bloc héro avec photo/plat signature + accroche + bouton "Voir le menu de la semaine" et "Commander sur WhatsApp"
- Présentation de l'activité (qui, quoi, où, pourquoi)
- Mise en avant des 6-7 piliers de service (voir section 6)
- Extrait des avis clients
- Aperçu de 3-4 recettes phares avec lien vers la page Recettes
- Bandeau zone de livraison (Yvelines + communes)
- Call-to-action WhatsApp/Messenger flottant (bouton sticky bas d'écran)

### 5.2 Page Recettes
- Filtrage par catégorie : Entrées, Plats, Desserts, Boissons, Sauces & Marinades, Gâteaux
- Filtres secondaires : bio, petit budget, végétarien, sans porc, épicé/non épicé
- Chaque fiche recette : photo, temps de préparation, difficulté, ingrédients, étapes, "astuce de la chef"
- Bouton "Commander ce plat" → WhatsApp pré-rempli

### 5.3 Menu de la semaine (lundi → dimanche)
- Vue par jour (onglets ou accordéon) : entrée/plat/dessert/boisson du jour
- Prix affiché par plat
- Bouton **"Commander via WhatsApp"** et **"Commander via Messenger"** par plat ou pour le menu complet du jour
- Le message pré-rempli doit inclure : nom du plat, jour, quantité, éventuelles précisions

### 5.4 Compose ton repas (personnalisation)
- Sélecteurs par catégorie (entrée / plat / dessert / boisson / extra ou sauce) alimentés par un JSON modifiable
- Récapitulatif dynamique du panier (prix total estimé)
- Champ "précisions" (allergies, niveau de piment, sans porc, etc.)
- Bouton final : "Envoyer ma commande sur WhatsApp" ou "sur Messenger" → génère le message texte automatiquement

### 5.5 Événements & Traiteur
- Formulaire : type d'événement, date, nombre de personnes, budget, message libre
- Envoi du récapitulatif vers WhatsApp/Messenger en un clic

### 5.6 Contact
- Formulaire simple (nom, téléphone, message)
- Boutons directs WhatsApp / Messenger / Appel téléphonique
- Carte ou mention claire de la zone géographique (Yvelines)

## 6. Les "piliers" de service à mettre en avant partout dans l'UI
1. Conseils de cuisine personnalisés
2. Cuisine pour événements (anniversaires, mariages, baptêmes, entreprises)
3. Marinades et sauces maison
4. Manger bio et sain
5. Manger à petit budget
6. Recettes à faire soi-même (pédagogie, transmission)
7. Pâtisserie / gâteaux sur mesure
8. Ateliers et cours de cuisine (si retenu)
9. Épicerie de produits maison (si retenu)

## 7. Intégration WhatsApp / Messenger (point technique important)

- **WhatsApp** : utiliser un lien `https://wa.me/33XXXXXXXXX?text=MESSAGE_ENCODÉ`. Le texte peut être **totalement pré-rempli** (nom du plat, quantité, jour, prix, précisions).
- **Messenger** : les liens `https://m.me/NOM_DE_PAGE` **ne permettent pas de pré-remplir un message côté utilisateur** (limitation officielle de Meta, contrairement à WhatsApp). Prévoir donc :
  - un clic sur "Commander via Messenger" qui **copie automatiquement le récapitulatif de commande dans le presse-papiers** (`navigator.clipboard.writeText`) puis ouvre `m.me/NOM_DE_PAGE`, avec un petit message à l'écran : "Récapitulatif copié ! Colle-le dans la conversation Messenger."
- Centraliser la génération du texte de commande dans une seule fonction utilitaire réutilisée sur toutes les pages (Menu de la semaine, Compose ton repas, Événements).

## 8. Architecture des données (JSON, sans base de données)

Proposition d'arborescence `/src/data/` :
```
data/
├── infos-generales.json      // nom, tel WhatsApp, page Messenger, adresse, zone de livraison, horaires
├── recettes.json             // liste des recettes par catégorie
├── menu-semaine.json         // menu par jour (lundi→dimanche)
├── compose-repas.json        // options disponibles par catégorie pour la personnalisation
├── evenements.json           // types d'évènements proposés + tarifs indicatifs
├── avis.json                 // témoignages clients
├── galerie.json              // liste des photos + légendes
├── faq.json                  // questions/réponses
├── blog.json                 // articles de conseils avec pagination 
└── equipe.json               // présentation "qui sommes-nous"
```
Chaque fichier doit avoir une structure simple et commentée (via un fichier `README-data.md` expliquant comment modifier chaque JSON sans risque).

## 9. Contraintes techniques

- **React** (Vite recommandé), architecture de composants réutilisables
- **PWA** : manifest.json, service worker, icônes, installable, fonctionnement correct hors-ligne pour les pages statiques (recettes, menu, à propos)
- **Mobile-first** strict : tous les écrans doivent être pensés d'abord pour un usage smartphone (boutons larges, navigation en bas d'écran type bottom nav)
- **Pas de backend / pas de base de données** : tout repose sur les fichiers JSON importés statiquement
- Accessibilité de base (contrastes, tailles de police, alt sur images)
- Temps de chargement rapide (compression images, lazy loading)
- Facilement modifiable par une personne non technique pour les fichiers JSON (structure la plus plate et explicite possible)

## 10. Livrables attendus

1. Prototype visuel (Claude Design) : maquettes des pages principales, mobile-first, avec la charte graphique proposée
2. Implémentation complète (Claude Code) : application React/PWA fonctionnelle avec toutes les pages, alimentée par les fichiers JSON listés, boutons WhatsApp/Messenger opérationnels
> proposer après validation un package télécharger avec instruction pour claude code
3. Un fichier `README-data.md` expliquant comment je peux moi-même mettre à jour les menus, recettes et avis sans aide technique

---
