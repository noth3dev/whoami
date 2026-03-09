"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import { getTechStack } from "@/lib/data-service"
import { TechItem } from "@/types"

export default function StackPage() {
  const [techStack, setTechStack] = useState<TechItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStack() {
      try {
        const data = await getTechStack()
        setTechStack(data)
      } catch (error) {
        console.error("Error loading tech stack:", error)
      } finally {
        setLoading(false)
      }
    }
    loadStack()
  }, [])

  const groupedStack = techStack.filter(t => !t.is_learning).reduce((acc, item) => {
    const category = item.category
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, TechItem[]>)

  const learningItems = techStack.filter(t => t.is_learning)

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 text-center text-muted-foreground">
          Loading stack...
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="space-y-6 mb-20">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono tracking-wider flex items-center gap-2">
              <span className="w-8 h-px bg-muted-foreground/40"></span>
              TECH STACK
            </div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
              Technologies I Use
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              멈추지 않는 학습으로 오늘보다 발전한 내일을 그려갑니다.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          {(Object.entries(groupedStack) as [string, TechItem[]][]).map(([category, items], idx) => (
            <section key={idx} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-light">{category}</h2>
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground font-mono">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((tech, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square p-6 border border-border rounded-2xl hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-2 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        {tech.icon && (
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-mono text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {learningItems.length > 0 && (
          <section className="mt-20 p-8 sm:p-12 border border-border rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-foreground/[0.01]"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-light">Currently Exploring</h2>
              </div>
              <div className="flex flex-wrap gap-6">
                {learningItems.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-3 px-4 py-3 border border-border rounded-xl hover:border-foreground/20 transition-all duration-300 cursor-default"
                  >
                    <div className="w-8 h-8 relative flex items-center justify-center">
                      {tech.icon && (
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      )}
                    </div>
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
