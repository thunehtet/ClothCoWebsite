import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { useLanguage } from '../i18n/LanguageContext'
import { useTenant } from '../TenantContext'

const NAV_KEYS = [
  { key: 'nav.home',     href: '#home' },
  { key: 'nav.products', href: '#products' },
  { key: 'nav.about',    href: '#about' },
  { key: 'nav.faq',      href: '#faq' },
  { key: 'nav.contact',  href: '#contact' },
]

function initialsFrom(name) {
  if (!name) return 'CC'
  const parts = name.trim().split(/\s+/).slice(0, 2)
  const letters = parts.map(p => p[0]).join('')
  return (letters || name.slice(0, 2)).toUpperCase()
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, setLang } = useLanguage()
  const { tenant } = useTenant()
  const shopHref = tenant?.shopUrl ?? '#products'
  const brandName = tenant?.name ?? 'ClothCo'
  const logoUrl = tenant?.logoUrl

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo} aria-label={brandName}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={brandName}
              className={styles.logoImage}
              loading="eager"
              decoding="async"
            />
          ) : (
            <span className={styles.logoMark}>{initialsFrom(brandName)}</span>
          )}
          <span className={styles.logoText}>{brandName}</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          {NAV_KEYS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </a>
          ))}

          <div className={styles.langSwitch} role="group" aria-label="Language">
            <button
              className={`${styles.langBtn} ${lang === 'my' ? styles.langActive : ''}`}
              onClick={() => setLang('my')}
              aria-pressed={lang === 'my'}
            >
              {t('lang.my')}
            </button>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              {t('lang.en')}
            </button>
          </div>

          <a
            href={shopHref}
            className={styles.cta}
            onClick={() => setMenuOpen(false)}
            target={shopHref.startsWith('http') ? '_blank' : undefined}
            rel={shopHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {t('nav.shop')}
          </a>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.lineTop : ''}></span>
          <span className={menuOpen ? styles.lineHide : ''}></span>
          <span className={menuOpen ? styles.lineBottom : ''}></span>
        </button>
      </div>
    </header>
  )
}
