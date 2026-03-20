"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getProjectById } from "@/lib/data-service"
import { getSession } from "@/lib/supabase"
import type { NotionEditorMeta, ProjectMeta } from "@/components/notion-editor"

const NotionEditor = dynamic(() => import("@/components/notion-editor"), { ssr: false })

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [initialContent, setInitialContent] = useState<string | undefined>()
    const [initialMeta, setInitialMeta] = useState<Partial<ProjectMeta> | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const session = await getSession()
            if (!session) {
                router.push("/admin")
                return
            }
            const project = await getProjectById(id)
            if (project) {
                setInitialContent((project as any).content || "")
                setInitialMeta({
                    title: project.title,
                    category: project.category || "",
                    year: project.year || "",
                    description: project.description || "",
                    tags: project.tags?.join(", ") || "",
                    featured: !!project.featured,
                    image: project.image || "",
                    icon: (project as any).icon || "",
                })
            }
            setLoading(false)
        }
        load()
    }, [id, router])

    const handleSave = async (content: string, meta: NotionEditorMeta) => {
        const projectMeta = meta as ProjectMeta
        const session = await getSession()
        if (!session) throw new Error("Not authenticated")

        const tagsArray = projectMeta.tags.split(",").map(t => t.trim()).filter(Boolean)

        const response = await fetch("/api/projects/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
                id,
                data: {
                    title: projectMeta.title,
                    category: projectMeta.category,
                    year: projectMeta.year,
                    description: projectMeta.description,
                    content,
                    tags: tagsArray,
                    featured: projectMeta.featured,
                    image: projectMeta.image,
                    icon: projectMeta.icon,
                },
            }),
        })

        if (!response.ok) {
            const result = await response.json()
            throw new Error(result.message || "Failed to update project")
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-muted-foreground font-mono text-sm animate-pulse">Loading...</div>
        </div>
    )

    return (
        <NotionEditor
            mode="project"
            initialContent={initialContent}
            initialMeta={initialMeta}
            onSave={handleSave}
            onBack={() => router.push("/admin/project/list")}
            autoSave={true}
            saveDelay={2000}
        />
    )
}
