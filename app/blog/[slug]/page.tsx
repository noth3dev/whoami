"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Navigation from "@/components/navigation"

const blogPostsData: Record<string, any> = {
  "future-of-web-development": {
    title: "The Future of Web Development",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    author: "Felix Macaspac",
    content: `
      <p>Web development has come a long way in the past decade, and the pace of change shows no signs of slowing down. As we look toward the future, several trends are emerging that will fundamentally reshape how we build for the web.</p>

      <h2>The Rise of AI-Assisted Development</h2>
      <p>Artificial intelligence is becoming an increasingly important tool in the developer's toolkit. From code completion to automated testing, AI is helping developers work more efficiently and catch bugs before they reach production.</p>

      <p>Tools like GitHub Copilot and ChatGPT are already changing how developers write code, offering suggestions and helping with documentation. But this is just the beginning. We're moving toward a future where AI can help with architecture decisions, performance optimization, and even design.</p>

      <h2>The Evolution of Frameworks</h2>
      <p>Modern frameworks like React, Vue, and Svelte continue to evolve, with each new version bringing improved performance and developer experience. Server Components in React 19, for example, represent a fundamental shift in how we think about rendering and data fetching.</p>

      <h2>Performance-First Approach</h2>
      <p>With Core Web Vitals becoming increasingly important for SEO, performance is no longer optional. Frameworks are building in performance optimizations by default, and developers are adopting performance budgets and monitoring tools.</p>

      <h2>The Edge Computing Revolution</h2>
      <p>Edge computing is bringing computation closer to users, reducing latency and improving performance. Platforms like Vercel Edge Functions and Cloudflare Workers are making it easier than ever to deploy code at the edge.</p>

      <h2>Conclusion</h2>
      <p>The future of web development is exciting and full of possibilities. By staying curious and continuing to learn, we can make the most of these emerging technologies and build better experiences for users around the world.</p>
    `,
    tags: ["Web Development", "AI", "Future Tech", "Performance"],
  },
  "design-systems-at-scale": {
    title: "Design Systems at Scale",
    date: "Nov 22, 2024",
    readTime: "8 min read",
    category: "Design",
    author: "Felix Macaspac",
    content: `
      <p>Building a design system is challenging. Scaling it across multiple products and teams is even harder. Here are the lessons I've learned from building and maintaining design systems.</p>

      <h2>Start with Documentation</h2>
      <p>Good documentation is the foundation of any successful design system. It's not just about documenting components—it's about documenting the why behind design decisions, accessibility considerations, and usage guidelines.</p>

      <h2>Make it Easy to Adopt</h2>
      <p>The best design system is one that teams actually use. This means making installation simple, providing clear examples, and offering support when teams have questions.</p>

      <h2>Automate Everything</h2>
      <p>From visual regression testing to automated accessibility checks, automation helps maintain quality as the system grows. Tools like Chromatic and Storybook make this easier than ever.</p>

      <h2>Governance and Contribution</h2>
      <p>Establish clear processes for how changes are proposed, reviewed, and implemented. Open contribution models can work, but they need structure and guidelines.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>Start small and iterate based on real needs</li>
        <li>Invest heavily in documentation and examples</li>
        <li>Build automation into your workflow</li>
        <li>Create clear governance processes</li>
        <li>Listen to your users and iterate continuously</li>
      </ul>
    `,
    tags: ["Design Systems", "Component Libraries", "UI/UX", "Best Practices"],
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPostsData[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-light">Post Not Found</h1>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Blog
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Header */}
        <article className="max-w-3xl mx-auto px-6 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="space-y-6 mb-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">{post.title}</h1>

            <div className="flex items-center gap-3 pt-4 pb-8 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xl font-light">FM</span>
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-muted-foreground">Frontend Developer</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-sm border border-border rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">Enjoyed this article?</h3>
                <p className="text-sm text-muted-foreground">Share it with your network</p>
              </div>

              <div className="flex gap-3">
                <button className="p-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </button>
                <button className="p-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-8 border border-border rounded-lg">
            <div className="flex gap-6">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-light">FM</span>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-medium">Felix Macaspac</h3>
                  <p className="text-muted-foreground">Frontend Developer</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Felix is a frontend developer with 6+ years of experience building for the web. He specializes in
                  React, HubSpot CMS, and creating performant user experiences.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors"
                >
                  <span>More about me</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-light mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Performance-First Development",
                  date: "Oct 30, 2024",
                  slug: "performance-first-development",
                },
                {
                  title: "Modern CSS Features You Should Know",
                  date: "Jul 14, 2024",
                  slug: "modern-css-features",
                },
              ].map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">{relatedPost.date}</div>
                    <h3 className="text-lg font-light group-hover:text-muted-foreground transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>Read more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* Custom styles for blog content */}
      <style jsx global>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 300;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
          color: var(--color-muted-foreground);
        }

        .prose ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .prose li {
          margin-bottom: 0.5rem;
          color: var(--color-muted-foreground);
        }

        .prose a {
          color: var(--color-foreground);
          text-decoration: underline;
          transition: color 0.3s;
        }

        .prose a:hover {
          color: var(--color-muted-foreground);
        }
      `}</style>
    </div>
  )
}