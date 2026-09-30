import styles from "./PortfolioSection.module.css"

type Project = {
    number: string
    category: string
    title: string
    description: string
    discipline: string
    image: string
    client: string
    result: string
    year: string
}

const projects: Project[] = [
    {
        number: "01",
        category: "Brand film / Campaign",
        title: "Northstar — Move with purpose",
        description: "A complete motion identity for a next-generation mobility company. We turned their new brand idea into a film that moves with confidence.",
        discipline: "Art direction · 2D / 3D motion · Sound",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85",
        client: "Northstar Mobility",
        result: "Film + 6 social cutdowns",
        year: "2025",
    },
    {
        number: "02",
        category: "Product launch / Social",
        title: "Morrow — Made for now",
        description: "A tactile launch system for a skincare brand. Hundreds of short loops made one simple promise feel fresh in every format.",
        discipline: "Art direction · 2D animation · Compositing",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1600&q=85",
        client: "Morrow Skin",
        result: "42 assets · 3 platforms",
        year: "2025",
    },
    {
        number: "03",
        category: "Title sequence / 3D",
        title: "Afterlight — In between",
        description: "A cinematic title sequence exploring the quiet tension between stillness and movement for an independent film release.",
        discipline: "3D design · Simulation · Colour grade",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85",
        client: "Afterlight Films",
        result: "90-second title sequence",
        year: "2024",
    },
]

function PortfolioSection() {
    return (
        <section className={styles.section} id="portfolio">
            <div className={styles.intro}>
                <div>
                    <p className={styles.eyebrow}>Selected work / 2024—25</p>
                    <h2>Work that gives<br /><span>ideas momentum.</span></h2>
                </div>
                <p className={styles.introCopy}>
                    We build motion systems, not one-off decoration. Every frame has a job:
                    explain, attract, or make a brand impossible to forget.
                </p>
            </div>

            <div className={styles.stats}>
                <div><strong>28</strong><span>projects delivered</span></div>
                <div><strong>11</strong><span>countries reached</span></div>
                <div><strong>04</strong><span>specialist disciplines</span></div>
                <div><strong>100%</strong><span>senior-led work</span></div>
            </div>

            <div className={styles.projects}>
                {projects.map((project) => (
                    <article className={styles.project} key={project.number}>
                        <div className={`${styles.visual} ${styles[`visual${project.number}`]}`}>
                            <img src={project.image} alt={`${project.title} visual`} />
                            <div className={styles.visualShade} />
                            <div className={styles.visualGrid} aria-hidden="true" />
                            <span className={styles.projectNumber}>{project.number}</span>
                            <span className={styles.play} aria-hidden="true">↗</span>
                            <div className={styles.visualCaption}>
                                <span>{project.category}</span>
                                <span>View case study</span>
                            </div>
                            <div className={styles.orbitGraphic} aria-hidden="true" />
                        </div>
                        <div className={styles.projectInfo}>
                            <div className={styles.projectTitle}>
                                <p className={styles.label}>{project.category}</p>
                                <h3>{project.title}</h3>
                            </div>
                            <p className={styles.description}>{project.description}</p>
                            <div className={styles.projectMeta}>
                                <span><small>Client</small>{project.client}</span>
                                <span><small>Scope</small>{project.discipline}</span>
                                <span><small>Output</small>{project.result}</span>
                                <span><small>Year</small>{project.year}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className={styles.bottomNote}>
                <span>More work is available on request</span>
                <a href="#contact">Ask for our full reel <span aria-hidden="true">↗</span></a>
            </div>
        </section>
    )
}

export default PortfolioSection
