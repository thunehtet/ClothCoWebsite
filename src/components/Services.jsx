import styles from './Services.module.css'
import { useLanguage } from '../i18n/LanguageContext'

const ITEMS = [
  {
    id: 'online',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
  {
    id: 'delivery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7" />
        <circle cx="7"  cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    id: 'cod',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <circle cx="12" cy="12.5" r="2.6" />
        <path d="M7 9.5v.01" />
        <path d="M17 15.5v.01" />
      </svg>
    ),
  },
]

export default function Services() {
  const { t } = useLanguage()
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            {t('services.eyebrow')}
          </p>
          <h2 id="services-title" className={styles.title}>
            {t('services.title')}
          </h2>
        </header>

        <ul className={styles.grid}>
          {ITEMS.map((item, i) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.icon} aria-hidden="true">
                {item.icon}
              </div>
              <h3 className={styles.itemTitle}>{t(`services.${item.id}.title`)}</h3>
              <p className={styles.itemBody}>{t(`services.${item.id}.body`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
