"use client"

import Navigation from "@/components/navigation"
import Image from "next/image"

const techStack = [
  {
    category: "Languages",
    items: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    ],
  },
  {
    category: "Backend & Database",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    category: "AI & ML",
    items: [
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },
  {
    category: "Else",
    items: [
      { name: "Arduino", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Raspberry Pi", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
    ],
  },
]

export default function StackPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
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

        {/* Tech Stack Grid */}
        <div className="space-y-16">
          {techStack.map((section, idx) => (
            <section key={idx} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-light">{section.category}</h2>
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground font-mono">
                  {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {section.items.map((tech, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square p-6 border border-border rounded-2xl hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-2 cursor-pointer overflow-hidden"
                  >
                    {/* Background effect */}
                    <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon container */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-mono text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        {/* Currently Learning */}
        <section className="mt-20 p-8 sm:p-12 border border-border rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-foreground/[0.01]"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-light">Currently Exploring</h2>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
                { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
              ].map((tech, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-3 px-4 py-3 border border-border rounded-xl hover:border-foreground/20 transition-all duration-300 cursor-default"
                >
                  <div className="w-8 h-8 relative flex items-center justify-center">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}