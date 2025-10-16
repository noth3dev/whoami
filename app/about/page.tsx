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

        {/* Fun Facts */}
        <section>
          <h2 className="text-3xl font-light mb-8">Beyond Code</h2>

          <div className="grid md:grid-cols-3 gap-6">
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
                title: "Design Lover",
                description: "Fascinated by the intersection of design and code",
              },
              {
                icon: "🌏",
                title: "Travel Bug",
                description: "Love exploring new places and cultures",
              },
              {
                icon: "💡",
                title: "Problem Solver",
                description: "Enjoy tackling complex challenges with elegant solutions",
              },
            ].map((fact, index) => (
              <div key={index} className="p-6 border border-border rounded-lg space-y-3">
                <div className="text-4xl">{fact.icon}</div>
                <h3 className="font-medium">{fact.title}</h3>
                <p className="text-sm text-muted-foreground">{fact.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}