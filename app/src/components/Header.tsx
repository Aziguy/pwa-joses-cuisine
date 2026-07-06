import { Link } from 'react-router-dom'
import { infos } from '../lib/data'
import { msgCommandeDirecte, openWhatsApp } from '../lib/order'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-jc" aria-label="Accueil — Jose's cuisine">
        <span>JC</span>
      </Link>
      <div className="header-infos">
        <div className="header-nom">{infos.nom}</div>
        <div className="header-slogan">{infos.slogan}</div>
      </div>
      <button className="header-commander" onClick={() => openWhatsApp(msgCommandeDirecte())}>
        Commander
      </button>
    </header>
  )
}
