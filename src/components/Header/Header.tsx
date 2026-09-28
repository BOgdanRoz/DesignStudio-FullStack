
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={styles.header}>
            <h2 className={styles.brand}>DESIGN STUDIO</h2>

            <nav className={styles.navigation} aria-label="Main navigation">
                <a className={styles.link} href="#services">Services</a>
                <a className={styles.link} href="#portfolio">Portfolio</a>
                <a className={styles.link} href="#about">About</a>
                <a className={styles.link} href="#contact">Contact</a>
            </nav>
        </header>
    )
}

export default Header