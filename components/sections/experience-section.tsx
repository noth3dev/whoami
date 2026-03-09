import { useEffect, useState } from "react"
import { Job } from "@/types"
import { getExperiences } from "@/lib/data-service"

interface ExperienceSectionProps {
    sectionRef: (el: HTMLElement | null) => void
}

export default function ExperienceSection({ sectionRef }: ExperienceSectionProps) {
    const [expandedJob, setExpandedJob] = useState<number | null>(null)
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await getExperiences()
                if (data && data.length > 0) {
                    setJobs(data)
                }
            } catch (error) {
                console.error("Error fetching jobs:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    return (
        <section
            id="work"
            ref={sectionRef}
            className="min-h-screen py-20 sm:py-32 opacity-0"
        >
            <div className="space-y-12 sm:space-y-16">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <h2 className="text-3xl sm:text-4xl font-light relative">
                        Past Experience
                        <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
                    </h2>
                    <div className="text-sm text-muted-foreground font-mono">2019 — 2025</div>
                </div>

                <div className="space-y-8 sm:space-y-12">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Loading experience...</p>
                        </div>
                    ) : (
                        jobs.map((job, index) => (
                            <div
                                key={index}
                                className={`group relative rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden ${expandedJob === index
                                    ? "border-foreground/30 shadow-xl shadow-foreground/10"
                                    : "border-border/50 hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1"
                                    }`}
                                onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                            >
                                <div className={`absolute inset-0 bg-foreground/[0.02] transition-opacity duration-500 ${expandedJob === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    }`}></div>

                                <div className="relative z-10 py-6 sm:py-8 px-4 sm:px-6">
                                    <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
                                        <div className="lg:col-span-2">
                                            <div className="text-xl sm:text-2xl font-mono font-light text-muted-foreground group-hover:text-foreground transition-all duration-500">
                                                {job.year}
                                            </div>
                                        </div>

                                        <div className="lg:col-span-10 space-y-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-foreground transition-colors duration-300">{job.role}</h3>
                                                    <div className="text-muted-foreground">{job.company}</div>
                                                </div>
                                                <div className="text-muted-foreground mt-1">
                                                    <svg
                                                        className={`w-5 h-5 transition-transform duration-500 ${expandedJob === index ? "rotate-180" : ""}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <div className={`overflow-hidden transition-all duration-500 ${expandedJob === index ? "max-h-96 opacity-100 mt-6 pt-6 border-t border-border/30" : "max-h-0 opacity-0"
                                        }`}>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-mono text-muted-foreground mb-3">Duration</h4>
                                                <p className="text-muted-foreground">{job.duration}</p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-mono text-muted-foreground mb-3">Details</h4>
                                                <p className="text-muted-foreground leading-relaxed">{job.details}</p>
                                            </div>

                                            {job.achievements.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-mono text-muted-foreground mb-3">Key Achievements</h4>
                                                    <ul className="space-y-2">
                                                        {job.achievements.map((achievement, idx) => (
                                                            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                                                <span className="text-foreground mt-1">→</span>
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
