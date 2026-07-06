// Point d'entrée unique vers les données JSON (importées statiquement,
// donc embarquées dans le bundle et disponibles hors-ligne).
import infosGenerales from '../data/infos-generales.json'
import recettesJson from '../data/recettes.json'
import menuSemaineJson from '../data/menu-semaine.json'
import composeRepasJson from '../data/compose-repas.json'
import evenementsJson from '../data/evenements.json'
import avisJson from '../data/avis.json'
import galerieJson from '../data/galerie.json'
import faqJson from '../data/faq.json'
import blogJson from '../data/blog.json'
import equipeJson from '../data/equipe.json'
import epicerieJson from '../data/epicerie.json'
import ateliersJson from '../data/ateliers.json'

export const infos = infosGenerales
export const recettes = recettesJson.recettes
export const menuSemaine = menuSemaineJson.jours
export const composeCategories = composeRepasJson.categories
export const evenementTypes = evenementsJson.types
export const avis = avisJson.avis
export const galerie = galerieJson.photos
export const faq = faqJson.questions
export const blog = blogJson.articles
export const equipe = equipeJson
export const epicerie = epicerieJson.produits
export const ateliers = ateliersJson.ateliers

export type Recette = (typeof recettes)[number]
export type JourMenu = (typeof menuSemaine)[number]
export type ArticleBlog = (typeof blog)[number]
export type Avis = (typeof avis)[number]

// « Juin 2026 » → valeur triable (les listes datées sont triées décroissant).
const MOIS_FR: Record<string, number> = {
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11,
  décembre: 12, decembre: 12,
}

export function dateFrValue(date: string): number {
  const m = date.trim().toLowerCase().match(/^(\p{L}+)\s+(\d{4})$/u)
  if (!m) return 0
  return Number(m[2]) * 100 + (MOIS_FR[m[1]] ?? 0)
}

export function trierParDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => dateFrValue(b.date) - dateFrValue(a.date))
}
