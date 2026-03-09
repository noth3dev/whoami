"use client"

import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { uploadMedia } from "@/lib/supabase"

interface EditorProps {
    initialContent?: string
    onChange: (content: string) => void
}

export default function Editor({ initialContent, onChange }: EditorProps) {
    const { theme } = useTheme()

    const editor = useCreateBlockNote({
        uploadFile: async (file: File) => {
            const url = await uploadMedia(file);
            return url || "";
        }
    })

    // Load initial content from Markdown
    useEffect(() => {
        async function loadInitial() {
            if (initialContent && editor.topLevelBlocks.length <= 1 &&
                (editor.topLevelBlocks[0]?.content as any)?.length === 0) {
                const blocks = await editor.tryParseMarkdownToBlocks(initialContent)
                editor.replaceBlocks(editor.topLevelBlocks, blocks)
            }
        }
        loadInitial()
    }, [initialContent, editor])

    return (
        <div className="relative group">
            <div className="border border-border/50 rounded-2xl overflow-hidden bg-background min-h-[500px] shadow-sm group-hover:shadow-xl group-hover:border-foreground/10 transition-all duration-500">
                <BlockNoteView
                    editor={editor}
                    theme={theme === "light" ? "light" : "dark"}
                    sideMenu={true}
                    slashMenu={true}
                    onChange={async () => {
                        const markdown = await editor.blocksToMarkdownLossy(editor.topLevelBlocks)
                        onChange(markdown)
                    }}
                    className="py-12"
                />
            </div>
            <div className="mt-2 flex justify-between items-center text-[10px] font-mono text-muted-foreground px-2">
                <span>Markdown support enabled</span>
                <span>/ for commands</span>
            </div>
            <style jsx global>{`
                .bn-editor {
                    padding-inline: 40px !important;
                }
                .bn-block-content {
                    margin-bottom: 2px !important;
                }
                .bn-side-menu {
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .bn-editor:hover .bn-side-menu {
                    opacity: 1;
                }
                /* Notion-like typography */
                .bn-editor h1 { font-weight: 700 !important; letter-spacing: -0.02em !important; margin-top: 1.5em !important; }
                .bn-editor h2 { font-weight: 600 !important; letter-spacing: -0.01em !important; margin-top: 1.25em !important; }
                .bn-editor p { line-height: 1.65 !important; }
            `}</style>
        </div>
    )
}
