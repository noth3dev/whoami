"use client"

import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useTheme } from "next-themes"
import { useEffect, useState, useMemo } from "react"
import { MonitorPlay, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

interface BlockNoteViewerProps {
    initialContent: string
}

export default function BlockNoteViewer({ initialContent }: BlockNoteViewerProps) {
    const { theme } = useTheme()
    const [blocksLoaded, setBlocksLoaded] = useState(false)

    const [activePpt, setActivePpt] = useState<string | null>(null)

    const editor = useCreateBlockNote()

    useEffect(() => {
        async function load() {
            if (initialContent) {
                const blocks = await editor.tryParseMarkdownToBlocks(initialContent)
                editor.replaceBlocks(editor.topLevelBlocks, blocks)
                setBlocksLoaded(true)
            }
        }
        load()
    }, [initialContent, editor])

    // Find all PPT links in the content
    const pptFiles = useMemo(() => {
        const ppts: { name: string, url: string }[] = []
        
        // Simple regex to find PPT links in markdown or links
        const pptRegex = /\[([^\]]+)\]\(([^)]+\.(?:ppt|pptx)[^)]*)\)/gi
        let match
        while ((match = pptRegex.exec(initialContent)) !== null) {
            ppts.push({ name: match[1], url: match[2] })
        }
        
        return ppts
    }, [initialContent])

    return (
        <div className="notion-viewer relative">
            {/* PPT Floating Player Entry (if PPTs found) */}
            {pptFiles.length > 0 && (
                <div className="mb-8 p-4 bg-foreground/[0.02] border border-border/50 rounded-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        <MonitorPlay size={14} />
                        Found {pptFiles.length} Presentations
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {pptFiles.map((ppt, i) => (
                            <button
                                key={i}
                                onClick={() => setActivePpt(ppt.url)}
                                className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-foreground/5 flex items-center gap-2"
                            >
                                <MonitorPlay size={16} />
                                Play {ppt.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <BlockNoteView
                editor={editor}
                theme={theme === "light" ? "light" : "dark"}
                editable={false}
                sideMenu={false}
                slashMenu={false}
                className={`transition-opacity duration-500 ${blocksLoaded ? "opacity-100" : "opacity-0"}`}
            />

            {/* PPT Slideshow Overlay */}
            {activePpt && (
                <div 
                    id="ppt-fullscreen-container"
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black animate-in fade-in duration-500"
                >
                    <div className="absolute top-6 right-6 flex items-center gap-3 z-[210]">
                        <button 
                            onClick={() => {
                                const el = document.getElementById('ppt-fullscreen-container');
                                if (el) {
                                    if (document.fullscreenElement) {
                                        document.exitFullscreen();
                                    } else {
                                        el.requestFullscreen();
                                    }
                                }
                            }}
                            className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl text-white/70 hover:text-white transition-all border border-white/5"
                            title="Toggle Fullscreen"
                        >
                            <Maximize2 size={20} />
                        </button>
                        <button 
                            onClick={() => {
                                if (document.fullscreenElement) document.exitFullscreen();
                                setActivePpt(null);
                            }}
                            className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl text-white/70 hover:text-white transition-all border border-white/5"
                            title="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="w-full h-full">
                        <iframe 
                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(activePpt)}&wdAr=1.7777777777777777`}
                            className="w-full h-full border-none"
                            title="PPT Slideshow"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
            <style jsx global>{`
                .notion-viewer .bn-container {
                    background-color: transparent !important;
                    padding: 0 !important;
                }
                .notion-viewer .bn-editor {
                    padding: 0 !important;
                    background: transparent !important;
                    color: inherit !important;
                }
                .notion-viewer .bn-editor p {
                    font-size: 1.125rem !important;
                    line-height: 1.8 !important;
                    margin-bottom: 1.25rem !important;
                    opacity: 0.85;
                    font-weight: 300;
                }
                .notion-viewer .bn-editor h1 {
                    font-size: 2.5rem !important;
                    font-weight: 700 !important;
                    margin-top: 3.5rem !important;
                    margin-bottom: 1.5rem !important;
                    letter-spacing: -0.02em !important;
                    line-height: 1.2 !important;
                }
                .notion-viewer .bn-editor h2 {
                    font-size: 1.85rem !important;
                    font-weight: 600 !important;
                    margin-top: 2.5rem !important;
                    margin-bottom: 1rem !important;
                    letter-spacing: -0.01em !important;
                }
                .notion-viewer .bn-editor h3 {
                    font-size: 1.4rem !important;
                    font-weight: 600 !important;
                    margin-top: 2rem !important;
                }
                .notion-viewer .bn-editor img {
                    border-radius: 1.5rem !important;
                    border: 1px solid var(--border) !important;
                    margin: 3rem 0 !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .notion-viewer .bn-editor blockquote {
                    border-left: 3px solid var(--foreground) !important;
                    padding-left: 1.5rem !important;
                    margin: 2rem 0 !important;
                    font-style: italic !important;
                    opacity: 0.8 !important;
                }
                .notion-viewer .bn-editor pre, .notion-viewer .bn-editor code {
                    background: var(--foreground-05, rgba(128,128,128,0.1)) !important;
                    border-radius: 8px !important;
                    font-family: var(--font-fira-code), monospace !important;
                }
                .notion-viewer .bn-editor ul, .notion-viewer .bn-editor ol {
                    margin-bottom: 1.5rem !important;
                    padding-left: 1.5rem !important;
                }
                .notion-viewer .bn-editor li {
                    margin-bottom: 0.5rem !important;
                    opacity: 0.85;
                }
                
                /* Force any link that looks like a file or is in a file-block to look like a card */
                .notion-viewer .bn-editor a,
                .notion-viewer .bn-file-block,
                .notion-viewer [data-content-type="file"] {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    background: var(--foreground-05, rgba(128,128,128,0.06)) !important;
                    border: 1px solid var(--border) !important;
                    border-radius: 8px !important;
                    padding: 6px 12px !important;
                    margin: 4px 0 !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: 0.95rem !important;
                    font-weight: 500 !important;
                    transition: all 0.2s ease !important;
                }

                .notion-viewer .bn-editor a:hover,
                .notion-viewer .bn-file-block:hover {
                    background: var(--foreground-05, rgba(128,128,128,0.12)) !important;
                    border-color: var(--foreground-20, rgba(128,128,128,0.4)) !important;
                }

                .notion-viewer .bn-editor a::before,
                .notion-viewer .bn-file-block::before {
                    content: "";
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3C/svg%3E");
                    background-size: contain;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    opacity: 0.6;
                }
                
                /* Video / Audio Blocks */
                .notion-viewer .bn-video-block, 
                .notion-viewer .bn-audio-block {
                    margin: 2rem 0 !important;
                    border-radius: 16px !important;
                    overflow: hidden !important;
                    border: 1px solid var(--border) !important;
                }
                
                /* Table Styles */
                .notion-viewer table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin: 2rem 0 !important;
                }
                .notion-viewer th, .notion-viewer td {
                    border: 1px solid var(--border) !important;
                    padding: 12px !important;
                    text-align: left !important;
                }
                .notion-viewer th {
                    background: var(--foreground-05, rgba(128,128,128,0.05)) !important;
                    font-weight: 600 !important;
                }
            `}</style>
        </div>
    )
}
