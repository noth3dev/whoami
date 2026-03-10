"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getBlogPostById } from "@/lib/data-service"
import { getSession } from "@/lib/supabase"
import type { NotionEditorMeta, BlogMeta } from "@/components/notion-editor"

const NotionEditor = dynamic(() => import("@/components/notion-editor"), { ssr: false })

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [initialContent, setInitialContent] = useState<string | undefined>()
    const [initialMeta, setInitialMeta] = useState<Partial<BlogMeta> | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const session = await getSession()
            if (!session) {
                router.push("/admin")
                return
            }
            const post = await getBlogPostById(id)
            if (post) {
                setInitialContent(post.content || "")
                setInitialMeta({
                    title: post.title,
                    date: post.date || "",
                    excerpt: post.excerpt || "",
                    tags: post.tags?.join(", ") || "",
                    published: !!post.published,
                    image: (post as any).image || "",
                    category: (post as any).category || "",
                })
            }
            setLoading(false)
        }
        load()
    }, [id, router])

    const handleSave = async (content: string, meta: NotionEditorMeta) => {
        const blogMeta = meta as BlogMeta
        const session = await getSession()
        if (!session) throw new Error("Not authenticated")

        const tagsArray = blogMeta.tags.split(",").map(t => t.trim()).filter(Boolean)

        const response = await fetch("/api/blog/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
                id,
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
            throw new Error(result.message || "Failed to update post")
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-muted-foreground font-mono text-sm animate-pulse">Loading...</div>
        </div>
    )

    return (
        <NotionEditor
            mode="blog"
            initialContent={initialContent}
            initialMeta={initialMeta}
            onSave={handleSave}
            onBack={() => router.push("/admin/blog/list")}
            autoSave={true}
            saveDelay={2000}
        />
    )
}
