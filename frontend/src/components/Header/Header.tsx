
import styles from "./Header.module.css"

type HeaderProps = {
    onChangeRole: () => void
}

function Header({ onChangeRole }: HeaderProps) {
    return (
        <header className={styles.header}>
            <a className={styles.brand} href="#top" aria-label="Design Studio — back to page top">
                DESIGN STUDIO
            </a>

            <nav className={styles.navigation} aria-label="Main navigation">
                <a className={styles.link} href="#services">Services</a>
                <a className={styles.link} href="#portfolio">Portfolio</a>
                <a className={styles.link} href="#about">About</a>
                <a className={styles.link} href="#contact">Contact</a>
            </nav>

            <button className={styles.changeRole} type="button" onClick={onChangeRole}>
                Change role
            </button>
        </header>
    )
}

export default Header