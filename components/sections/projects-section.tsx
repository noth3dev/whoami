"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Project } from "@/types"

import { getProjects } from "@/lib/data-service"

interface ProjectsSectionProps {
    sectionRef: (el: HTMLElement | null) => void
}

export default function ProjectsSection({ sectionRef }: ProjectsSectionProps) {
    const [projects, setProjects] = useState<Project[]>([])
    const [loadingProjects, setLoadingProjects] = useState(true)

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects(3)
                if (data && data.length > 0) {
                    setProjects(data)
                }
            } catch (error) {
                console.error("Error fetching projects:", error)
            } finally {
                setLoadingProjects(false)
            }
        }

        fetchProjects()
    }, [])

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen py-20 sm:py-32 opacity-0"
        >
            <div className="space-y-12 sm:space-y-16">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <h2 className="text-3xl sm:text-4xl font-light relative">
                        Recent Projects
                        <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
                    </h2>
                    <Link
                        href="/project"
                        className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        View all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid gap-8 sm:gap-10">
                    {loadingProjects ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Loading projects...</p>
                        </div>
                    ) : projects.length > 0 ? (
                        projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/project/${project.id}`}
                                className="group no-underline"
                            >
                                <article
                                    className="group relative grid lg:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8 border border-border rounded-2xl hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/10 cursor-pointer overflow-hidden hover:-translate-y-2"
                                >
                                    <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="lg:col-span-2 relative z-10 flex flex-col gap-2">
                                        <div className="text-2xl font-mono font-light text-muted-foreground group-hover:text-foreground transition-all duration-500">
                                            {project.year}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${project.featured ? "bg-foreground" : "bg-foreground/50"}`}></div>
                                            <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-10 space-y-4 relative z-10">
                                        <div className="space-y-2">
                                            <h3 className="text-xl sm:text-2xl font-medium group-hover:text-foreground transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {project.tags && project.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 text-xs font-mono text-muted-foreground border border-border rounded-full group-hover:border-foreground/20 transition-all duration-500"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-mono pt-2">
                                            <span>View details</span>
                                            <svg
                                                className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No projects available.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
