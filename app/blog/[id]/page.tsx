"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import ReactMarkdown from "react-markdown"
import { BlogPost } from "@/types"
import { getBlogPostById } from "@/lib/data-service"

export default function BlogPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPost() {
            try {
                const data = await getBlogPostById(id)
                if (data) {
                    setPost(data)
                }
            } catch (error) {
                console.error("Error loading blog post:", error)
            } finally {
                setLoading(false)
            }
        }

        loadPost()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <Navigation />
                <main className="pt-32 pb-20 max-w-4xl mx-auto px-6 text-center text-muted-foreground">
                    Loading post...
                </main>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background text-foreground px-6 py-32 text-center">
                <h1 className="text-4xl font-light">Post Not Found</h1>
                <Link href="/" className="text-muted-foreground hover:text-foreground underline">
                    Back Home
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <article className="space-y-8">
                    <div className="space-y-4">
                        <div className="text-sm font-mono text-muted-foreground">{post.date}</div>
                        <h1 className="text-5xl font-light tracking-tight">{post.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {post.tags?.map(tag => (
                                <span key={tag} className="px-2 py-1 text-xs border border-border rounded-full text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none pt-8 border-t border-border">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </article>
            </main>
        </div>
    )
}
