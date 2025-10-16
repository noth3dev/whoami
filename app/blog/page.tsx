"use client"

import Navigation from "@/components/navigation"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <Navigation />

      {/* Background subtle effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="text-center space-y-12 px-6">


        {/* Text */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
            Under Construction
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            블로그를 열심히 구축 중입니다.
            <br />
          </p>
        </div>


      </div>
    </div>
  )
}