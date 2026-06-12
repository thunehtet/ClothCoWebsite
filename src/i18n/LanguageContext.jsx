import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'clothco.lang'
const SUPPORTED = ['en', 'my']

function detectInitial() {
  if (typeof window === 'undefined') return 'my'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored)) return stored
  return 'my'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang === 'my' ? 'my' : 'en'
    document.documentElement.dataset.lang = lang
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }, [lang])

  const t = useCallback((key, vars) => {
    const dict = translations[lang] ?? translations.en
    let str = dict[key] ?? translations.en[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replaceAll(`{${k}}`, String(v))
      }
    }
    return str
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
