"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import ReactMarkdown from "react-markdown"
import { Project } from "@/types"
import { getProjectById } from "@/lib/data-service"

interface ProjectData extends Project {
    content: string
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [project, setProject] = useState<ProjectData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProject() {
            try {
                const data = await getProjectById(id)
                if (data) {
                    setProject(data as ProjectData)
                }
            } catch (error) {
                console.error("Error loading project:", error)
            } finally {
                setLoading(false)
            }
        }

        loadProject()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />
                <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8 text-center text-muted-foreground">
                    Loading...
                </main>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-background text-foreground px-6 py-32 text-center">
                <h1 className="text-4xl font-light">Project Not Found</h1>
                <Link href="/project" className="text-muted-foreground hover:text-foreground underline">
                    Back to Projects
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <div className="mb-12 space-y-4">
                    <div className="flex gap-4 text-muted-foreground font-mono text-sm">
                        <span className="px-2 py-0.5 border border-border rounded">{project.category}</span>
                        <span>{project.year}</span>
                    </div>
                    <h1 className="text-5xl font-light tracking-tight">{project.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {project.image && (
                    <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 border border-border shadow-2xl">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-h1:text-4xl prose-p:text-foreground/80 prose-img:rounded-2xl prose-img:border prose-img:border-border">
                    <ReactMarkdown
                        components={{
                            img: ({ node, ...props }) => <img {...props} className="w-full h-auto rounded-2xl border border-border shadow-lg my-12" />
                        }}
                    >
                        {project.content}
                    </ReactMarkdown>
                </article>
            </main>
        </div>
    )
}
