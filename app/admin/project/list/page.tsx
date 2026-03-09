"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { getProjects } from "@/lib/data-service"
import { Project } from "@/types"
import { supabase } from "@/lib/supabase"

export default function AdminProjectListPage() {
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin")
                return
            }
            const data = await getProjects()
            setProjects(data)
            setLoading(false)
        }
        load()
    }, [router])

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-light">Manage Projects</h1>
                    <button
                        onClick={() => router.push("/admin/project/new")}
                        className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                        + New Project
                    </button>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <p className="text-muted-foreground">Loading...</p>
                    ) : projects.length > 0 ? (
                        projects.map(project => (
                            <div key={project.id} className="p-6 border border-border rounded-xl flex justify-between items-center hover:bg-foreground/[0.02] transition-colors">
                                <div>
                                    <h3 className="text-xl font-medium">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground">{project.category} • {project.year}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => router.push(`/admin/project/${project.id}/edit`)}
                                        className="px-4 py-2 border border-border rounded-lg hover:border-foreground/20 transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No projects found.</p>
                    )}
                </div>
            </main>
        </div>
    )
}
