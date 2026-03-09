"use client"

import { useEffect, useRef, useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/projects-section"
import ThoughtsSection from "@/components/sections/thoughts-section"
import ConnectSection from "@/components/sections/connect-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
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
        <Hero sectionRef={(el) => (sectionsRef.current[0] = el)} />
        <ExperienceSection sectionRef={(el) => (sectionsRef.current[1] = el)} />
        <ProjectsSection sectionRef={(el) => (sectionsRef.current[2] = el)} />
        <ThoughtsSection sectionRef={(el) => (sectionsRef.current[3] = el)} />
        <ConnectSection sectionRef={(el) => (sectionsRef.current[4] = el)} />

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
