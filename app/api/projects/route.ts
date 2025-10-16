import { readdirSync, readFileSync, statSync } from "fs"
import path from "path"
import matter from "gray-matter"
import { NextResponse } from "next/server"

interface ProjectMetadata {
  title: string
  slug: string
  category: string
  year: string
  description: string
  image?: string
  tags?: string[]
  featured?: boolean
}

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), "projects")
    const dirs = readdirSync(projectsDir).filter((item) => {
      const fullPath = path.join(projectsDir, item)
      return statSync(fullPath).isDirectory() && item !== ".git"
    })

    const projects: ProjectMetadata[] = dirs
      .map((dir) => {
        try {
          const indexPath = path.join(projectsDir, dir, "index.md")
          const fileContent = readFileSync(indexPath, "utf-8")
          const { data } = matter(fileContent)
          return data as ProjectMetadata
        } catch (error) {
          console.error(`Error reading ${dir}/index.md:`, error)
          return null
        }
      })
      .filter(Boolean)
      .sort((a, b) => {
        // Sort by featured first, then by year (descending)
        if ((a?.featured || false) !== (b?.featured || false)) {
          return (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0)
        }
        if (a?.year !== b?.year) {
          return parseInt(b?.year || "0") - parseInt(a?.year || "0")
        }
        return 0
      })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error reading projects:", error)
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 })
  }
}