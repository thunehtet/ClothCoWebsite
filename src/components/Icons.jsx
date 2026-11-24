// Small decorative "bedtime" icons shared across sections. All are aria-hidden
// by default because they are purely ornamental.

export function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path fill="currentColor" d="M12 2c.6 4.6 2.4 7.4 10 10-7.6 2.6-9.4 5.4-10 10-.6-4.6-2.4-7.4-10-10 7.6-2.6 9.4-5.4 10-10z" />
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path fill="currentColor" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  )
}

export function CloudIcon(props) {
  return (
    <svg viewBox="0 0 64 32" aria-hidden="true" focusable="false" {...props}>
      <path fill="currentColor" d="M16 32a12 12 0 0 1-2-23.8A14 14 0 0 1 40 6a10 10 0 0 1 14 8 9 9 0 0 1-2 18z" />
    </svg>
  )
}
