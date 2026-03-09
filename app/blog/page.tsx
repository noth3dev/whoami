"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { BlogPost } from "@/types"
import { getBlogPosts } from "@/lib/data-service"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBlogPosts()
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navigation />

      {/* Background subtle effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="space-y-6 mb-16">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight">Thoughts</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            기록을 통한 성장과 고민의 흔적들입니다.
          </p>
        </div>

        <div className="grid gap-8">
          {loading ? (
            <p className="text-muted-foreground text-center py-12">Loading thoughts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block p-8 border border-border rounded-xl hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5"
              >
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground font-mono">{post.date}</div>
                  <h2 className="text-2xl font-medium group-hover:text-foreground transition-colors">
                    {post.title}
                  </h2>
                  {post.image && (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs border border-border rounded-full text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-24 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground italic">No posts found yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}