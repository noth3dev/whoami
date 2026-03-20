"use client"

import Link from "next/link"
import Navigation from "@/components/navigation"
import { useState, useEffect, useRef } from "react"
import { Project } from "@/types"
import { getProjects } from "@/lib/data-service"
import { motion } from "framer-motion"

import ReactMarkdown from "react-markdown"
import * as LucideIcons from "lucide-react"

// Helper to render dynamic icon
const ProjectIcon = ({ name, className }: { name?: string, className?: string }) => {
    if (!name) return null;
    const Icon = (LucideIcons as any)[name];
    if (!Icon) return null;
    return <Icon className={className} />;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [displayItems, setDisplayItems] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0)
    const lastScrollY = useRef(0)
    const leftPaneRef = useRef<HTMLDivElement>(null)
    const initialScrolled = useRef(false)

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects()
                if (data && data.length > 0) {
                    setProjects(data)
                    setDisplayItems(Array(20).fill(data).flat())
                }
            } catch (error) {
                console.error("Error loading projects:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProjects()
    }, [])

    useEffect(() => {
        if (!loading && displayItems.length > 0 && leftPaneRef.current && !initialScrolled.current) {
            const pane = leftPaneRef.current;
            pane.scrollTop = pane.scrollHeight / 2 - pane.clientHeight / 2;
            initialScrolled.current = true;
        }
    }, [loading, displayItems.length]);

    const projectsRef = useRef(projects);
    const displayItemsRef = useRef(displayItems);

    useEffect(() => {
        projectsRef.current = projects;
    }, [projects]);

    useEffect(() => {
        displayItemsRef.current = displayItems;
    }, [displayItems]);

    useEffect(() => {
        const leftPane = leftPaneRef.current;
        if (loading || projects.length === 0 || !leftPane) return;

        const handleScroll = () => {
            const scrollY = leftPane.scrollTop;
            if (Math.abs(scrollY - lastScrollY.current) > 2) {
                const items = leftPane.querySelectorAll('.project-item');
                const paneRect = leftPane.getBoundingClientRect();
                const centerY = paneRect.top + paneRect.height / 2;
                
                let closestIndex = 0;
                let minDistance = Infinity;

                items.forEach((item, index) => {
                    const rect = item.getBoundingClientRect();
                    const d = Math.abs((rect.top + rect.height / 2) - centerY);
                    if (d < minDistance) {
                        minDistance = d;
                        closestIndex = index;
                    }
                });
                setActiveIndex(closestIndex);
                lastScrollY.current = scrollY;
            }

            const docHeight = leftPane.scrollHeight;
            const winHeight = leftPane.clientHeight;

            if (scrollY > docHeight - winHeight * 3) {
                const p = projectsRef.current;
                setDisplayItems(prev => {
                    const next = [...prev, ...p];
                    if (next.length > 400) return next.slice(p.length);
                    return next;
                });
            }

            if (scrollY < winHeight * 2 && displayItemsRef.current.length > 0) {
                const p = projectsRef.current;
                const prevScrollTop = leftPane.scrollTop;
                const prevScrollHeight = leftPane.scrollHeight;
                setDisplayItems(prev => [...p, ...prev]);
                requestAnimationFrame(() => {
                    if (leftPane) {
                        const newScrollHeight = leftPane.scrollHeight;
                        const heightAdded = newScrollHeight - prevScrollHeight;
                        leftPane.scrollTop = prevScrollTop + heightAdded;
                    }
                });
            }
        };

        leftPane.addEventListener('scroll', handleScroll, { passive: true });
        return () => leftPane.removeEventListener('scroll', handleScroll);
    }, [loading, projects.length]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col uppercase font-bebas tracking-widest">
                <Navigation />
                <main className="flex-1 flex items-center justify-center text-4xl opacity-20">
                    Loading Projects...
                </main>
            </div>
        )
    }

    const currentProject = projects[activeIndex % projects.length] || projects[0];

    return (
        <div className="h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-hidden flex flex-col">
            <Navigation />
            
            <main className="flex-1 flex flex-col lg:flex-row border-t border-border overflow-hidden">
                <div 
                    ref={leftPaneRef}
                    className="w-full lg:w-3/5 h-full overflow-y-auto snap-y snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex flex-col items-start px-6 sm:px-16 pt-[30vh] pb-[30vh]">
                        {displayItems.length > 0 ? (
                            displayItems.map((project, index) => {
                                const isHighlighted = index === activeIndex;
                                
                                return (
                                    <div 
                                        key={`${project.id}-${index}`}
                                        className="project-item py-1 w-full snap-center"
                                        style={{ contentVisibility: 'auto' }}
                                    >
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ 
                                                x: isHighlighted ? 40 : 0, 
                                                opacity: isHighlighted ? 1 : 0.15
                                            }}
                                            transition={{ 
                                                type: "tween",
                                                ease: "circOut",
                                                duration: 0.3
                                            }}
                                            className="relative py-2 cursor-pointer flex items-center gap-6"
                                            onClick={() => {
                                                const items = leftPaneRef.current?.querySelectorAll('.project-item');
                                                items?.[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                        >
                                            {isHighlighted && project.icon && (
                                                <ProjectIcon name={project.icon} className="w-[6vw] h-[6vw] min-w-[6vw] text-foreground" />
                                            )}
                                            <span className={`block font-bebas leading-[0.75] tracking-tighter transition-all duration-300 text-[12vw] sm:text-[9vw] ${isHighlighted ? 'text-foreground' : 'text-muted-foreground/30'}`}>
                                                {project.title.toUpperCase()}
                                            </span>
                                        </motion.div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="h-[200vh] w-full" />
                        )}
                    </div>
                </div>

                <div className="hidden lg:block w-2/5 h-full overflow-y-auto bg-background/50 backdrop-blur-sm">
                    <motion.div
                        key={currentProject?.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="p-12 sm:p-20 space-y-16"
                    >
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 text-[10px] font-mono uppercase opacity-40">
                                <span className="text-foreground font-black">{currentProject?.year}</span>
                                <div className="w-12 h-[1px] bg-foreground/20" />
                                <span>{currentProject?.category}</span>
                            </div>
                            <h2 className="text-6xl font-black tracking-tighter leading-[0.9] uppercase break-words">
                                {currentProject?.title}
                            </h2>
                            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
                                {currentProject?.description}
                            </p>
                        </div>

                        {currentProject?.image && (
                            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                                <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                            </div>
                        )}

                        <article className="prose prose-invert prose-lg max-w-none 
                            prose-headings:font-bebas prose-headings:tracking-widest prose-headings:uppercase prose-headings:text-foreground
                            prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed
                            prose-img:rounded-3xl prose-img:border prose-img:border-border/50 prose-img:shadow-xl
                            prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
                        ">
                            <ReactMarkdown components={{ img: ({ ...props }) => <img {...props} className="w-full h-auto my-12" /> }}>
                                {currentProject?.content || ''}
                            </ReactMarkdown>
                        </article>

                        <div className="flex flex-wrap gap-3 pt-8 border-t border-border/20">
                            {currentProject?.tags?.map(tag => (
                                <span key={tag} className="px-4 py-1.5 bg-foreground/5 border border-border/50 rounded-full text-[9px] font-mono uppercase tracking-widest opacity-60">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="h-20" />
                    </motion.div>
                </div>
            </main>

            <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-5 select-none overflow-hidden h-full">
                <span className="text-[35vw] font-bebas text-foreground absolute -right-[15vw] rotate-90 leading-none">ARCHIVE</span>
            </div>
        </div>
    )
}
