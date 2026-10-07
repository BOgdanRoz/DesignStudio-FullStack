import { useEffect, useRef, useState } from "react"
import styles from "./ServicesSection.module.css"

export type Service = {
    id: number
    position: number
    title: string
    description: string
    includes: string
    price: number
    timeline: string
}

export type ServiceSelection = {
    serviceId: number
    title: string
    services: Pick<Service, "id" | "title">[]
}

type ServiceDraft = Omit<Service, "id" | "position" | "price"> & {
    price: number | ""
}

const apiUrl = "http://localhost:3000/api/services"

const process = [
    ["01", "Brief", "We align on the goal, audience, references, and what success should look like."],
    ["02", "Explore", "We develop a small number of strong creative routes instead of endless variations."],
    ["03", "Make", "You see progress through clear milestones, from storyboard to polished animation."],
    ["04", "Deliver", "You receive the right formats, versions, and a system your team can actually use."],
]

const emptyDraft: ServiceDraft = {
    title: "",
    description: "",
    includes: "",
    price: "",
    timeline: "",
}

type ServicesSectionProps = {
    role: "client" | "owner"
    onOrder: (service: ServiceSelection) => void
}

function includesList(includes: string) {
    return includes
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean)
}

function formatPrice(price: number) {
    return `€${price.toLocaleString("en-US")}${Number.isInteger(price) ? "+" : ""}`
}

async function readError(response: Response) {
    const body = await response.json().catch(() => null) as { message?: string } | null
    return body?.message ?? `Request failed with status ${response.status}`
}

