import { createContext, useContext, useEffect, useState } from 'react'
import { getTenantInfo } from './api/storefront'

const TenantContext = createContext(null)

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false
    getTenantInfo()
      .then(data => {
        if (cancelled) return
        setTenant(data)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => { cancelled = true }
  }, [])

  return (
    <TenantContext.Provider value={{ tenant, status }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) throw new Error('useTenant must be used inside <TenantProvider>')
  return ctx
}
