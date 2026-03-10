"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getSession } from "@/lib/supabase"
import type { NotionEditorMeta, BlogMeta } from "@/components/notion-editor"

const NotionEditor = dynamic(() => import("@/components/notion-editor"), { ssr: false })

export default function NewBlogPage() {
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession()
            if (!session) router.push("/admin")
        }
        checkAuth()
    }, [router])

    const handleSave = async (content: string, meta: NotionEditorMeta) => {
        const blogMeta = meta as BlogMeta
        const session = await getSession()
        if (!session) throw new Error("Not authenticated")

        const tagsArray = blogMeta.tags.split(",").map(t => t.trim()).filter(Boolean)

        const response = await fetch("/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
                data: {
                    title: blogMeta.title,
                    date: blogMeta.date,
                    excerpt: blogMeta.excerpt,
                    content,
                    tags: tagsArray,
                    published: blogMeta.published,
                    image: blogMeta.image,
                    category: blogMeta.category,
                },
            }),
        })

        if (!response.ok) {
            const result = await response.json()
            throw new Error(result.message || "Failed to publish post")
        }
    }

    return (
        <NotionEditor
            mode="blog"
            onSave={handleSave}
            onBack={() => router.push("/admin")}
            autoSave={false}
        />
    )
}