function ServicesSection({ role, onOrder }: ServicesSectionProps) {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [draft, setDraft] = useState<ServiceDraft>(emptyDraft)
    const [isAdding, setIsAdding] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)
    const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const showError = (message: string) => {
        setError(message)
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = setTimeout(() => setError(null), 5000)
    }

    const clearError = () => {
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = null
        setError(null)
    }

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) throw new Error(await readError(response))
                const data: unknown = await response.json()
                if (!Array.isArray(data)) throw new Error("Invalid services response")
                setServices(data as Service[])
            } catch (requestError) {
                showError(requestError instanceof Error ? requestError.message : "Unable to load services")
            } finally {
                setLoading(false)
            }
        }
        void loadServices()
    }, [])

    useEffect(() => {
        const target = editingId !== null || isAdding ? editorRef.current : sectionRef.current
        target?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [editingId, isAdding])

    const startEditing = (service: Service) => {
        setEditingId(service.id)
        setDraft({
            title: service.title,
            description: service.description,
            includes: service.includes,
            price: service.price,
            timeline: service.timeline,
        })
    }

    const saveService = async () => {
        if (!draft.title.trim() || !draft.description.trim()) return
        clearError()
        const payload = {
            ...draft,
            price: draft.price === "" ? 0 : draft.price,
            title: draft.title.trim(),
            description: draft.description.trim(),
        }
        try {
            const response = await fetch(editingId === null ? apiUrl : `${apiUrl}/${editingId}`, {
                method: editingId === null ? "POST" : "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!response.ok) throw new Error(await readError(response))
            const savedService = await response.json() as Service
            setServices((current) => editingId === null
                ? [...current, savedService]
                : current.map((service) => service.id === editingId ? savedService : service))
            setEditingId(null)
            setIsAdding(false)
        } catch (requestError) {
            showError(requestError instanceof Error ? requestError.message : "Unable to save service")
        }
    }

    const deleteService = async (id: number) => {
        clearError()
        try {
            const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" })
            if (!response.ok) throw new Error(await readError(response))
            setServices((current) => current.filter((service) => service.id !== id))
        } catch (requestError) {
            showError(requestError instanceof Error ? requestError.message : "Unable to delete service")
        }
    }

    const updateDraft = (field: keyof ServiceDraft, value: string) => {
        setDraft((current) => ({
            ...current,
            [field]: field === "price" ? (value === "" ? "" : Number(value)) : value,
        }))
    }

    return (
        <section className={styles.section} id="services" ref={sectionRef}>
            {error && (
                <div className={styles.errorToast} role="alert">
                    <span className={styles.errorIcon} aria-hidden="true">!</span>
                    <div>
                        <strong>Something went wrong</strong>
                        <p>{error}</p>
                    </div>
                    <button type="button" onClick={clearError} aria-label="Dismiss error">×</button>
                </div>
            )}
            <div className={styles.intro}>
                <div>
                    <p className={styles.eyebrow}>Services / Motion design</p>
                    <h2>Choose your<br /><span>starting point.</span></h2>
                </div>
                <div className={styles.introCopy}>
                    <p>Every project starts with a clear purpose. Pick a focused package below, or bring us a bigger brief and we will build the right team around it.</p>
                    <span className={styles.availability}><i /> Currently booking projects for Q2 2026</span>
                </div>
            </div>

            {loading && <p className={styles.introCopy}>Loading services...</p>}
            <div className={styles.serviceGrid}>
                {services.map((service) => (
                    <article className={`${styles.card} ${service.position === 2 ? styles.featured : ""}`} key={service.id}>
                        <div className={styles.cardTop}>
                            <span className={styles.number}>{String(service.position).padStart(2, "0")}</span>
                            <span className={styles.type}>Motion design service</span>
                            {service.position === 2 && <span className={styles.badge}>Most popular</span>}
                        </div>
                        <div className={styles.cardBody}>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul>{includesList(service.includes).map((item) => <li key={item}>{item}</li>)}</ul>
                        </div>
                        <div className={styles.cardBottom}>
                            <div><strong>{formatPrice(service.price)}</strong><span>{service.timeline}</span></div>
                            {role === "client" ? (
                                <button type="button" onClick={() => onOrder({
                                    serviceId: service.id,
                                    title: service.title,
                                    services: services.map(({ id, title }) => ({ id, title })),
                                })}>Request a quote <span aria-hidden="true">↗</span></button>
                            ) : (
                                <div className={styles.ownerActions}>
                                    <button type="button" onClick={() => startEditing(service)}>Edit</button>
                                    <button type="button" onClick={() => void deleteService(service.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {role === "owner" && (
                <div className={styles.ownerPanel}>
                    <p className={styles.eyebrow}>Owner controls</p>
                    <h3>Manage your services.</h3>
                    <p>Edit prices, descriptions, deliverables, or add a new service.</p>
                    <button type="button" onClick={() => { setDraft(emptyDraft); setEditingId(null); setIsAdding(true) }}>Add service <span aria-hidden="true">+</span></button>
                </div>
            )}

            {role === "client" && <div className={styles.custom}>
                <div className={styles.customGraphic} aria-hidden="true"><span /><span /><span /></div>
                <div>
                    <p className={styles.eyebrow}>Need something more specific?</p>
                    <h3>Have a brief that does not fit a box?</h3>
                    <p>Campaign systems, title sequences, event visuals, product explainers, and everything in between. Tell us what you are trying to move.</p>
                </div>
                <button
                    type="button"
                    disabled={!services.length}
                    onClick={() => {
                        const firstService = services[0]
                        if (firstService) onOrder({
                            serviceId: firstService.id,
                            title: firstService.title,
                            services: services.map(({ id, title }) => ({ id, title })),
                        })
                    }}
                >Talk through your brief <span aria-hidden="true">↗</span></button>
            </div>}

            {role === "owner" && (editingId !== null || isAdding) && (
                <div className={styles.editor} ref={editorRef}>
                    <p className={styles.eyebrow}>{editingId !== null ? "Edit service" : "New service"}</p>
                    <div className={styles.editorGrid}>
                        <label>Title<input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} /></label>
                        <label>Price<input type="number" value={draft.price} onChange={(event) => updateDraft("price", event.target.value)} /></label>
                        <label>Timeline<input value={draft.timeline} onChange={(event) => updateDraft("timeline", event.target.value)} /></label>
                        <label className={styles.editorWide}>Description<textarea value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} rows={3} /></label>
                        <label className={styles.editorWide}>Includes <span className={styles.hint}>separate with commas</span><input value={draft.includes} onChange={(event) => updateDraft("includes", event.target.value)} /></label>
                    </div>
                    <div className={styles.editorActions}>
                        <button type="button" onClick={() => void saveService()}>Save service</button>
                        <button type="button" onClick={() => { setEditingId(null); setIsAdding(false) }}>Cancel</button>
                    </div>
                </div>
            )}

            <div className={styles.process}>
                <div className={styles.processHeading}><p className={styles.eyebrow}>The process</p><h3>Clear steps.<br /><span>No mystery.</span></h3></div>
                <div className={styles.processList}>{process.map(([number, title, description]) => <div className={styles.processItem} key={number}><span>{number}</span><h4>{title}</h4><p>{description}</p></div>)}</div>
            </div>
        </section>
    )
}

export default ServicesSection
