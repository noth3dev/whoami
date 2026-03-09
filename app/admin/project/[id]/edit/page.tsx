"use client"

import { useState, useEffect, use } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getProjectById } from "@/lib/data-service"
import { supabase, uploadMedia } from "@/lib/supabase"

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        year: "",
        description: "",
        content: "",
        tags: "",
        featured: false,
        image: "",
    })

    const [uploadingImage, setUploadingImage] = useState(false)

    useEffect(() => {
        async function load() {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin")
                return
            }

            const project = await getProjectById(id)
            if (project) {
                setFormData({
                    title: project.title,
                    category: project.category || "",
                    year: project.year || "",
                    description: project.description || "",
                    content: (project as any).content || "",
                    tags: project.tags?.join(", ") || "",
                    featured: !!project.featured,
                    image: project.image || "",
                })
            }
            setLoading(false)
        }
        load()
    }, [id, router])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingImage(true)
        const url = await uploadMedia(file)
        if (url) {
            setFormData(prev => ({ ...prev, image: url }))
        } else {
            alert("Failed to upload image")
        }
        setUploadingImage(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error("Not authenticated")

            const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(Boolean)

            const response = await fetch("/api/projects/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    id,
                    data: {
                        ...formData,
                        tags: tagsArray
                    }
                }),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.message || "Failed to update project")
            }

            alert("Project updated successfully!")
            router.push("/admin/project/list")
        } catch (error: any) {
            alert("Error: " + error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-20 text-center">Loading...</div>

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-5xl mx-auto px-6">
                <div className="mb-12 space-y-2">
                    <h1 className="text-5xl font-light tracking-tight">Edit Project</h1>
                    <p className="text-muted-foreground font-mono text-sm leading-none">Modify your project details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Editor */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Content Canvas</label>
                            <Editor
                                initialContent={formData.content}
                                onChange={(markdown) => setFormData(prev => ({ ...prev, content: markdown }))}
                            />
                        </div>
                    </div>

                    {/* Right Column: Metadata */}
                    <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-32">
                        <div className="p-8 border border-border rounded-2xl bg-foreground/[0.02] space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground">Title</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 font-medium"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground">Category</label>
                                        <input
                                            className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 text-sm"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground">Year</label>
                                        <input
                                            className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 text-sm"
                                            value={formData.year}
                                            onChange={e => setFormData({ ...formData, year: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground">Cover Image</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className="flex-1 px-4 py-2 border border-border border-dashed rounded-lg cursor-pointer hover:bg-foreground/[0.05] transition-colors text-xs text-center"
                                        >
                                            {uploadingImage ? "Uploading..." : "Update Cover"}
                                        </label>
                                        {formData.image && (
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border shadow-sm">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground">Summary</label>
                                    <textarea
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 transition-all min-h-[80px] text-sm"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground">Tags</label>
                                    <input
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 text-sm"
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 rounded border-border"
                                    />
                                    <label htmlFor="featured" className="text-xs text-muted-foreground font-mono cursor-pointer">Pin to Featured</label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full py-3 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-all disabled:opacity-50 font-medium shadow-lg shadow-foreground/10"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push("/admin/project/list")}
                                    className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Discard Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}
