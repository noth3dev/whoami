"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { getBlogPosts } from "@/lib/data-service"
import { BlogPost } from "@/types"
import { supabase, getSession } from "@/lib/supabase"
import { Loader2, Eye, EyeOff } from "lucide-react"

export default function AdminBlogListPage() {
    const router = useRouter()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const session = await getSession()
            if (!session) {
                router.push("/admin")
                return
            }
            const data = await getBlogPosts(undefined, false)
            setPosts(data)
            setLoading(false)
        }
        load()
    }, [router])

    const handleTogglePublish = async (post: BlogPost) => {
        const session = await getSession()
        if (!session) return

        try {
            const res = await fetch("/api/blog/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    id: post.id,
                    data: { published: !post.published }
                })
            })

            if (res.ok) {
                setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleCreateNew = async () => {
        const session = await getSession()
        if (!session) return

        try {
            const res = await fetch("/api/blog/create", {
                method: "POST",
                headers: { "Authorization": `Bearer ${session.access_token}` }
            })
            const { id } = await res.json()
            if (id) router.push(`/admin/blog/${id}/edit`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-light">Manage Blog Posts</h1>
                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors flex items-center gap-2"
                    >
                        + New Post
                    </button>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <p className="text-muted-foreground">Loading...</p>
                    ) : posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="p-6 border border-border rounded-xl flex justify-between items-center hover:bg-foreground/[0.02] transition-colors">
                                <div>
                                    <h3 className="text-xl font-medium">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground">{post.date}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleTogglePublish(post)}
                                        className={`px-4 py-2 border rounded-lg transition-all flex items-center gap-2 ${
                                            post.published 
                                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" 
                                            : "border-blue-500/20 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                        }`}
                                    >
                                        {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                                        {post.published ? "Published" : "Draft"}
                                    </button>
                                    <button
                                        onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                                        className="px-4 py-2 border border-border rounded-lg hover:border-foreground/20 transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No posts found.</p>
                    )}
                </div>
            </main>
        </div>
    )
}
