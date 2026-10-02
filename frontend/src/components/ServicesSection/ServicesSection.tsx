import { useEffect, useRef, useState } from "react"
import styles from "./ServicesSection.module.css"

export type Service = {
    number: string
    type: string
    title: string
    description: string
    price: string
    timeline: string
    deliverables: string[]
    featured?: boolean
}

const initialServices: Service[] = [
    {
        number: "01",
        type: "For brands with a mark",
        title: "Logo motion",
        description: "Give your logo a signature entrance, exit, and behavior system that works everywhere your brand appears.",
        price: "€650+",
        timeline: "1–2 weeks",
        deliverables: ["2 creative directions", "Logo reveal + outro", "4K master & social exports"],
    },
    {
        number: "02",
        type: "For brands building a presence",
        title: "Social motion kit",
        description: "A flexible set of loops and templates that makes your content feel consistent, alive, and ready to publish.",
        price: "€1,400+",
        timeline: "2–3 weeks",
        deliverables: ["6 custom motion assets", "Vertical, square & landscape", "Editable delivery system"],
        featured: true,
    },
    {
        number: "03",
        type: "For launches worth remembering",
        title: "Brand film",
        description: "A complete visual story for a launch, product, or campaign — from the first storyboard frame to final sound mix.",
        price: "€3,200+",
        timeline: "4–6 weeks",
        deliverables: ["Concept & storyboard", "15–60 second master film", "Cutdowns for social"],
    },
    {
        number: "04",
        type: "For products that need depth",
        title: "3D & visual effects",
        description: "Art-directed 3D scenes, simulations, and compositing for products and ideas that deserve a more tactile point of view.",
        price: "€2,400+",
        timeline: "3–5 weeks",
        deliverables: ["Look development", "3D scene & animation", "Compositing and grade"],
    },
]

const process = [
    ["01", "Brief", "We align on the goal, audience, references, and what success should look like."],
    ["02", "Explore", "We develop a small number of strong creative routes instead of endless variations."],
    ["03", "Make", "You see progress through clear milestones, from storyboard to polished animation."],
    ["04", "Deliver", "You receive the right formats, versions, and a system your team can actually use."],
]

type ServicesSectionProps = {
    role: "client" | "owner"
    onOrder: (service: string) => void
}

const emptyService: Service = {
    number: "",
    type: "",
    title: "",
    description: "",
    price: "",
    timeline: "",
    deliverables: [],
}

const servicesStorageKey = "design-studio-services"

function isService(value: unknown): value is Service {
    if (!value || typeof value !== "object") return false
    const service = value as Partial<Service>
    return typeof service.number === "string"
        && typeof service.type === "string"
        && typeof service.title === "string"
        && typeof service.description === "string"
        && typeof service.price === "string"
        && typeof service.timeline === "string"
        && Array.isArray(service.deliverables)
        && service.deliverables.every((item) => typeof item === "string")
}

function loadServices(): Service[] {
    const storedServices = localStorage.getItem(servicesStorageKey)
    if (!storedServices) return initialServices

    try {
        const parsedServices: unknown = JSON.parse(storedServices)
        if (Array.isArray(parsedServices) && parsedServices.every(isService)) return parsedServices
    } catch (error) {
        console.error("Unable to load saved services.", error)
    }

    return initialServices
}

