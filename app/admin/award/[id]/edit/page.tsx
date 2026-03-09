"use client"

import { useState, useEffect, use } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Trophy, Save } from "lucide-react"

export default function EditAwardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        organization: "",
        date: "",
        description: "",
        link: "",
        display_order: 0
    })

    useEffect(() => {
        async function load() {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin")
                return
            }

            const { data, error } = await supabase
                .from('awards')
                .select('*')
                .eq('id', id)
                .single()

            if (data) {
                setFormData({
                    title: data.title,
                    organization: data.organization,
                    date: data.date,
                    description: data.description || "",
                    link: data.link || "",
                    display_order: data.display_order || 0
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

            const response = await fetch("/api/awards/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ id, data: formData }),
            })

            if (!response.ok) throw new Error("Failed to update award")

            router.push("/admin/award/list")
        } catch (error: any) {
            alert(error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-20 text-center">Loading...</div>

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
                <button
                    onClick={() => router.push("/admin/award/list")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group text-sm font-mono"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to List
                </button>

                <div className="mb-12 space-y-2">
                    <h1 className="text-5xl font-light tracking-tight">Edit Award</h1>
                    <p className="text-muted-foreground font-mono text-sm leading-none">Modified: {new Date().toLocaleDateString()}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="p-8 border border-border rounded-2xl bg-foreground/[0.02] space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-foreground/30 font-medium transition-all"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Organization</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-foreground/30"
                                        value={formData.organization}
                                        onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Date</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-foreground/30"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-foreground/30 min-h-[120px]"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Link (Optional)</label>
                                <input
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-foreground/30"
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Display Order</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-foreground/30"
                                    value={formData.display_order}
                                    onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-4 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-all disabled:opacity-50 font-medium text-lg shadow-xl shadow-foreground/10 flex items-center justify-center gap-2"
                        >
                            {saving ? "Saving..." : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
