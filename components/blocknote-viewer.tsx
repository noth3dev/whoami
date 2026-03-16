"use client"

import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface BlockNoteViewerProps {
    initialContent: string
}

export default function BlockNoteViewer({ initialContent }: BlockNoteViewerProps) {
    const { theme } = useTheme()
    const [blocksLoaded, setBlocksLoaded] = useState(false)

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

    return (
        <div className="notion-viewer">
            <BlockNoteView
                editor={editor}
                theme={theme === "light" ? "light" : "dark"}
                editable={false}
                sideMenu={false}
                slashMenu={false}
                className={`transition-opacity duration-500 ${blocksLoaded ? "opacity-100" : "opacity-0"}`}
            />
            <style jsx global>{`
                .notion-viewer .bn-container {
                    background-color: transparent !important;
                    padding: 0 !important;
                }
                .notion-viewer .bn-editor {
                    padding: 0 !important;
                    background: transparent !important;
                }
                .notion-viewer .bn-editor p {
                    font-size: 1.125rem !important;
                    line-height: 1.75 !important;
                    opacity: 0.9;
                }
                .notion-viewer .bn-editor h1 {
                    font-size: 2.25rem !important;
                    font-weight: 700 !important;
                    margin-top: 2rem !important;
                    margin-bottom: 1rem !important;
                }
                .notion-viewer .bn-editor h2 {
                    font-size: 1.75rem !important;
                    font-weight: 600 !important;
                    margin-top: 1.5rem !important;
                    margin-bottom: 0.75rem !important;
                }
                .notion-viewer .bn-editor img {
                    border-radius: 1rem !important;
                    border: 1px solid var(--border) !important;
                    margin: 2rem 0 !important;
                }
            `}</style>
        </div>
    )
}
