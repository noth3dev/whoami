"use client"

import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"

const education = [
  {
    period: "2024 — Current",
    degree: "Department of Web programming",
    school: "Korea Digital Media High School",
    description: "Focused on software engineering, algorithms, and web development.",
  },
]

const certifications = [
  "HubSpot CMS for Developers",
  "AWS Certified Developer - Associate",
  "Google Professional UX Design",
  "Meta Frontend Developer Professional",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">ABOUT ME</div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
              개발자가 아니다,
              <br />
              <span className="text-muted-foreground">아티스트다</span>
            </h1>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                IDE라는 캔버스 위에, 코드라는 그림을 그리는 아티스트, 김세준입니다.
              </p>
              <p>
                제 작품은 논리와 창의가 만나는 순간에 탄생합니다.
                변수는 색깔이 되고, 함수는 붓이 되며, 버그조차도 그림의 한 부분으로 그려나갑니다.
              </p>
              <p>
                혼자만 보는 그림이 아닌, 모두와 나눌 수 있는 작품을 만들고자 합니다.
                오늘도 저는 그 언어로, 세상을 조금 더 아름답게 그려나갑니다.
              </p>
            </div>
          </div>

          <div className="w-80 h-90 bg-muted rounded-lg overflow-hidden relative ml-20">
            <Image
              src="/Photo.jpeg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Education */}
        <section className="mb-20">
          <h2 className="text-3xl font-light mb-12">Education</h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-3">
                  <div className="text-sm text-muted-foreground font-mono">{edu.period}</div>
                </div>

                <div className="lg:col-span-9 space-y-2">
                  <h3 className="text-xl font-medium">{edu.degree}</h3>
                  <div className="text-muted-foreground">{edu.school}</div>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beyond Code */}
        <section>
          <h2 className="text-3xl font-light mb-12 relative">
            Beyond Code
            <span className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full"></span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "☕",
                title: "카페인 중독자",
                description: "커피를 주면 좋아합니다",
              },
              {
                icon: "📚",
                title: "학습자",
                description: "새로운 기술(프레임워크, 모델 등)이 개발되면 바로 배워봅니다",
              },
              {
                icon: "🎨",
                title: "디자인 강박증",
                description: "완벽한 디자인에 대한 강박이 있습니다",
              },
              {
                icon: "💡",
                title: "사색가",
                description: "문제를 이리저리 둘러보며 물고 놓지 않습니다",
              },
            ].map((fact, index) => (
              <div
                key={index}
                className="group relative p-6 border border-border rounded-xl hover:border-foreground/20 transition-all duration-500 hover:shadow-lg hover:shadow-foreground/10 overflow-hidden hover:-translate-y-1 cursor-pointer"
              >
                <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 space-y-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{fact.icon}</div>
                  <h3 className="font-medium text-foreground group-hover:text-foreground transition-colors duration-300">{fact.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{fact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}