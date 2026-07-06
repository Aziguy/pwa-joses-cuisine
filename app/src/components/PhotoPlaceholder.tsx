import type { CSSProperties } from 'react'

// Emplacement photo clairement identifié, en attendant les vraies photos de la
// cliente (à remplacer par de vraies <img> avec alt).
type Props = {
  label: string
  height?: number | string
  radius?: number
  circle?: boolean
  style?: CSSProperties
}

export default function PhotoPlaceholder({ label, height = 150, radius = 14, circle, style }: Props) {
  return (
    <div
      className="photo-placeholder"
      role="img"
      aria-label={label}
      style={{
        height,
        borderRadius: circle ? '50%' : radius,
        ...style,
      }}
    >
      <span>photo — {label}</span>
    </div>
  )
}
