"use client"

import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState, useCallback } from "react"
import { uploadMedia } from "@/lib/supabase"
import { ImageIcon, X, Tag, Calendar, Hash, Eye, EyeOff, Loader2, ArrowLeft, MoreHorizontal, Smile, MessageSquare, Star, Plus } from "lucide-react"

export type NotionEditorMode = "blog" | "project"

export interface BlogMeta {
    title: string
    date: string
    excerpt: string
    tags: string
    published: boolean
    image: string
    category: string
}

export interface ProjectMeta {
    title: string
    category: string
    year: string
    description: string
    tags: string
    featured: boolean
    image: string
}

export type NotionEditorMeta = BlogMeta | ProjectMeta

interface NotionEditorProps {
    mode: NotionEditorMode
    initialContent?: string
    initialMeta?: Partial<NotionEditorMeta>
    onSave: (content: string, meta: NotionEditorMeta) => Promise<void>
    onBack?: () => void
    autoSave?: boolean
    saveDelay?: number
}

export default function NotionEditor({
    mode,
    initialContent,
    initialMeta,
    onSave,
    onBack,
    autoSave = true,
    saveDelay = 1500,
}: NotionEditorProps) {
    const { theme } = useTheme()
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
    const [scrolled, setScrolled] = useState(false)
    const [uploadingCover, setUploadingCover] = useState(false)
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<string>("")

    // States for Notion-like UI
    const defaultBlogMeta: BlogMeta = {
        title: "",
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        excerpt: "",
        tags: "",
        published: true,
        image: "",
        category: "",
    }
    const defaultProjectMeta: ProjectMeta = {
        title: "",
        category: "",
        year: new Date().getFullYear().toString(),
        description: "",
        tags: "",
        featured: false,
        image: "",
    }

    const [meta, setMeta] = useState<NotionEditorMeta>(
        mode === "blog"
            ? { ...defaultBlogMeta, ...(initialMeta as Partial<BlogMeta>) }
            : { ...defaultProjectMeta, ...(initialMeta as Partial<ProjectMeta>) }
    )

    const metaRef = useRef(meta)
    metaRef.current = meta

    // Handle scroll for bar transparency
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const editor = useCreateBlockNote({
        uploadFile: async (file: File) => {
            const url = await uploadMedia(file)
            return url || ""
        },
    })

    // Load initial content
    useEffect(() => {
        async function loadInitial() {
            if (initialContent && editor.topLevelBlocks.length <= 1) {
                const blocks = await editor.tryParseMarkdownToBlocks(initialContent)
                editor.replaceBlocks(editor.topLevelBlocks, blocks)
            }
        }
        loadInitial()
    }, [initialContent, editor])

    // Auto-resize title
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = "auto"
            titleRef.current.style.height = titleRef.current.scrollHeight + "px"
        }
    }, [meta.title])

    const performSave = useCallback(async () => {
        setSaveStatus("saving")
        try {
            await onSave(contentRef.current, metaRef.current)
            setSaveStatus("saved")
            setTimeout(() => setSaveStatus("idle"), 2000)
        } catch {
            setSaveStatus("error")
            setTimeout(() => setSaveStatus("idle"), 3000)
        }
    }, [onSave])

    const saveTimeout = useRef<NodeJS.Timeout | null>(null)

    const handleEditorChange = useCallback(async () => {
        const markdown = await editor.blocksToMarkdownLossy(editor.topLevelBlocks)
        contentRef.current = markdown
        if (autoSave) {
            if (saveTimeout.current) clearTimeout(saveTimeout.current)
            saveTimeout.current = setTimeout(performSave, saveDelay)
        }
    }, [editor, autoSave, saveDelay, performSave])

    const handleMetaChange = (updates: Partial<NotionEditorMeta>) => {
        setMeta(prev => {
            const next = { ...prev, ...updates } as NotionEditorMeta
            metaRef.current = next
            if (autoSave) {
                if (saveTimeout.current) clearTimeout(saveTimeout.current)
                saveTimeout.current = setTimeout(performSave, saveDelay)
            }
            return next
        })
    }

    const handleCoverUpload = async (file: File) => {
        setUploadingCover(true)
        try {
            const url = await uploadMedia(file)
            if (url) handleMetaChange({ image: url } as any)
            else alert("Upload failed. please check console.")
        } catch (e: any) {
            alert("Upload error: " + e.message)
        } finally {
            setUploadingCover(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Minimalist Top Nav */}
            <div className={`fixed top-0 left-0 right-0 z-[100] h-11 flex items-center justify-between px-3 transition-all ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/30" : "bg-transparent"
                }`}>
                <div className="flex items-center gap-1">
                    {onBack && (
                        <button onClick={onBack} className="p-1 px-2 hover:bg-foreground/[0.04] rounded transition-colors text-muted-foreground hover:text-foreground text-sm flex items-center gap-1.5 font-medium">
                            <ArrowLeft size={16} />
                            Back
                        </button>
                    )}
                    {scrolled && (
                        <div className="flex items-center gap-2 ml-2 animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="text-muted-foreground/40 font-light">/</span>
                            <span className="text-sm font-semibold truncate max-w-[200px]">{meta.title || "Untitled"}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-0.5">
                    {saveStatus === "saving" && <Loader2 size={14} className="animate-spin text-muted-foreground mr-2" />}
                    {saveStatus === "saved" && <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter mr-2">Saved</span>}

                    <button className="h-7 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] rounded transition-colors">Share</button>
                    <button className="h-7 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] rounded transition-colors">Updates</button>
                    <button
                        onClick={() => mode === "blog"
                            ? handleMetaChange({ published: !(meta as BlogMeta).published } as any)
                            : handleMetaChange({ featured: !(meta as ProjectMeta).featured } as any)
                        }
                        className="h-7 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] rounded transition-colors"
                    >
                        {mode === "blog"
                            ? ((meta as BlogMeta).published ? "Public" : "Private")
                            : ((meta as ProjectMeta).featured ? "⭐ Featured" : "Pin")
                        }
                    </button>
                    <button className="h-7 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] rounded transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="max-w-[960px] mx-auto pb-40 relative">

                {/* Cover Image */}
                <div className="relative group w-full mb-16">
                    {meta.image ? (
                        <div className="relative w-full h-[32vh] overflow-hidden">
                            <img src={meta.image} alt="Cover" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 right-[calc(10%+24px)] flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1">
                                <label className="cursor-pointer h-7 px-3 flex items-center text-xs bg-background/90 backdrop-blur shadow-sm border border-border/40 rounded hover:bg-background transition-colors font-medium">
                                    Change cover
                                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
                                </label>
                                <button onClick={() => handleMetaChange({ image: "" } as any)} className="h-7 px-3 text-xs bg-background/90 backdrop-blur shadow-sm border border-border/40 rounded hover:bg-background transition-colors font-medium">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-32 flex items-end px-12 md:px-24">
                            <label className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground/20 hover:text-muted-foreground transition-all font-medium opacity-0 group-hover:opacity-100 py-3 -mb-2">
                                <ImageIcon size={18} />
                                Add cover
                                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
                            </label>
                        </div>
                    )}
                    {uploadingCover && (
                        <div className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center">
                            <Loader2 size={28} className="animate-spin text-muted-foreground" />
                        </div>
                    )}
                </div>

                {/* Notion Style Editor Container */}
                <div className="px-12 md:px-24">
                    {/* Floating Controls */}
                    <div className="flex gap-4 mb-4 opacity-0 hover:opacity-100 transition-opacity">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground font-medium transition-colors">
                            <Smile size={15} /> Add icon
                        </button>
                        {!meta.image && (
                            <label className="cursor-pointer flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground font-medium transition-colors">
                                <ImageIcon size={15} /> Add cover
                                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
                            </label>
                        )}
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground font-medium transition-colors">
                            <MessageSquare size={15} /> Add comment
                        </button>
                    </div>

                    {/* Precise Typography Title */}
                    <textarea
                        ref={titleRef}
                        rows={1}
                        value={meta.title}
                        onChange={e => handleMetaChange({ title: e.target.value } as any)}
                        placeholder="Untitled"
                        className="w-full bg-transparent text-[42px] font-bold tracking-tight resize-none outline-none placeholder:text-muted-foreground/10 overflow-hidden leading-[1.2] mb-6 block"
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                editor.focus()
                            }
                        }}
                    />

                    {/* Clean Properties Section */}
                    <div className="space-y-0.5 mb-12">
                        {mode === "blog" ? (
                            <>
                                <PropertyItem icon={<Tag size={16} />} label="Category">
                                    <CatSelect current={(meta as BlogMeta).category} onChange={v => handleMetaChange({ category: v } as any)} />
                                </PropertyItem>
                                <PropertyItem icon={<Calendar size={16} />} label="Created">
                                    <input className="prop-input" value={(meta as BlogMeta).date} onChange={e => handleMetaChange({ date: e.target.value } as any)} />
                                </PropertyItem>
                                <PropertyItem icon={<Hash size={16} />} label="Tags">
                                    <TagInput value={meta.tags} onChange={v => handleMetaChange({ tags: v } as any)} />
                                </PropertyItem>
                                <PropertyItem icon={<MessageSquare size={16} />} label="Excerpt">
                                    <textarea
                                        className="prop-input-area"
                                        rows={1}
                                        onInput={e => {
                                            const t = e.target as any;
                                            t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px';
                                        }}
                                        value={(meta as BlogMeta).excerpt}
                                        onChange={e => handleMetaChange({ excerpt: e.target.value } as any)}
                                        placeholder="Add a brief summary..."
                                    />
                                </PropertyItem>
                            </>
                        ) : (
                            <>
                                <PropertyItem icon={<Tag size={16} />} label="Type">
                                    <input className="prop-input" placeholder="Web App, Design..." value={(meta as ProjectMeta).category} onChange={e => handleMetaChange({ category: e.target.value } as any)} />
                                </PropertyItem>
                                <PropertyItem icon={<Calendar size={16} />} label="Year">
                                    <input className="prop-input font-mono" placeholder="2024" value={(meta as ProjectMeta).year} onChange={e => handleMetaChange({ year: e.target.value } as any)} />
                                </PropertyItem>
                                <PropertyItem icon={<Hash size={16} />} label="Stack">
                                    <TagInput value={meta.tags} onChange={v => handleMetaChange({ tags: v } as any)} />
                                </PropertyItem>
                                <PropertyItem icon={<MessageSquare size={16} />} label="Summary">
                                    <textarea className="prop-input-area" rows={1} value={(meta as ProjectMeta).description} onChange={e => handleMetaChange({ description: e.target.value } as any)} placeholder="Project overview..." />
                                </PropertyItem>
                            </>
                        )}
                        <button className="flex items-center gap-2 text-xs text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors py-2 px-1 hover:bg-foreground/[0.02] rounded w-fit">
                            <Plus size={14} /> Add a property
                        </button>
                    </div>

                    <div className="h-px bg-border/10 mb-8" />

                    {/* BlockNote High-Fidelity Area */}
                    <div className="relative -mx-10">
                        <BlockNoteView
                            editor={editor}
                            theme={theme === "light" ? "light" : "dark"}
                            sideMenu={true}
                            slashMenu={true}
                            onChange={handleEditorChange}
                            className="notion-clean-editor"
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Prevent overflow issues for Slash Menu */
                html, body {
                    overflow-x: hidden;
                    background-color: var(--background);
                }

                .notion-clean-editor .bn-container {
                    background-color: transparent !important;
                    margin: 0 !important;
                }
                .notion-clean-editor .bn-editor {
                    padding: 0 40px !important;
                    background: transparent !important;
                }
                .notion-clean-editor [data-content-editable] {
                    background: transparent !important;
                }

                /* Block Typography */
                .bn-editor p {
                    font-size: 1.05rem !important;
                    line-height: 1.65 !important;
                    margin-bottom: 2px !important;
                }
                .bn-editor h1 { font-size: 1.85em !important; font-weight: 700 !important; margin-top: 1.8em !important; }
                .bn-editor h2 { font-size: 1.45em !important; font-weight: 600 !important; margin-top: 1.4em !important; }

                /* Premium Popovers (Slash Menu) */
                .bn-slash-menu, .bn-side-menu, .bn-popover {
                    background-color: var(--background) !important;
                    border: 1px solid var(--border) !important;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
                    backdrop-filter: blur(12px) !important;
                    border-radius: 8px !important;
                    padding: 4px !important;
                    z-index: 1000 !important;
                }
                .bn-slash-menu-item {
                    border-radius: 5px !important;
                    margin: 1px 0 !important;
                    padding: 6px 8px !important;
                }
                .bn-slash-menu-item:hover, .bn-slash-menu-item[data-selected] {
                    background-color: var(--foreground-05, rgba(128,128,128,0.1)) !important;
                }

                /* Notion Side Menu Refinement */
                .bn-side-menu {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                }
                .bn-side-menu button {
                    opacity: 0.1;
                    transition: opacity 0.2s;
                }
                .bn-side-menu:hover button {
                    opacity: 0.6;
                }
                .bn-side-menu button:hover {
                    opacity: 1 !important;
                    background-color: var(--foreground-05, rgba(128,128,128,0.1)) !important;
                }

                /* Properties Helper Classes */
                .prop-input {
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    width: 100%;
                    padding: 2px 4px;
                    border-radius: 4px;
                    transition: background 0.2s;
                    color: inherit;
                }
                .prop-input:hover {
                    background: rgba(128,128,128,0.06);
                }
                .prop-input:focus {
                    background: rgba(128,128,128,0.04);
                }
                .prop-input-area {
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    width: 100%;
                    padding: 2px 4px;
                    border-radius: 4px;
                    resize: none;
                    transition: background 0.2s;
                    line-height: 1.5;
                    color: inherit;
                }
                .prop-input-area:hover { background: rgba(128,128,128,0.06); }
            `}</style>
        </div>
    )
}

function PropertyItem({ icon, label, children }: { icon: any, label: string, children: any }) {
    return (
        <div className="flex items-start gap-4 py-1.5 px-1.5 rounded-md hover:bg-foreground/[0.015] group transition-colors min-h-[34px]">
            <div className="flex items-center gap-2 w-32 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors pt-0.5">
                <span className="scale-90">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="flex-1 min-w-0">
                {children}
            </div>
        </div>
    )
}

function CatSelect({ current = "", onChange }: { current?: string, onChange: (v: string) => void }) {
    const cats = ["General", "DevLog", "AI", "Life", "Idea"]
    const allUniqueCats = Array.from(new Set([...cats, current])).filter(Boolean)

    return (
        <div className="flex flex-wrap gap-1">
            {allUniqueCats.map(c => (
                <button
                    key={c}
                    onClick={() => onChange(c)}
                    className={`h-6 px-2.5 rounded text-[13px] font-medium transition-all ${current === c ? "bg-foreground text-background" : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]"
                        }`}
                >
                    {c}
                </button>
            ))}
            <input
                className="h-6 px-2 text-[13px] bg-transparent border-none outline-none text-muted-foreground/30 hover:text-foreground w-20 focus:w-32 transition-all"
                placeholder="+ Add"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        const val = (e.target as any).value.trim();
                        if (val) {
                            onChange(val);
                            (e.target as any).value = "";
                        }
                    }
                }}
            />
        </div>
    )
}

function TagInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    const tags = value ? value.split(",").map(t => t.trim()).filter(Boolean) : []
    const [input, setInput] = useState("")

    return (
        <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map(t => (
                <span key={t} className="h-6 px-2 flex items-center gap-1.5 bg-foreground/[0.04] border border-border/40 rounded text-[13px] text-foreground/80 group/tag">
                    {t}
                    <button onClick={() => onChange(tags.filter(x => x !== t).join(", "))} className="opacity-0 group-hover/tag:opacity-100"><X size={12} /></button>
                </span>
            ))}
            <input
                className="h-6 px-1 text-[13px] bg-transparent border-none outline-none text-muted-foreground/30 hover:text-foreground min-w-[60px]"
                value={input}
                placeholder={tags.length ? "" : "Add tags..."}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault()
                        if (input && !tags.includes(input)) onChange([...tags, input].join(", "))
                        setInput("")
                    }
                }}
            />
        </div>
    )
}
