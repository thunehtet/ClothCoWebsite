import styles from './About.module.css'
import { useLanguage } from '../i18n/LanguageContext'
import { CloudIcon, MoonIcon } from './Icons'

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className={styles.section}>
      <CloudIcon className={`${styles.cloud} ${styles.cloud1}`} />
      <CloudIcon className={`${styles.cloud} ${styles.cloud2}`} />
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          <MoonIcon className={styles.eyebrowMark} />
          {t('about.eyebrow')}
        </p>
        <h2 className={styles.title}>{t('about.title')}</h2>
        <div className={styles.body}>
          <p>{t('about.body.p1')}</p>
          <p>{t('about.body.p2')}</p>
        </div>
        <p className={styles.signoff}>{t('about.signoff')}</p>
      </div>
    </section>
  )
}
