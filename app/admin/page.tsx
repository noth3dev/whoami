"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

export default function AdminPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("")
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)
        }
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("Logging in...")

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setStatus(error.message)
            } else {
                setStatus("")
            }
        } catch (error) {
            setStatus("Error connecting to Supabase")
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    if (!user) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
                <div className="w-full max-w-md space-y-8 p-8 border border-border rounded-2xl bg-foreground/[0.02]">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-light">Admin Login</h1>
                        <p className="text-muted-foreground">Sign in to manage your site</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg outline-none focus:border-foreground/30 transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                        >
                            Login
                        </button>
                        {status && <p className="text-center text-sm text-red-500">{status}</p>}
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-32 pb-20 max-w-6xl mx-auto px-6 sm:px-8">
                <div className="space-y-12">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-light tracking-tight">Admin Dashboard</h1>
                            <p className="text-muted-foreground font-mono text-sm leading-none">Logged in as {user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <AdminCard
                            title="Projects"
                            description="Create and manage your projects"
                            onNew={() => router.push("/admin/project/new")}
                            onManage={() => router.push("/admin/project/list")}
                        />
                        <AdminCard
                            title="Blog Posts"
                            description="Write and edit your thoughts"
                            onNew={() => router.push("/admin/blog/new")}
                            onManage={() => router.push("/admin/blog/list")}
                        />
                        <AdminCard
                            title="Tech Stack"
                            description="Manage the technologies you use"
                            onNew={() => router.push("/admin/stack/new")}
                            onManage={() => router.push("/admin/stack/list")}
                        />
                        <AdminCard
                            title="Awards"
                            description="Keep track of your medals"
                            onNew={() => router.push("/admin/award/new")}
                            onManage={() => router.push("/admin/award/list")}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

function AdminCard({ title, description, onNew, onManage }: { title: string, description: string, onNew: () => void, onManage: () => void }) {
    return (
        <div className="p-8 border border-border rounded-2xl bg-foreground/[0.01] hover:border-foreground/20 hover:bg-foreground/[0.02] transition-all duration-300">
            <h3 className="text-2xl font-medium mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 text-sm">{description}</p>
            <div className="flex gap-4">
                <button
                    onClick={onNew}
                    className="flex-1 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
                >
                    New
                </button>
                <button
                    onClick={onManage}
                    className="flex-1 py-2 border border-border rounded-lg hover:border-foreground/30 hover:bg-background transition-colors text-sm font-medium"
                >
                    Manage
                </button>
            </div>
        </div>
    )
}
