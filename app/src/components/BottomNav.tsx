import { Link, useLocation } from 'react-router-dom'
import { IconAccueil, IconComposer, IconMenu, IconPlus, IconRecettes } from './Icons'

export const MORE_PAGES = [
  { path: '/evenements', label: 'Événements & Traiteur', desc: 'Devis anniversaire, mariage, entreprise' },
  { path: '/a-propos', label: 'Qui sommes-nous', desc: "L'histoire de José, du Cameroun au 78" },
  { path: '/galerie', label: 'Galerie', desc: 'Photos des plats et événements' },
  { path: '/avis', label: 'Avis & témoignages', desc: 'Ce que disent nos clients' },
  { path: '/zone', label: 'Zone de livraison', desc: 'Communes, horaires, frais' },
  { path: '/epicerie', label: 'Épicerie maison', desc: 'Marinades, sauces et épices en pots' },
  { path: '/ateliers', label: 'Ateliers cuisine', desc: 'Cours de cuisine africaine' },
  { path: '/blog', label: 'Conseils cuisine', desc: 'Astuces et articles courts' },
  { path: '/faq', label: 'FAQ', desc: 'Allergènes, paiement, annulation…' },
  { path: '/contact', label: 'Contact', desc: 'Demandes spécifiques' },
  { path: '/mentions', label: 'Mentions légales', desc: 'Confidentialité et infos' },
]

type Props = {
  moreOpen: boolean
  onToggleMore: () => void
}

export default function BottomNav({ moreOpen, onToggleMore }: Props) {
  const { pathname } = useLocation()

  const isActive = (path: string) =>
    !moreOpen && (path === '/' ? pathname === '/' : pathname.startsWith(path))

  const moreActive = moreOpen || MORE_PAGES.some((m) => pathname.startsWith(m.path))

  const items = [
    { path: '/', label: 'Accueil', Icon: IconAccueil },
    { path: '/recettes', label: 'Recettes', Icon: IconRecettes },
    { path: '/menu', label: 'Menu', Icon: IconMenu },
    { path: '/composer', label: 'Composer', Icon: IconComposer },
  ]

  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {items.map(({ path, label, Icon }) => (
        <Link key={path} to={path} className={isActive(path) ? 'actif' : ''}>
          <Icon active={isActive(path)} />
          <span className="nav-label">{label}</span>
        </Link>
      ))}
      <button
        onClick={onToggleMore}
        className={moreActive ? 'actif' : ''}
        aria-expanded={moreOpen}
        aria-label="Plus de pages"
      >
        <IconPlus active={moreActive} />
        <span className="nav-label">Plus</span>
      </button>
    </nav>
  )
}