function ServicesSection({ role, onOrder }: ServicesSectionProps) {
    const [services, setServices] = useState(loadServices)
    const [editingNumber, setEditingNumber] = useState<string | null>(null)
    const [draft, setDraft] = useState<Service>(emptyService)
    const [isAdding, setIsAdding] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const target = editingNumber || isAdding ? editorRef.current : sectionRef.current
        target?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [editingNumber, isAdding])

    useEffect(() => {
        try {
            localStorage.setItem(servicesStorageKey, JSON.stringify(services))
        } catch (error) {
            console.error("Unable to save services.", error)
        }
    }, [services])

    const startEditing = (service: Service) => {
        setEditingNumber(service.number)
        setDraft({ ...service, deliverables: [...service.deliverables] })
    }

    const saveService = () => {
        if (!draft.title.trim() || !draft.description.trim()) return
        const nextService = {
            ...draft,
            title: draft.title.trim(),
            description: draft.description.trim(),
            deliverables: draft.deliverables.filter(Boolean),
        }
        setServices((current) => editingNumber
            ? current.map((service) => service.number === editingNumber ? nextService : service)
            : [...current, { ...nextService, number: String(current.length + 1).padStart(2, "0") }])
        setEditingNumber(null)
        setIsAdding(false)
    }

    const deleteService = (number: string) => {
        setServices((current) => current.filter((service) => service.number !== number))
    }

    const updateDraft = (field: keyof Service, value: string) => {
        setDraft((current) => ({ ...current, [field]: value }))
    }

    return (
        <section className={styles.section} id="services" ref={sectionRef}>
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

            <div className={styles.serviceGrid}>
                {services.map((service) => (
                    <article className={`${styles.card} ${service.featured ? styles.featured : ""}`} key={service.number}>
                        <div className={styles.cardTop}>
                            <span className={styles.number}>{service.number}</span>
                            <span className={styles.type}>{service.type}</span>
                            {service.featured && <span className={styles.badge}>Most popular</span>}
                        </div>
                        <div className={styles.cardBody}>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul>
                                {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                            </ul>
                        </div>
                        <div className={styles.cardBottom}>
                            <div><strong>{service.price}</strong><span>{service.timeline}</span></div>
                            {role === "client" ? (
                                <button type="button" onClick={() => onOrder(service.title)}>Request a quote <span aria-hidden="true">↗</span></button>
                            ) : (
                                <div className={styles.ownerActions}>
                                    <button type="button" onClick={() => startEditing(service)}>Edit</button>
                                    <button type="button" onClick={() => deleteService(service.number)}>Delete</button>
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
                    <button type="button" onClick={() => {
                        setDraft({ ...emptyService })
                        setEditingNumber(null)
                        setIsAdding(true)
                    }}>Add service <span aria-hidden="true">+</span></button>
                </div>
            )}

            {role === "client" && <div className={styles.custom}>
                <div className={styles.customGraphic} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <div>
                    <p className={styles.eyebrow}>Need something more specific?</p>
                    <h3>Have a brief that does not fit a box?</h3>
                    <p>Campaign systems, title sequences, event visuals, product explainers, and everything in between. Tell us what you are trying to move.</p>
                </div>
                <button type="button" onClick={() => onOrder("Custom motion project")}>Talk through your brief <span aria-hidden="true">↗</span></button>
            </div>}

            {role === "owner" && (editingNumber || isAdding) && (
                <div className={styles.editor} ref={editorRef}>
                    <p className={styles.eyebrow}>{editingNumber ? "Edit service" : "New service"}</p>
                    <div className={styles.editorGrid}>
                        <label>Title<input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} /></label>
                        <label>Type<input value={draft.type} onChange={(event) => updateDraft("type", event.target.value)} /></label>
                        <label>Price<input value={draft.price} onChange={(event) => updateDraft("price", event.target.value)} /></label>
                        <label>Timeline<input value={draft.timeline} onChange={(event) => updateDraft("timeline", event.target.value)} /></label>
                        <label className={styles.editorWide}>Description<textarea value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} rows={3} /></label>
                        <label className={styles.editorWide}>Deliverables <span className={styles.hint}>separate with commas</span><input value={draft.deliverables.join(", ")} onChange={(event) => setDraft((current) => ({ ...current, deliverables: event.target.value.split(",").map((item) => item.trim()) }))} /></label>
                        <label className={styles.featuredToggle}>
                            <input type="checkbox" checked={draft.featured ?? false} onChange={(event) => setDraft((current) => ({ ...current, featured: event.target.checked }))} />
                            Mark as most popular
                        </label>
                    </div>
                    <div className={styles.editorActions}>
                        <button type="button" onClick={saveService}>Save service</button>
                        <button type="button" onClick={() => { setEditingNumber(null); setIsAdding(false) }}>Cancel</button>
                    </div>
                </div>
            )}

            <div className={styles.process}>
                <div className={styles.processHeading}>
                    <p className={styles.eyebrow}>The process</p>
                    <h3>Clear steps.<br /><span>No mystery.</span></h3>
                </div>
                <div className={styles.processList}>
                    {process.map(([number, title, description]) => (
                        <div className={styles.processItem} key={number}>
                            <span>{number}</span>
                            <h4>{title}</h4>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection
