"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Trophy, Plus, Edit, Trash2, Calendar } from "lucide-react"

export default function AdminAwardsPage() {
    const [awards, setAwards] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkAuth() {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin")
                return
            }
            fetchAwards()
        }
        checkAuth()
    }, [router])

    async function fetchAwards() {
        const { data, error } = await supabase
            .from('awards')
            .select('*')
            .order('display_order', { ascending: true })

        if (!error) setAwards(data || [])
        setLoading(false)
    }

    async function deleteAward(id: string) {
        if (!confirm("Are you sure?")) return
        const { error } = await supabase.from('awards').delete().eq('id', id)
        if (!error) fetchAwards()
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-5xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-light tracking-tight">Awards</h1>
                        <p className="text-muted-foreground font-mono text-sm">Manage your achievements.</p>
                    </div>
                    <button
                        onClick={() => router.push("/admin/award/new")}
                        className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Award
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid gap-4">
                        {awards.map((award) => (
                            <div
                                key={award.id}
                                className="p-6 border border-border rounded-2xl bg-foreground/[0.02] flex items-center justify-between group hover:border-foreground/20 transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-3 bg-background border border-border rounded-xl">
                                        <Trophy className="w-6 h-6 text-yellow-500/80" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-medium">{award.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                                            <span>{award.organization}</span>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {award.date}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => router.push(`/admin/award/${award.id}/edit`)}
                                        className="p-2 hover:bg-foreground/[0.05] rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteAward(award.id)}
                                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {awards.length === 0 && (
                            <div className="text-center py-20 border border-dashed border-border rounded-2xl text-muted-foreground">
                                No awards found. Start by adding one.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
