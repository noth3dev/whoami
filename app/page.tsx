"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Navigation from "@/components/navigation"

interface Project {
  title: string
  slug: string
  category: string
  year: string
  description: string
  image?: string
  tags?: string[]
  featured?: boolean
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        // Get first 3 projects (featured or recent)
        setProjects(data.slice(0, 3))
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoadingProjects(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background subtle effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation />
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section 
                  ? "bg-foreground shadow-lg shadow-foreground/50" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:shadow-md"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-20">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider flex items-center gap-2">
                  <span className="w-8 h-px bg-muted-foreground/40"></span>
                  PORTFOLIO / 2025
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  <span className="text-xl block mb-2 font-mono">
                    김세준
                  </span>
                  <span className="text-muted-foreground">Notth3dev</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed relative">
                  <span className="relative z-10">완성형보다는 성장형으로 불리고 싶습니다.</span>
                  <span className="absolute -left-2 top-0 text-6xl text-foreground/5 font-bold select-none">"</span>
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground font-mono">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/20">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                    In school [한국디지털미디어고등학교]
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono flex items-center gap-2">
                  <span>FOCUS</span>
                  <span className="flex-1 h-px bg-muted-foreground/20"></span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["AI/ML", "AI research", "App", "Design"].map((skill, index) => (
                    <span
                      key={skill}
                      className="group relative px-4 py-2 text-xs font-mono border border-border rounded-full hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light relative">
                Past Experience
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
              </h2>
              <div className="text-sm text-muted-foreground font-mono">2019 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2021",
                  role: "CEO & Founder",
                  company: "Studio Lumen",
                  description: "An Edu-tech based startup for AI/CS education.",
                  achievements: [
                    "사업자등록번호 :	587-04-02880",
                  ],
                  duration: "2022 - Present",
                  details: "프로그래밍의 즐거움을 주변과 나누고자, 에듀테크 기반 프로그래밍 교육 스타트업, Studio Lumen을 설립했습니다.",
                },
                {
                  year: "2024",
                  role: "Enrolled",
                  company: "Korea Digital Media High School",
                  description: "한국디지털미디어고등학교 웹프로그래밍과 입학",
                  achievements: [
                    "웹프로그래밍과 창업특기 전형 입학",
                  ],
                  duration: "2024 - Present",
                  details: "-",
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                    expandedJob === index
                      ? "border-foreground/30 shadow-xl shadow-foreground/10"
                      : "border-border/50 hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1"
                  }`}
                  onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                >
                  <div className={`absolute inset-0 bg-foreground/[0.02] transition-opacity duration-500 ${
                    expandedJob === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}></div>
                  
                  <div className="relative z-10 py-6 sm:py-8 px-4 sm:px-6">
                    <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-mono font-light text-muted-foreground group-hover:text-foreground transition-all duration-500">
                          {job.year}
                        </div>
                      </div>

                      <div className="lg:col-span-10 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg sm:text-xl font-medium group-hover:text-foreground transition-colors duration-300">{job.role}</h3>
                            <div className="text-muted-foreground">{job.company}</div>
                          </div>
                          <div className="text-muted-foreground mt-1">
                            <svg 
                              className={`w-5 h-5 transition-transform duration-500 ${expandedJob === index ? "rotate-180" : ""}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      expandedJob === index ? "max-h-96 opacity-100 mt-6 pt-6 border-t border-border/30" : "max-h-0 opacity-0"
                    }`}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-mono text-muted-foreground mb-3">Duration</h4>
                          <p className="text-muted-foreground">{job.duration}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-mono text-muted-foreground mb-3">Details</h4>
                          <p className="text-muted-foreground leading-relaxed">{job.details}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-mono text-muted-foreground mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {job.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                <span className="text-foreground mt-1">→</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light relative">
                Recent Projects
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
              </h2>
              <Link 
                href="/project"
                className="text-sm text-muted-foreground font-mono hover:text-foreground transition-colors flex items-center gap-2"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-8 sm:gap-10">
              {loadingProjects ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading projects...</p>
                </div>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/project/${project.slug}`}
                    className="group no-underline"
                  >
                    <article
                      className="group relative grid lg:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8 border border-border rounded-2xl hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/10 cursor-pointer overflow-hidden hover:-translate-y-2"
                    >
                      <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="lg:col-span-2 relative z-10 flex flex-col gap-2">
                        <div className="text-2xl font-mono font-light text-muted-foreground group-hover:text-foreground transition-all duration-500">
                          {project.year}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${project.featured ? "bg-foreground" : "bg-foreground/50"}`}></div>
                          <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
                        </div>
                      </div>

                      <div className="lg:col-span-10 space-y-4 relative z-10">
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-medium group-hover:text-foreground transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-mono text-muted-foreground border border-border rounded-full group-hover:border-foreground/20 transition-all duration-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-mono pt-2">
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
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects available.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light relative">
              Recent Thoughts
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
            </h2>
            <div className="mt-12">
              Blog under construction
              </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light relative">
                Let's Connect
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-foreground rounded-full"></span>
              </h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                 궁금하신 사항이나 프로젝트 관련 의뢰가 있다면 언제든지 연락주세요.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:notth3dev@example.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300 font-mono"
                  >
                    <span className="text-base sm:text-lg">harrisonthedev@dimigo.hs.kr</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@notth3dev", url: "https://github.com/noth3dev" },
                  { name: "Boj", handle: "@derp_p", url: "https://solved.ac/profile/derp_p" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group relative p-5 border border-border rounded-xl hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:shadow-foreground/10 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="space-y-2 relative z-10">
                      <div className="text-foreground font-mono group-hover:text-foreground transition-all duration-300 font-medium">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono">© 2025 Notth3dev. All rights not yet reserved.</div>
              <div className="text-xs text-muted-foreground font-mono">Built with Next.js & Tailwind CSS</div>
            </div>

          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
