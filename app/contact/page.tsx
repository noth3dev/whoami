"use client"

import Navigation from "@/components/navigation"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight">Contact</h1>
            <p className="text-2xl text-muted-foreground">
              currently in school :(
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}