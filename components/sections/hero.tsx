"use client"

import { RefObject } from "react"

interface HeroProps {
    sectionRef: (el: HTMLElement | null) => void
}

export default function Hero({ sectionRef }: HeroProps) {
    return (
        <header
            id="intro"
            ref={sectionRef}
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
    )
}
