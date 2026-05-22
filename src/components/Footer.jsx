import styles from './Footer.module.css'
import { useLanguage } from '../i18n/LanguageContext'
import { useTenant } from '../TenantContext'

function initialsFrom(name) {
  if (!name) return 'CC'
  const parts = name.trim().split(/\s+/).slice(0, 2)
  const letters = parts.map(p => p[0]).join('')
  return (letters || name.slice(0, 2)).toUpperCase()
}

export default function Footer() {
  const { t } = useLanguage()
  const { tenant } = useTenant()
  const year = new Date().getFullYear()
  const brandName = tenant?.name ?? 'ClothCo'
  const logoUrl = tenant?.logoUrl

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <div className={styles.logo}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={brandName}
                  className={styles.logoImage}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <>
                  <span className={styles.logoMark}>{initialsFrom(brandName)}</span>
                  <span className={styles.logoText}>{brandName}</span>
                </>
              )}
            </div>
            <p className={styles.tagline}>
              {tenant?.tagline ?? t('footer.tagline')}
            </p>
          </div>

          <div className={styles.colsWrap}>
            {(tenant?.contactEmail || tenant?.contactPhone) && (
              <div className={styles.col}>
                <h4 className={styles.colTitle}>{t('footer.contact')}</h4>
                <ul className={styles.list}>
                  {tenant?.contactEmail && (
                    <li>
                      <a href={`mailto:${tenant.contactEmail}`} className={styles.link}>
                        {tenant.contactEmail}
                      </a>
                    </li>
                  )}
                  {tenant?.contactPhone && (
                    <li>
                      <a href={`tel:${tenant.contactPhone}`} className={styles.link}>
                        {tenant.contactPhone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {tenant?.facebookUrl && (
              <div className={styles.col}>
                <h4 className={styles.colTitle}>{t('footer.follow')}</h4>
                <ul className={styles.list}>
                  <li>
                    <a
                      href={tenant.facebookUrl}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {tenant?.shopUrl && (
              <div className={styles.col}>
                <h4 className={styles.colTitle}>{t('nav.shop')}</h4>
                <a
                  href={tenant.shopUrl}
                  className={styles.shopBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.shopCta')}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>{t('footer.copy', { year, brand: brandName })}</p>
          <p className={styles.powered}>{t('footer.poweredBy')}</p>
        </div>
      </div>
    </footer>
  )
}
