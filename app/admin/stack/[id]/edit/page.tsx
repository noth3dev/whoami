"use client"

import { useState, useEffect, use } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { getTechStackItemById } from "@/lib/data-service"
import { supabase } from "@/lib/supabase"

export default function EditStackPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        category: "Frontend",
        name: "",
        icon: "",
        is_learning: false,
        display_order: 0,
    })

    useEffect(() => {
        async function load() {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin")
                return
            }

            const item = await getTechStackItemById(id)
            if (item) {
                setFormData({
                    category: item.category,
                    name: item.name,
                    icon: item.icon || "",
                    is_learning: item.is_learning,
                    display_order: item.display_order,
                })
            }
            setLoading(false)
        }
        load()
    }, [id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error("Not authenticated")

            const response = await fetch("/api/stack/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    id,
                    data: formData
                }),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.message || "Failed to update item")
            }

            alert("Tech stack item updated!")
            router.push("/admin/stack/list")
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
            <main className="pt-32 pb-20 max-w-xl mx-auto px-6">
                <h1 className="text-4xl font-light mb-8">Edit Tech Stack</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-mono text-muted-foreground">Category</label>
                        <select
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Languages</option>
                            <option>Frontend</option>
                            <option>Backend & Database</option>
                            <option>AI & ML</option>
                            <option>Tools</option>
                            <option>Else</option>
                            <option>Learning</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-mono text-muted-foreground">Name</label>
                        <input
                            required
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-mono text-muted-foreground">Icon URL</label>
                        <input
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30"
                            value={formData.icon}
                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="learning"
                            checked={formData.is_learning}
                            onChange={e => setFormData({ ...formData, is_learning: e.target.checked })}
                        />
                        <label htmlFor="learning" className="text-sm font-mono text-muted-foreground">Learning</label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-mono text-muted-foreground">Display Order</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-foreground/30"
                            value={formData.display_order}
                            onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </main>
        </div>
    )
}
