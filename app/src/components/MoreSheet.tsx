import { Link } from 'react-router-dom'
import { MORE_PAGES } from './BottomNav'

type Props = {
  open: boolean
  onClose: () => void
}

export default function MoreSheet({ open, onClose }: Props) {
  if (!open) return null

  return (
    <>
      <button className="sheet-backdrop" onClick={onClose} aria-label="Fermer le menu" />
      <div className="sheet" role="dialog" aria-label="Toutes les pages">
        <div className="sheet-poignee" />
        <div className="sheet-liste">
          {MORE_PAGES.map((m) => (
            <Link key={m.path} to={m.path} className="sheet-item" onClick={onClose}>
              <div>
                <div className="titre">{m.label}</div>
                <div className="desc">{m.desc}</div>
              </div>
              <span className="fleche" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
