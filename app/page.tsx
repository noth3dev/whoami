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
              className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section
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
                  className={`group relative rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden ${expandedJob === index
                    ? "border-foreground/30 shadow-xl shadow-foreground/10"
                    : "border-border/50 hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1"
                    }`}
                  onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                >
                  <div className={`absolute inset-0 bg-foreground/[0.02] transition-opacity duration-500 ${expandedJob === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
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
                    <div className={`overflow-hidden transition-all duration-500 ${expandedJob === index ? "max-h-96 opacity-100 mt-6 pt-6 border-t border-border/30" : "max-h-0 opacity-0"
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
                    href="mailto:harrisonthedev@dimigo.hs.kr"
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

              <div className="flex flex-col gap-2">
                {[
                  {
                    name: "GitHub",
                    handle: "@notth3dev",
                    url: "https://github.com/noth3dev",
                    icon: (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    ),
                  },
                  {
                    name: "Boj",
                    handle: "@derp_p",
                    url: "https://solved.ac/profile/derp_p",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    handle: "@Sejun Kim",
                    url: "https://www.linkedin.com/in/sejun-kim-5a639039b/",
                    icon: (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>LinkedIn</title>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Instagram",
                    handle: "@not_th3dev",
                    url: "https://www.instagram.com/not_th3dev/",
                    icon: (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Instagram</title>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Phone",
                    handle: "010-9510-8597",
                    url: "tel:01095108597",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target={social.name === "Phone" ? undefined : "_blank"}
                    rel={social.name === "Phone" ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between py-3 rounded-lg hover:bg-foreground/[0.03] transition-all duration-300 px-3 -mx-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {social.icon}
                      </div>
                      <div>
                        <div className="text-foreground font-medium group-hover:translate-x-1 transition-transform duration-300 block">
                          {social.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors">
                      {social.handle}
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
              <div className="text-sm text-muted-foreground font-mono">© 2025 Notth3dev.</div>
              <div className="text-xs text-muted-foreground font-mono">Built with Next.js & Tailwind CSS</div>
            </div>

          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
