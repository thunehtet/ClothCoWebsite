import styles from './About.module.css'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{t('about.eyebrow')}</p>
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
