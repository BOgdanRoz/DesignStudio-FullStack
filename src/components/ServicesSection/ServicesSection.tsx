import styles from "./ServicesSection.module.css"

type Service = {
    number: string
    type: string
    title: string
    description: string
    price: string
    timeline: string
    deliverables: string[]
    featured?: boolean
}

const services: Service[] = [
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

function ServicesSection({ onOrder }: { onOrder: (service: string) => void }) {
    return (
        <section className={styles.section} id="services">
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
                            <button type="button" onClick={() => onOrder(service.title)}>Request a quote <span aria-hidden="true">↗</span></button>
                        </div>
                    </article>
                ))}
            </div>

            <div className={styles.custom}>
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
            </div>

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
