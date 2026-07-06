type Props = {
  note: number
  size?: number
}

export default function Stars({ note, size = 15 }: Props) {
  return (
    <div
      style={{ color: '#E8A93A', fontSize: size, letterSpacing: 2 }}
      aria-label={`Note : ${note} sur 5`}
    >
      {'★'.repeat(note) + '☆'.repeat(5 - note)}
    </div>
  )
}
