"use client"

import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import TagFilter from "@/components/tag-filter"
import { useState, useMemo, useEffect } from "react"
import { Project } from "@/types"
import { getProjects } from "@/lib/data-service"

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects()
                if (data && data.length > 0) {
                    setProjects(data)
                }
            } catch (error) {
                console.error("Error loading projects:", error)
            } finally {
                setLoading(false)
            }
        }

        loadProjects()
    }, [])

    // Get all unique tags
    const allTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])))

    // Filter projects by selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return projects
        return projects.filter((p) =>
            selectedTags.every((tag) => p.tags?.includes(tag))
        )
    }, [selectedTags, projects])

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
                <Navigation />
                <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8 text-center text-muted-foreground">
                    Loading projects...
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Navigation />
            <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
                <div className="space-y-6 mb-16">
                    <h1 className="text-5xl sm:text-6xl font-light tracking-tight">Projects</h1>
                    <TagFilter items={allTags} onSelectionChange={setSelectedTags} />
                </div>

                <div className="grid gap-8">
                    {filteredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/project/${project.id}`}
                            className="group block p-6 border border-border rounded-xl hover:border-foreground/20 transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-medium">{project.title}</h3>
                                    {project.image && (
                                        <div className="my-4 relative aspect-video rounded-lg overflow-hidden border border-border">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <p className="text-muted-foreground">{project.description}</p>
                                </div>
                                <div className="text-sm font-mono text-muted-foreground">{project.year}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}
