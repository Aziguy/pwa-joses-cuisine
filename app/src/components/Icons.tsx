// Icônes SVG traits simples de la bottom nav (reprises du prototype).
type IconProps = { active?: boolean }

const stroke = (active?: boolean) => (active ? '#BE4E24' : '#8A7A6A')

function Svg({ active, d }: IconProps & { d: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke(active)}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export const IconAccueil = ({ active }: IconProps) => (
  <Svg active={active} d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10" />
)

export const IconRecettes = ({ active }: IconProps) => (
  <Svg active={active} d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h11" />
)

export const IconMenu = ({ active }: IconProps) => (
  <Svg active={active} d="M4 6h16v14H4zM4 10h16M8 4v4M16 4v4" />
)

export const IconComposer = ({ active }: IconProps) => (
  <Svg
    active={active}
    d="M4 12h16c0 4.5-3.6 8-8 8s-8-3.5-8-8zM9.5 8c0-2 1.5-2 1.5-4M14 8c0-2 1.5-2 1.5-4"
  />
)

export const IconPlus = ({ active }: IconProps) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={stroke(active)} aria-hidden="true">
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
)
