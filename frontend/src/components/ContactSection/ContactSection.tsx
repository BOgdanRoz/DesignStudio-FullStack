import styles from "./ContactSection.module.css"

function ContactSection({ onOrder }: { onOrder: () => void }) {
    return (
        <section className={styles.section} id="contact">
            <p className={styles.eyebrow}>Have a project in mind?</p>
            <h2>Let’s make<br /><span>something real.</span></h2>
            <button className={styles.email} type="button" onClick={onOrder}>
                Start a project <span aria-hidden="true">↗</span>
            </button>
        </section>
    )
}

export default ContactSection
