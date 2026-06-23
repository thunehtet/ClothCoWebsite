// Guards against javascript:/data: and other dangerous URL schemes that can
// slip in through API-supplied links (tenant.shopUrl, product.shopUrl, etc.).
// React escapes text but does NOT sanitize href schemes, so we validate here.
//
// Allowed: http(s), mailto, tel, and same-document/relative links (#anchor,
// /path, ./path). Anything else falls back to `fallback` (default '#').

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

export function safeUrl(url, fallback = '#') {
  if (typeof url !== 'string') return fallback

  const trimmed = url.trim()
  if (!trimmed) return fallback

  // Relative / same-document links never carry a scheme — allow them.
  if (
    trimmed.startsWith('#') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  ) {
    return trimmed
  }

  try {
    // Resolve against the current origin so scheme-relative and absolute
    // URLs are both parsed correctly.
    const parsed = new URL(trimmed, window.location.origin)
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? trimmed : fallback
  } catch {
    return fallback
  }
}

// True when the (already-validated) URL points off-site and should open in a
// new tab. Relative/hash links stay in the same tab.
export function isExternal(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim())
}
