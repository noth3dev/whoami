"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Award as AwardType } from "@/types"
import { getAwards } from "@/lib/data-service"
import { Trophy, Calendar, ExternalLink, Award as AwardIcon } from "lucide-react"

export default function AwardsSection({ sectionRef }: { sectionRef: (el: HTMLElement | null) => void }) {
    const [awards, setAwards] = useState<AwardType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAwards() {
            try {
                const data = await getAwards()
                setAwards(data)
            } catch (error) {
                console.error("Error fetching awards:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchAwards()
    }, [])

    if (!loading && awards.length === 0) return null

    return (
        <section id="awards" ref={sectionRef} className="py-24 sm:py-32 scroll-mt-20">
            <div className="space-y-4 mb-16">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-foreground/[0.03] rounded-lg border border-border">
                        <AwardIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-light tracking-tight">Awards & Recognition</h2>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                    실적과 노력을 인정받은 순간들을 기록합니다.
                </p>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    <div className="flex flex-col gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-foreground/[0.02] border border-border rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    awards.map((award, index) => (
                        <motion.div
                            key={award.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 border border-border rounded-2xl hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5 bg-foreground/[0.01]"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                                        <Calendar className="w-3 h-3" />
                                        <span>{award.date}</span>
                                        <span className="mx-1">•</span>
                                        <span className="text-foreground/60">{award.organization}</span>
                                    </div>
                                    <h3 className="text-xl font-medium flex items-center gap-2 group-hover:text-foreground transition-colors">
                                        <Trophy className="w-5 h-5 text-yellow-500/80" />
                                        {award.title}
                                    </h3>
                                    {award.description && (
                                        <p className="text-muted-foreground leading-relaxed max-w-3xl">
                                            {award.description}
                                        </p>
                                    )}
                                </div>
                                {award.link && (
                                    <a
                                        href={award.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 border border-border rounded-full hover:border-foreground/20 hover:bg-foreground/[0.05] transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    )
}
