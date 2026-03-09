export interface Project {
    id: string
    title: string
    category: string
    year: string
    description: string
    image?: string
    tags?: string[]
    featured?: boolean
}

export interface Job {
    year: string
    role: string
    company: string
    description: string
    achievements: string[]
    duration: string
    details: string
}

export interface BlogPost {
    id: string
    title: string
    date: string
    excerpt: string
    content: string
    tags: string[]
    published: boolean
    image?: string
}
export interface TechItem {
    id: string
    name: string
    category: string
    icon?: string
    is_learning: boolean
    display_order: number
}

export interface Award {
    id: string
    title: string
    organization: string
    date: string
    description?: string
    link?: string
    display_order: number
}
