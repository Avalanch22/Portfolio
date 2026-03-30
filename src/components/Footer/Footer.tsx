import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <Link href="/" className={styles.logo}>
          B.<span>DAS</span>
        </Link>
        <p className={styles.copyright}>
          &copy; {currentYear} Bishal Das. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
