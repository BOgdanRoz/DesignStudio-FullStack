import styles from "./RoleSelection.module.css"
import { useState } from "react"

export type Role = "client" | "owner"

type RoleSelectionProps = {
    onSelect: (role: Role) => void
}

function RoleSelection({ onSelect }: RoleSelectionProps) {
    const [isConnecting, setIsConnecting] = useState(false)
    const [telegramError, setTelegramError] = useState<string | null>(null)

    const connectTelegram = async () => {
        setTelegramError(null)
        setIsConnecting(true)
        try {
            const response = await fetch("http://localhost:3000/api/telegram/connect")
            if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
            const data = await response.json() as { telegramLink?: string }
            if (!data.telegramLink) throw new Error("Telegram connection link is unavailable")
            window.open(data.telegramLink, "_blank", "noopener,noreferrer")
        } catch (error) {
            setTelegramError(error instanceof Error ? error.message : "Unable to connect Telegram")
        } finally {
            setIsConnecting(false)
        }
    }

    return (
        <main className={styles.screen}>
            <div className={styles.topLine}>
                <span className={styles.brand}>DESIGN STUDIO</span>
                <span className={styles.index}>00 / 01</span>
            </div>

            <div className={styles.layout}>
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
                                <strong>Client</strong>
                                <small>I have a project in mind</small>
                            </span>
                            <span className={styles.arrow} aria-hidden="true">↗</span>
                        </button>
                        <button className={styles.option} type="button" onClick={() => onSelect("owner")}>
                            <span className={styles.optionNumber}>02</span>
                            <span className={styles.optionText}>
                                <strong>Owner</strong>
                                <small>I’m here to explore</small>
                            </span>
                            <span className={styles.arrow} aria-hidden="true">↗</span>
                        </button>
                    </div>
                </div>

                <section className={styles.guide} aria-labelledby="testing-guide-title">
                    <p className={styles.guideEyebrow}>Testing Guide</p>
                    <h2 id="testing-guide-title">How to test the demo</h2>
                    <div className={styles.guideColumns}>
                        <div>
                            <h3>Client flow</h3>
                            <ol>
                                <li>Choose Client and open Services.</li>
                                <li>Confirm services load from <code>GET /api/services</code>.</li>
                                <li>Click Request a quote and verify the selected service.</li>
                                <li>Change the service in the select, fill the form with test data, and submit.</li>
                                <li>The frontend sends <code>POST /api/orders</code> with the selected <code>serviceId</code>.</li>
                                <li>Check the success state and the created order.</li>
                            </ol>
                        </div>
                        <div>
                            <h3>Owner flow</h3>
                            <ol>
                                <li>Return here and choose Owner.</li>
                                <li>Create a service. The frontend sends <code>POST /api/services</code>.</li>
                                <li>Check the new service, then edit it via <code>PATCH /api/services/:id</code>.</li>
                                <li>Switch to Client and order that service.</li>
                                <li>Return as Owner and try deleting it via <code>DELETE /api/services/:id</code>.</li>
                                <li>It must be protected because an order references it.</li>
                            </ol>
                        </div>
                    </div>
                    <div className={styles.telegramGuide}>
                        <h3>Telegram</h3>
                        <p>Connect Telegram first so the backend can save the Owner chat connection before any order is created. Then new orders can be delivered to Telegram automatically.</p>
                        <button className={styles.connectTelegram} type="button" onClick={() => void connectTelegram()} disabled={isConnecting}>
                            <svg className={styles.telegramIcon} viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M21.5 3.7 18.2 20c-.25 1.15-.9 1.43-1.82.9l-5-3.69-2.42 2.33c-.27.27-.5.5-1.03.5l.37-5.1 9.28-8.38c.4-.37-.09-.58-.62-.21L5.5 13.7.57 12.16c-1.07-.34-1.09-1.08.22-1.6L20.05 3.1c.88-.33 1.65.2 1.45.6Z" />
                            </svg>
                            {isConnecting ? "Connecting..." : "Connect Telegram"}
                        </button>
                        {telegramError && <p className={styles.telegramError} role="alert">{telegramError}</p>}
                    </div>
                    <div className={styles.recommended}>
                        <h3>Recommended test order</h3>
                        <p>Owner connects Telegram first → Owner creates a service → Client opens Services → Client changes the selected service in the order form → Client creates an order → Owner checks the Telegram notification.</p>
                    </div>
                    <div className={styles.securityNotice}>
                        <strong>Safety note</strong>
                        <p>This is an educational pet project. Use fake test data only. Do not enter real passwords, payment details, or sensitive personal information.</p>
                    </div>
                </section>
            </div>

        </main>
    )
}

export default RoleSelection
