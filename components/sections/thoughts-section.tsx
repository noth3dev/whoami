"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BlogPost } from "@/types"
import { getBlogPosts } from "@/lib/data-service"

interface ThoughtsSectionProps {
    sectionRef: (el: HTMLElement | null) => void
}

export default function ThoughtsSection({ sectionRef }: ThoughtsSectionProps) {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getBlogPosts(3)
                setPosts(data)
            } catch (error) {
                console.error("Error fetching blog posts:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return (
        <section
            id="thoughts"
            ref={sectionRef}
            className="min-h-screen py-20 sm:py-32 opacity-0"
        >
            <div className="space-y-12 sm:space-y-16">
                <h2 className="text-3xl sm:text-4xl font-light relative">
                    Recent Thoughts
                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
                </h2>

                <div className="grid gap-8">
                    {loading ? (
                        <p className="text-muted-foreground">Loading thoughts...</p>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group p-6 border border-border rounded-xl hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5"
                            >
                                <div className="space-y-3">
                                    <div className="text-sm text-muted-foreground font-mono">{post.date}</div>
                                    <h3 className="text-xl font-medium group-hover:text-foreground transition-colors">{post.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-muted-foreground italic py-8 border border-dashed border-border rounded-xl text-center">
                            No thoughts shared yet. Check back soon.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
