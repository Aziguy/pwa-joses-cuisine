import { Link } from 'react-router-dom'
import { infos } from '../lib/data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nom">{infos.nom}</div>
      <div className="footer-slogan">{infos.slogan}</div>
      <div className="footer-zone">{infos.zone}</div>
      <Link to="/mentions">Mentions légales &amp; confidentialité</Link>
      <div className="footer-wax" />
    </footer>
  )
}
