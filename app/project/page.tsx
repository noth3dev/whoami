"use client"

import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import TagFilter from "@/components/tag-filter"
import { useState, useMemo, useEffect } from "react"

interface Project {
  slug: string
  title: string
  category: string
  year: string
  description: string
  image?: string
  tags?: string[]
  featured?: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to load projects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])
  
  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])))

  // Filter projects by selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects
    return projects.filter((p) =>
      selectedTags.every((tag) => p.tags?.includes(tag))
    )
  }, [selectedTags, projects])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <Navigation />
        <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background subtle effects - 홈페이지와 통일 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <Navigation />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="space-y-6 mb-16">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono tracking-wider flex items-center gap-2">
              <span className="w-8 h-px bg-muted-foreground/40"></span>
              PROJECTS / 2022 — 2024
            </div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight">Project Experienced</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              치고 박으며 배우는 개발자, 김세준의 프로젝트 여정입니다.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-3">Filter by tech stack:</p>
            <TagFilter items={allTags} onSelectionChange={setSelectedTags} />
          </div>
        </div>



        {/* Projects */}
        {filteredProjects.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-light mb-8 relative">
            {selectedTags.length > 0 ? "Matching Projects" : "All Projects"}
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
          </h2>
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group grid md:grid-cols-12 gap-6 p-6 border border-border rounded-xl hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5 overflow-hidden hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                
                {project.image && (
                  <div className="md:col-span-3 relative z-10 pointer-events-none">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent group-hover:from-black/20 transition-all duration-500" />
                    </div>
                  </div>
                )}

                <div className={`${project.image ? 'md:col-span-9' : 'md:col-span-12'} space-y-3 relative z-10`}>
                  <div className="flex items-center justify-between pointer-events-none">
                    <div className="text-xs text-muted-foreground font-mono">{project.category}</div>
                    <div className="text-xs text-muted-foreground">{project.year}</div>
                  </div>

                  <h3 className="text-xl font-light group-hover:text-foreground transition-colors duration-300 pointer-events-none">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm pointer-events-none">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pointer-events-none">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs border border-border rounded-full group-hover:border-foreground/30 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={`/project/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-mono pt-2 relative z-20"
                  >
                    <span>View details</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {filteredProjects.length === 0 && (
          <section className="text-center py-16">
            <p className="text-lg text-muted-foreground">No projects found matching your selection.</p>
          </section>
        )}
      </main>
    </div>
  )
}