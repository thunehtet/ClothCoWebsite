// Thin fetch wrapper around StockEasy's /api/storefront/* endpoints.
//
// Configure via .env:
//   VITE_API_BASE_URL=http://localhost:5048   (no trailing slash)
//   VITE_TENANT_CODE=DEMO                     (the tenant Code on StockEasy)

const RAW_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const BASE = RAW_BASE.replace(/\/+$/, '')
const TENANT = (import.meta.env.VITE_TENANT_CODE ?? '').trim()

function requireTenant() {
  if (!TENANT) {
    throw new Error('VITE_TENANT_CODE is not set — add it to .env.local')
  }
}

async function getJson(path) {
  if (!BASE) {
    throw new Error('VITE_API_BASE_URL is not set — add it to .env.local')
  }
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`API ${path} → ${res.status}`)
  }
  return res.json()
}

export function getTenantInfo() {
  requireTenant()
  return getJson(`/api/storefront/${encodeURIComponent(TENANT)}`)
}

export function getProducts({ limit = 8 } = {}) {
  requireTenant()
  return getJson(`/api/storefront/${encodeURIComponent(TENANT)}/products?limit=${limit}`)
}

export function getCategories({ limit = 6 } = {}) {
  requireTenant()
  return getJson(`/api/storefront/${encodeURIComponent(TENANT)}/categories?limit=${limit}`)
}

export const TENANT_CODE = TENANT
