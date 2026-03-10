"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getSession } from "@/lib/supabase"
import type { NotionEditorMeta, ProjectMeta } from "@/components/notion-editor"

const NotionEditor = dynamic(() => import("@/components/notion-editor"), { ssr: false })

export default function NewProjectPage() {
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession()
            if (!session) router.push("/admin")
        }
        checkAuth()
    }, [router])

    const handleSave = async (content: string, meta: NotionEditorMeta) => {
        const projectMeta = meta as ProjectMeta
        const session = await getSession()
        if (!session) throw new Error("Not authenticated")

        const tagsArray = projectMeta.tags.split(",").map(t => t.trim()).filter(Boolean)

        const response = await fetch("/api/projects/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
                data: {
                    title: projectMeta.title,
                    category: projectMeta.category,
                    year: projectMeta.year,
                    description: projectMeta.description,
                    content,
                    tags: tagsArray,
                    featured: projectMeta.featured,
                    image: projectMeta.image,
                },
            }),
        })

        if (!response.ok) {
            const result = await response.json()
            throw new Error(result.message || "Failed to create project")
        }
    }

    return (
        <NotionEditor
            mode="project"
            onSave={handleSave}
            onBack={() => router.push("/admin")}
            autoSave={false}
        />
    )
}
