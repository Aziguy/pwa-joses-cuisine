// Génération centralisée des messages de commande + ouverture WhatsApp/Messenger.
// Réutilisé par : Menu de la semaine, Compose ton repas, Événements, Recette
// détail, Contact, Épicerie, Ateliers, Avis.
import { infos, type JourMenu } from './data'

export const fmt = (p: number) =>
  (p % 1 ? p.toFixed(2).replace('.', ',') : String(p)) + ' €'

const SALUT = "Bonjour JS cuisine !"
const COORDONNEES = '\n\nNom : \nAdresse de livraison : '

export function openWhatsApp(text: string) {
  window.open(`https://wa.me/${infos.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
}

// m.me ne permet pas de pré-remplir : on copie le récapitulatif puis on ouvre.
export function copyAndOpenMessenger(text: string, onCopied?: () => void) {
  const go = () => window.open(infos.messenger, '_blank')
  if (navigator.clipboard && text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        onCopied?.()
        setTimeout(go, 400)
      })
      .catch(go)
  } else {
    go()
  }
}

export const msgCommandeDirecte = () => `${SALUT} Je voudrais passer une commande.`

export function msgPlat(nom: string, prix?: number | null, jour?: string) {
  return (
    `${SALUT}\nJe souhaite commander :\n• ${nom}` +
    (prix != null ? ` — ${fmt(prix)}` : '') +
    (jour ? ` (${jour})` : '') +
    '\nQuantité : 1' +
    COORDONNEES
  )
}

export function msgJour(jour: JourMenu) {
  const total = jour.plats.reduce((s, p) => s + p.prix, 0)
  return (
    `${SALUT}\nJe commande le menu complet du ${jour.jour.toLowerCase()} :\n` +
    jour.plats.map((p) => `• ${p.type} : ${p.nom} — ${fmt(p.prix)}`).join('\n') +
    `\nTotal : ${fmt(total)}` +
    COORDONNEES
  )
}

export function msgCompose(
  lignes: { categorie: string; nom: string; prix: number }[],
  precisions: string,
) {
  const total = lignes.reduce((s, l) => s + l.prix, 0)
  return (
    `${SALUT}\nVoici mon repas composé :\n` +
    lignes.map((l) => `• ${l.categorie} : ${l.nom} — ${fmt(l.prix)}`).join('\n') +
    `\nTotal estimé : ${fmt(total)}` +
    (precisions ? `\nPrécisions : ${precisions}` : '') +
    COORDONNEES
  )
}

const ou = (v: string) => v.trim() || '—'

export function msgDevis(d: {
  type: string
  date: string
  invites: string
  budget: string
  message: string
}) {
  return (
    `${SALUT}\nDemande de devis traiteur :\n• Événement : ${ou(d.type)}` +
    `\n• Date : ${ou(d.date)}\n• Invités : ${ou(d.invites)}` +
    `\n• Budget indicatif : ${ou(d.budget)}\n• Message : ${ou(d.message)}`
  )
}

export function msgContact(d: { nom: string; tel: string; message: string }) {
  return `${SALUT}\n• Nom : ${ou(d.nom)}\n• Téléphone : ${ou(d.tel)}\n• Message : ${ou(d.message)}`
}

export function msgAtelier(nom: string, prix: string) {
  return `${SALUT}\nJe souhaite réserver l'atelier « ${nom} » (${prix}).\nDate souhaitée : \nNombre de participants : `
}

export const msgLaisserAvis = () =>
  `${SALUT}\nVoici mon avis :\nNote (sur 5) : \nCommentaire : `
