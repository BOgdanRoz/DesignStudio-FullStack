import styles from "./AboutSection.module.css"

function AboutSection() {
    return (
        <section className={styles.section} id="about">
            <div className={styles.intro}>
                <p className={styles.eyebrow}>About Design Studio</p>
                <h2>We make brands feel alive through <span>movement.</span></h2>
            </div>
            <div className={styles.copy}>
                <p>
                    Design Studio is an independent motion practice for brands, products, and people
                    with something worth saying. We turn strategy into visual systems that move,
                    respond, and stay in people’s minds.
                </p>
                <p>
                    From a single logo reveal to a complete campaign film, we stay close from the
                    first frame to final delivery. Small team, senior attention, no unnecessary layers.
                </p>
                <div className={styles.details}>
                    <span>Based in Europe</span>
                    <span>Remote by default</span>
                    <span>2D / 3D / VFX</span>
                </div>
            </div>
            <div className={styles.teamBlock}>
                <div>
                    <p className={styles.eyebrow}>The people behind the frames</p>
                    <h3>A compact senior team, built for <span>big ideas.</span></h3>
                </div>
                <div className={styles.team}>
                    <article><strong>Anna Keller</strong><span>Creative director</span></article>
                    <article><strong>Leo Martins</strong><span>Motion designer / 3D</span></article>
                    <article><strong>Nora Chen</strong><span>Producer &amp; client partner</span></article>
                    <article><strong>Owen Price</strong><span>Sound &amp; post-production</span></article>
                </div>
            </div>
            <div className={styles.case}>
                <div className={styles.caseVisual}>
                    <span>CASE / 07</span>
                    <strong>Northstar</strong>
                    <small>Move with purpose</small>
                </div>
                <div className={styles.caseCopy}>
                    <p className={styles.eyebrow}>How we work</p>
                    <h3>One team from the first sketch to the final <span>frame.</span></h3>
                    <p>For Northstar, our team translated a new identity into a launch film, six social cutdowns, and a modular motion toolkit. Strategy, storyboarding, animation, sound, and delivery were handled in one focused six-week sprint.</p>
                    <div className={styles.steps}><span>01 / Discover</span><span>02 / Design</span><span>03 / Deliver</span></div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection