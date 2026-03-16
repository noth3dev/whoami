"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { getBlogPosts } from "@/lib/data-service"
import { BlogPost } from "@/types"
import { supabase, getSession } from "@/lib/supabase"
import { Loader2, Eye, EyeOff, LayoutGrid } from "lucide-react"

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

    const handleUpdateGridSize = async (post: BlogPost, size: string) => {
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
                    data: { grid_size: size }
                })
            })

            if (res.ok) {
                setPosts(posts.map(p => p.id === post.id ? { ...p, grid_size: size } : p))
            }
        } catch (error) {
            console.error(error)
        }
    }

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
                            <div key={post.id} className="p-6 border border-border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-foreground/[0.02] transition-colors">
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium">{post.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-sm text-muted-foreground font-mono">{post.date}</p>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground/50 tracking-widest">{post.category || 'No Category'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                    {/* Grid Size Selector */}
                                    <div className="flex items-center gap-1 bg-foreground/[0.03] p-1 rounded-lg border border-border/50">
                                        {['1x1', '2x1', '1x2', '2x2', '3x2'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => handleUpdateGridSize(post, size)}
                                                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                                                    (post.grid_size || '1x1') === size
                                                    ? "bg-foreground text-background shadow-md"
                                                    : "text-muted-foreground hover:bg-foreground/5"
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 border-l border-border/50 pl-3">
                                        <button
                                            onClick={() => handleTogglePublish(post)}
                                            className={`px-4 py-2 border rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
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
