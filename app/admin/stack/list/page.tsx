"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { getTechStack } from "@/lib/data-service"
import { TechItem } from "@/types"
import { supabase } from "@/lib/supabase"

export default function AdminStackListPage() {
    const router = useRouter()
    const [items, setItems] = useState<TechItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin")
                return
            }
            const data = await getTechStack()
            setItems(data)
            setLoading(false)
        }
        load()
    }, [router])

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-light">Manage Tech Stack</h1>
                    <button
                        onClick={() => router.push("/admin/stack/new")}
                        className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                        + Add Tech
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-muted-foreground">Loading...</p>
                    ) : items.length > 0 ? (
                        items.map(item => (
                            <div key={item.id} className="p-6 border border-border rounded-xl flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <img src={item.icon} alt={item.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-xs text-muted-foreground">{item.category}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => router.push(`/admin/stack/${item.id}/edit`)}
                                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                                >
                                    Edit
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No items found.</p>
                    )}
                </div>
            </main>
        </div>
    )
}
