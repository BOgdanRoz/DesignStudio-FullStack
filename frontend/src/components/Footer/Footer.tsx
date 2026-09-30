import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.main}>
                <div className={styles.studio}>
                    <a className={styles.brand} href="#top">DESIGN STUDIO<span>.</span></a>
                    <p>Independent motion studio making brands, products, and ideas move with purpose.</p>
                    <a className={styles.email} href="mailto:hello@designstudio.com">hello@designstudio.com</a>
                </div>
                <div className={styles.column}>
                    <h2>Explore</h2>
                    <a href="#services">Services</a>
                    <a href="#portfolio">Selected work</a>
                    <a href="#about">About the studio</a>
                    <a href="#contact">Start a project</a>
                </div>
                <div className={styles.column}>
                    <h2>What we make</h2>
                    <span>Logo motion</span>
                    <span>Brand films</span>
                    <span>Social motion systems</span>
                    <span>3D &amp; visual effects</span>
                </div>
                <div className={styles.column}>
                    <h2>Studio</h2>
                    <span>Based in Europe</span>
                    <span>Working worldwide</span>
                    <span>Available for select projects</span>
                </div>
            </div>
            <div className={styles.bottom}>
                <span>© {new Date().getFullYear()} Design Studio. All rights reserved.</span>
                <span>Independent by nature. Collaborative by design.</span>
            </div>
        </footer>
    )
}

export default Footer
