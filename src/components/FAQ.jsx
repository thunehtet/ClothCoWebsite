import styles from './FAQ.module.css'
import { useLanguage } from '../i18n/LanguageContext'

const QUESTIONS = ['ordering', 'delivery', 'payment', 'fabric']

export default function FAQ() {
  const { t } = useLanguage()

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t('faq.eyebrow')}</p>
          <h2 id="faq-title" className={styles.title}>
            {t('faq.title')}
          </h2>
        </header>

        <div className={styles.list}>
          {QUESTIONS.map((item, index) => (
            <details key={item} className={styles.item} open={index === 0}>
              <summary className={styles.question}>
                <span>{t(`faq.${item}.q`)}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{t(`faq.${item}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
