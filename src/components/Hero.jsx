import styles from './Hero.module.css'
import { useLanguage } from '../i18n/LanguageContext'
import { useTenant } from '../TenantContext'
import { COLLECTION_PHOTOS } from '../data/collectionPhotos'
import { safeUrl, isExternal } from '../utils/safeUrl'

export default function Hero() {
  const { t } = useLanguage()
  const { tenant } = useTenant()
  const shopHref = safeUrl(tenant?.shopUrl ?? '#products', '#products')

  const gallery = COLLECTION_PHOTOS

  const hasGallery = gallery.length > 0
  const galleryVariant =
    gallery.length >= 3 ? styles.galleryTriple :
    gallery.length === 2 ? styles.galleryDouble :
    styles.gallerySingle

  return (
    <section id="home" className={`${styles.hero} ${hasGallery ? '' : styles.heroNoImage}`}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>

          <h1 className={styles.title}>
            <span>{t('hero.title.line1')}</span><br />
            <em>{t('hero.title.line2')}</em>
          </h1>

          <p className={styles.subtitle}>{t('hero.subtitle')}</p>

          <div className={styles.actions}>
            <a
              href={shopHref}
              className={styles.btnPrimary}
              target={isExternal(shopHref) ? '_blank' : undefined}
              rel={isExternal(shopHref) ? 'noopener noreferrer' : undefined}
            >
              {t('hero.cta.shop')}
            </a>
            <a href="#about" className={styles.btnGhost}>
              {t('hero.cta.story')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {hasGallery && (
          <figure className={styles.visual}>
            <div className={`${styles.gallery} ${galleryVariant}`}>
              {gallery.map((p, i) => (
                <a
                  key={p.id}
                  href={safeUrl(p.shopUrl ?? shopHref, shopHref)}
                  target={isExternal(p.shopUrl ?? shopHref) ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`${styles.tile} ${styles[`tile${i + 1}`]}`}
                  aria-label={p.name}
                >
                  <img
                    src={p.thumbnailUrl ?? p.imageUrl}
                    alt={p.name}
                    width={p.width}
                    height={p.height}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                </a>
              ))}
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.captionRule} aria-hidden="true" />
              <span>{tenant?.tagline ?? t('hero.eyebrow')}</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}
