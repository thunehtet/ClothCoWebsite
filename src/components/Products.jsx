import { useCallback, useEffect, useState } from 'react'
import styles from './Products.module.css'
import { getProducts } from '../api/storefront'
import { useLanguage } from '../i18n/LanguageContext'
import { useTenant } from '../TenantContext'
import { collectionPhotoFor } from '../data/collectionPhotos'
import { safeUrl } from '../utils/safeUrl'

function formatPrice(p, currency) {
  const fmt = new Intl.NumberFormat('en-US')
  const label = p.minPrice === p.maxPrice
    ? fmt.format(p.minPrice)
    : `${fmt.format(p.minPrice)}–${fmt.format(p.maxPrice)}`
  return { label, currency: currency ?? '' }
}

function ProductCard({ p, currency, viewLabel, imageFallback }) {
  const { label, currency: cur } = formatPrice(p, currency)
  const imageSrc = p.thumbnailUrl ?? p.imageUrl ?? imageFallback
  return (
    <a
      className={styles.card}
      href={safeUrl(p.shopUrl)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.imageWrap}>
        <img
          src={imageSrc}
          alt={p.name}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.viewBadge} aria-hidden="true">
          {viewLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </span>
      </div>
      <div className={styles.body}>
        {p.category && <span className={styles.category}>{p.category}</span>}
        <h3 className={styles.name}>{p.name}</h3>
        <span className={styles.price}>
          <span className={styles.priceValue}>{label}</span>
          {cur && <span className={styles.priceCurrency}>{cur}</span>}
        </span>
      </div>
    </a>
  )
}

export default function Products() {
  const { t } = useLanguage()
  const { tenant } = useTenant()
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [requestVersion, setRequestVersion] = useState(0)

  const loadProducts = useCallback(() => {
    setRequestVersion(v => v + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    getProducts({ limit: 6 })
      .then(data => {
        if (cancelled) return
        setItems(data)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setItems([])
        setStatus('error')
      })
    return () => { cancelled = true }
  }, [requestVersion])

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden="true" />
              {t('products.eyebrow')}
            </p>
            <h2 className={styles.title}>{t('products.title')}</h2>
          </div>
          {tenant?.shopUrl && status === 'ready' && items.length > 0 && (
            <a
              href={safeUrl(tenant.shopUrl)}
              className={styles.headerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('products.viewAll')}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </header>

        {status === 'loading' && (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.skeletonImage} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineMd}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineLg}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineSm}`} />
              </div>
            ))}
          </div>
        )}
        {status === 'error' && (
          <div className={styles.note}>
            <p>{t('products.error')}</p>
            <button className={styles.retry} type="button" onClick={loadProducts}>
              {t('products.retry')}
            </button>
          </div>
        )}
        {status === 'ready' && items.length === 0 && (
          <p className={styles.note}>{t('products.empty')}</p>
        )}
        {status === 'ready' && items.length > 0 && (
          <div className={styles.grid}>
            {items.map((p, i) => (
              <ProductCard
                key={p.id}
                p={p}
                currency={tenant?.currency}
                viewLabel={t('products.view')}
                imageFallback={collectionPhotoFor(i).imageUrl}
              />
            ))}
          </div>
        )}

        {tenant?.shopUrl && status === 'ready' && items.length > 0 && (
          <div className={styles.footer}>
            <a
              href={safeUrl(tenant.shopUrl)}
              className={styles.viewAll}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('products.viewAll')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
