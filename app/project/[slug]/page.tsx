"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import ReactMarkdown from "react-markdown"

interface ProjectFrontmatter {
  title: string
  slug: string
  category: string
  year: string
  client?: string
  role?: string
  duration?: string
  description: string
  image?: string
  link?: string
  tags?: string[]
  featured?: boolean
  legacy?: boolean
}

interface ProjectData extends ProjectFrontmatter {
  content: string
}

async function getProjectData(slug: string): Promise<ProjectData | null> {
  try {
    const response = await fetch(`/api/projects/${slug}`)
    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

const MarkdownComponents = {
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-light mt-8 mb-4 text-foreground">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-light mt-6 mb-3 text-foreground">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-lg text-muted-foreground leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-3 mb-4 ml-4">{children}</ul>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-3 text-muted-foreground">
      <span className="text-foreground mt-1">•</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-foreground/30 pl-4 my-6 py-4 italic text-muted-foreground bg-foreground/[0.02] rounded">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }: any) => 
    inline ? (
      <code className="bg-foreground/10 px-2 py-1 rounded font-mono text-sm text-foreground">
        {children}
      </code>
    ) : (
      <pre className="bg-foreground/5 p-4 rounded-lg overflow-x-auto mb-4">
        <code className="font-mono text-sm text-muted-foreground">{children}</code>
      </pre>
    ),
  img: () => null,
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProject() {
      const data = await getProjectData(slug)
      setProject(data)
      setLoading(false)
    }

    loadProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-light">Project Not Found</h1>
            <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
            <Link href="/project" className="inline-block text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Projects
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background subtle effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation />

      <main className="pt-32 pb-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-16">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
              <span className="flex items-center gap-2">
                <span className="w-8 h-px bg-muted-foreground/40"></span>
                {project.category}
              </span>
              <span>•</span>
              <span>{project.year}</span>
              {project.legacy && (
                <>
                  <span>•</span>
                  <span className="px-3 py-1 border border-border rounded-full uppercase tracking-[0.2em] text-[0.65rem]">Legacy</span>
                </>
              )}
            </div>

            <h1 className="text-5xl sm:text-6xl font-light tracking-tight">{project.title}</h1>

            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs border border-border rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <article className="prose-invert max-w-xl">
                <ReactMarkdown components={MarkdownComponents}>
                  {project.content}
                </ReactMarkdown>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-4 border border-border rounded-lg p-6 sticky top-32">
                <h3 className="text-sm text-muted-foreground font-mono tracking-wider">PROJECT INFO</h3>
                <div className="space-y-4">
                  {project.client && (
                    <div>
                      <div className="text-sm text-muted-foreground">Client</div>
                      <div className="font-medium text-foreground">{project.client}</div>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <div className="text-sm text-muted-foreground">Role</div>
                      <div className="font-medium text-foreground">{project.role}</div>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium text-foreground">{project.duration}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground">Year</div>
                    <div className="font-medium text-foreground">{project.year}</div>
                  </div>
                </div>
              </div>

              {project.link && (
                <div className="space-y-4 border border-border rounded-lg p-6">
                  <a
                    href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors rounded"
                  >
                    Visit Project
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="space-y-4 border border-border rounded-lg p-6">
                  <h3 className="text-sm text-muted-foreground font-mono tracking-wider">TECHNOLOGIES</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs border border-border rounded-full hover:border-foreground/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}