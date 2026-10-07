import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import styles from "./OrderModal.module.css"

type OrderSelection = {
    serviceId: number
    title: string
    services: {
        id: number
        title: string
    }[]
}

type OrderModalProps = {
    service: OrderSelection | null
    onClose: () => void
}

function OrderModal({ service, onClose }: OrderModalProps) {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedServiceId, setSelectedServiceId] = useState(service?.serviceId ?? 0)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }
        if (!service) return
        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.body.style.overflow = ""
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [service, onClose])

    if (!service) return null

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const payload = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            company: String(formData.get("company") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            details: String(formData.get("details") ?? ""),
            serviceId: selectedServiceId,
        }

        setError(null)
        setIsSubmitting(true)
        void fetch("http://localhost:3000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const body = await response.json().catch(() => null) as { message?: string } | null
                    throw new Error(body?.message ?? `Request failed with status ${response.status}`)
                }
                setSubmitted(true)
            })
            .catch((requestError: unknown) => {
                setError(requestError instanceof Error ? requestError.message : "Unable to send enquiry")
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <div className={styles.backdrop} role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
        }}>
            <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="order-title">
                <button className={styles.close} type="button" onClick={onClose} aria-label="Close project enquiry">×</button>
                {submitted ? (
                    <div className={styles.success}>
                        <p className={styles.eyebrow}>Thank you</p>
                        <h2>We’ll be in touch<br /><span>very soon.</span></h2>
                        <p>Your enquiry is ready for our team. We will reply within one business day.</p>
                        <button className={styles.submit} type="button" onClick={onClose}>Back to the studio</button>
                    </div>
                ) : (
                    <>
                        <p className={styles.eyebrow}>Start a project</p>
                        <h2 id="order-title">Let’s make <span>it move.</span></h2>
                        <p className={styles.intro}>Tell us a little about your project and we’ll come back with the right next step.</p>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <label>Service
                                <select
                                    name="service"
                                    value={selectedServiceId}
                                    onChange={(event) => setSelectedServiceId(Number(event.target.value))}
                                    required
                                >
                                    {service.services.map((availableService) => (
                                        <option value={availableService.id} key={availableService.id}>
                                            {availableService.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className={styles.row}>
                                <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
                                <label>Company<input name="company" type="text" placeholder="Company (optional)" /></label>
                            </div>
                            <div className={styles.row}>
                                <label>Email<input name="email" type="email" placeholder="you@company.com" required /></label>
                                <label>Phone<input name="phone" type="tel" placeholder="+1 000 000 0000" required /></label>
                            </div>
                            <label>Project details<textarea name="details" placeholder="What are you hoping to create?" rows={4} required /></label>
                            {error && <p className={styles.error} role="alert">{error}</p>}
                            <button className={styles.submit} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send enquiry"} {!isSubmitting && <span aria-hidden="true">↗</span>}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderModal
