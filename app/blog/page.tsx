"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { BlogPost } from "@/types"
import { getBlogPosts } from "@/lib/data-service"
import { LayoutGrid, List as ListIcon } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))] as string[]
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || []))).sort()

  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === "All" || post.category === selectedCategory
    const tagMatch = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    return categoryMatch && tagMatch
  })

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navigation />

      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/[0.03] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/[0.03] rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/[0.02] rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <main className="pt-40 pb-40 max-w-5xl mx-auto px-6">

        {/* Filter Section - High Fidelity */}
        {!loading && posts.length > 0 && (
          <div className="space-y-10 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold tracking-tight uppercase transition-all duration-500 ${
                      selectedCategory === cat 
                      ? "bg-foreground text-background shadow-2xl shadow-foreground/20 scale-105" 
                      : "bg-foreground/[0.02] text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.05] border border-border/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-border/20">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <span className="text-muted-foreground/30 uppercase tracking-[0.2em] size-fit">Tags</span>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <button 
                      onClick={() => setSelectedTag(null)}
                      className={`transition-all duration-300 ${!selectedTag ? "text-foreground font-bold underline underline-offset-8" : "text-muted-foreground/40 hover:text-foreground hover:translate-x-1"}`}
                    >
                      All
                    </button>
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`transition-all duration-300 ${
                          selectedTag === tag 
                          ? "text-foreground font-bold underline underline-offset-8" 
                          : "text-muted-foreground/40 hover:text-foreground hover:translate-x-1"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-foreground/[0.03] p-1 rounded-xl border border-border/40">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <ListIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 auto-rows-max grid-flow-dense" 
          : "grid gap-24"
        }>
          {loading ? (
            <div className="space-y-24 col-span-full">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex flex-col md:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="h-4 w-24 bg-foreground/5 rounded-full" />
                    <div className="h-12 w-full bg-foreground/5 rounded-2xl" />
                    <div className="h-20 w-full bg-foreground/5 rounded-2xl" />
                  </div>
                  <div className="w-full md:w-[380px] aspect-[16/10] bg-foreground/5 rounded-[32px]" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const gridSize = post.grid_size || '1x1';
              const [colSpan, rowSpan] = gridSize.split('x').map(Number);
              
              if (viewMode === "grid") {
                return (
                  <article 
                    key={post.id} 
                    className="group relative"
                    style={{
                      gridColumn: `span ${colSpan}`,
                      gridRow: `span ${rowSpan}`
                    }}
                  >
                    <Link
                      href={`/blog/${post.id}`}
                      className="flex flex-col h-full gap-6 p-6 rounded-[32px] border border-border/30 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-all duration-700"
                    >
                      {post.image && (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-lg">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">
                          <span>{post.date}</span>
                          {post.category && <span className="text-foreground/60 font-black">{post.category}</span>}
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight leading-tight group-hover:translate-x-1 transition-transform">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground/60 leading-relaxed line-clamp-2 text-sm font-light">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                )
              }

              return (
                <article key={post.id} className="group relative">
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex flex-col md:flex-row gap-12 md:items-start group/link"
                  >
                    <div className="flex-1 space-y-6 order-2 md:order-1 pt-2">
                      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">
                        <span>{post.date}</span>
                        {post.category && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-foreground/10" />
                            <span className="text-foreground/60 font-black">{post.category}</span>
                          </>
                        )}
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] group-hover/link:translate-x-2 transition-transform duration-700 ease-out">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed line-clamp-2 text-lg font-light max-w-xl group-hover/link:text-foreground/60 transition-colors duration-500">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4">
                        {post.tags?.map(tag => (
                          <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/20 group-hover/link:text-muted-foreground/50 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {post.image && (
                      <div className="w-full md:w-[380px] aspect-[16/10] rounded-[32px] overflow-hidden border border-border/30 shrink-0 order-1 md:order-2 relative shadow-2xl shadow-foreground/0 group-hover/link:shadow-foreground/[0.03] transition-all duration-700">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover grayscale-[0.3] scale-100 group-hover/link:grayscale-0 group-hover/link:scale-105 transition-all duration-1000 ease-out shadow-inner" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20 mix-blend-overlay" />
                      </div>
                    )}
                  </Link>
                </article>
              )
            })
          ) : (
            <div className="text-center py-40 border border-dashed border-border/50 rounded-[40px] bg-foreground/[0.005] animate-in fade-in zoom-in duration-700 col-span-full">
              <div className="text-6xl mb-6 opacity-20">📂</div>
              <p className="text-muted-foreground text-xl font-light">Your search didn&apos;t match any chronicles.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSelectedTag(null); }}
                className="mt-8 px-8 py-3 bg-foreground text-background rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Reset Exploration
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}