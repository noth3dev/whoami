import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const JOBS = [
    {
        year: "2021",
        role: "CEO & Founder",
        company: "Studio Lumen",
        description: "An Edu-tech based startup for AI/CS education.",
        achievements: [
            "사업자등록번호 :	587-04-02880",
        ],
        duration: "2022 - Present",
        details: "프로그래밍의 즐거움을 주변과 나누고자, 에듀테크 기반 프로그래밍 교육 스타트업, Studio Lumen을 설립했습니다.",
    },
    {
        year: "2024",
        role: "Enrolled",
        company: "Korea Digital Media High School",
        description: "한국디지털미디어고등학교 웹프로그래밍과 입학",
        achievements: [
            "웹프로그래밍과 창업특기 전형 입학",
        ],
        duration: "2024 - Present",
        details: "-",
    },
]

async function migrateExperiences() {
    console.log('Migrating experiences...')
    const { error } = await supabase.from('experiences').insert(JOBS)
    if (error) console.error('Error migrating experiences:', error)
    else console.log('Successfully migrated experiences')
}

async function migrateProjects() {
    console.log('Migrating projects...')
    const projectsDir = path.join(process.cwd(), 'projects')
    const categories = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory())

    for (const category of categories) {
        const categoryPath = path.join(projectsDir, category)
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))

        for (const file of files) {
            const filePath = path.join(categoryPath, file)
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const { data, content } = matter(fileContent)

            const project = {
                title: data.title,
                slug: data.slug || file.replace('.md', ''),
                category: category,
                year: data.year?.toString(),
                description: data.description,
                tags: data.tags || [],
                featured: data.featured || false,
                content: content,
                client: data.client,
                role: data.role,
                duration: data.duration,
                link: data.link,
                legacy: data.legacy || false
            }

            const { error } = await supabase.from('projects').upsert([project], { onConflict: 'slug' })
            if (error) console.error(`Error migrating project ${project.slug}:`, error)
            else console.log(`Successfully migrated project ${project.slug}`)
        }
    }
}

async function run() {
    await migrateExperiences()
    await migrateProjects()
    console.log('Migration finished')
}

run()
