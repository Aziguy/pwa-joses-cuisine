import { usePageMeta } from '../lib/usePageMeta'

const h2Style = {
  fontFamily: 'var(--font-titre)',
  fontWeight: 700,
  fontSize: 16,
  margin: '0 0 8px',
} as const

const pStyle = {
  fontSize: 13.5,
  lineHeight: 1.6,
  color: 'var(--texte-2)',
  margin: '0 0 16px',
} as const

export default function Mentions() {
  usePageMeta(
    "Mentions légales & confidentialité — JS cuisine",
    "Mentions légales de JS cuisine : éditeur, données personnelles (aucune collecte, pas de cookie de suivi), hygiène et propriété intellectuelle.",
  )

  return (
    <main style={{ padding: '18px 22px 8px' }}>
      <h1
        style={{ fontFamily: 'var(--font-titre)', fontWeight: 800, fontSize: 24, margin: '0 0 16px' }}
      >
        Mentions légales &amp; confidentialité
      </h1>

      <h2 style={h2Style}>Éditeur</h2>
      <p style={pStyle}>
        JS cuisine — activité de restauration artisanale à domicile, basée en Ile-de-France, France. Contact : WhatsApp au +33 7 53 44 25 92.
      </p>

      <h2 style={h2Style}>Données personnelles</h2>
      <p style={pStyle}>
        Ce site ne collecte aucune donnée personnelle et n'utilise aucun cookie de suivi. Les
        commandes se finalisent sur WhatsApp ou Messenger : les informations que vous y partagez
        (nom, adresse de livraison) servent uniquement à préparer et livrer votre commande, et ne
        sont jamais transmises à des tiers.
      </p>

      <h2 style={h2Style}>Hygiène &amp; transparence</h2>
      <p style={pStyle}>
        Les plats sont préparés dans une cuisine domestique dans le respect des règles d'hygiène
        alimentaire. La liste des ingrédients et allergènes de chaque plat est disponible sur
        simple demande.
      </p>

      <h2 style={h2Style}>Propriété</h2>
      <p style={{ ...pStyle, margin: 0 }}>
        Les textes, recettes et photos de ce site appartiennent à JS cuisine. Merci de demander
        avant de réutiliser.
      </p>
    </main>
  )
}
