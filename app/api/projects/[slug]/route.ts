import { readFileSync, existsSync } from "fs"
import path from "path"
import matter from "gray-matter"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const projectsDir = path.join(process.cwd(), "projects")
    const filePath = path.join(projectsDir, params.slug, "index.md")

    // Security: prevent directory traversal
    if (!filePath.startsWith(projectsDir)) {
      return NextResponse.json({ error: "Invalid project" }, { status: 400 })
    }

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const fileContent = readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return NextResponse.json({
      ...data,
      content,
    })
  } catch (error) {
    console.error("Error reading project:", error)
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 })
  }
}