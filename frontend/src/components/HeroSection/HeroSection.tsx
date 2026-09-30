import styles from "./HeroSection.module.css"

function HeroSection() {
    return (
        <main className={styles.hero}>
            <div className={styles.artwork} aria-hidden="true">
                <span className={styles.orbit}>
                    <span className={styles.orbitDot} />
                </span>
                <span className={styles.mark}>
                    <span className={styles.play} />
                    <span className={styles.pause}>
                        <span />
                        <span />
                    </span>
                </span>
                <span className={styles.spark} />
                <span className={styles.motionLines}>
                    <span />
                    <span />
                    <span />
                </span>
                <span className={styles.frameSequence}>
                    <span />
                    <span />
                    <span />
                </span>
                <span className={styles.artworkLabel}>
                    <span>01 / MOTION</span>
                    <span>Identity in motion</span>
                </span>
            </div>
            <div className={styles.content}>
                <p className={styles.eyebrow}>
                    <span className={styles.eyebrowDot} aria-hidden="true" />
                    Independent creative studio
                </p>
                <h1 className={styles.title}>
                    We turn ideas into <span className={styles.highlight}>real projects.</span>
                </h1>
                <p className={styles.description}>
                    We create distinctive brand identities, digital experiences, and visuals that make businesses stand out.
                </p>
                <a className={styles.callToAction} href="#services">
                    Get in touch
                    <span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
            </div>
        </main>
    )
}

export default HeroSection