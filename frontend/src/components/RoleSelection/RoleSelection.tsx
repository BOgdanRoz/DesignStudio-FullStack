import styles from "./RoleSelection.module.css"

export type Role = "client" | "owner"

type RoleSelectionProps = {
    onSelect: (role: Role) => void
}

function RoleSelection({ onSelect }: RoleSelectionProps) {
    return (
        <main className={styles.screen}>
            <div className={styles.topLine}>
                <span className={styles.brand}>DESIGN STUDIO</span>
                <span className={styles.index}>00 / 01</span>
            </div>

            <div className={styles.content}>
                <p className={styles.eyebrow}>Before we begin</p>
                <h1 className={styles.title}>
                    Tell us who <span>you are.</span>
                </h1>
                <p className={styles.description}>
                    We will show you the right way into our world of motion and design.
                </p>

                <div className={styles.options}>
                    <button className={styles.option} type="button" onClick={() => onSelect("client")}>
                        <span className={styles.optionNumber}>01</span>
                        <span className={styles.optionText}>
                            <strong>I’m a client</strong>
                            <small>I have a project in mind</small>
                        </span>
                        <span className={styles.arrow} aria-hidden="true">↗</span>
                    </button>
                    <button className={styles.option} type="button" onClick={() => onSelect("owner")}>
                        <span className={styles.optionNumber}>02</span>
                        <span className={styles.optionText}>
                            <strong>I’m an Owner</strong>
                            <small>I’m here to explore</small>
                        </span>
                        <span className={styles.arrow} aria-hidden="true">↗</span>
                    </button>
                </div>
            </div>

            <div className={styles.shape} aria-hidden="true">
                <span />
            </div>
        </main>
    )
}

export default RoleSelection
