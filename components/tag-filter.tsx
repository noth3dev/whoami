"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface TagFilterProps {
  items: string[]
  onSelectionChange: (selected: string[]) => void
}

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

export default function TagFilter({ items, onSelectionChange }: TagFilterProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    const newSelected = selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag]
    setSelected(newSelected)
    onSelectionChange(newSelected)
  }

  return (
    <motion.div
      className="flex flex-wrap gap-3 overflow-visible"
      layout
      transition={transitionProps}
    >
      {items.map((item) => {
        const isSelected = selected.includes(item)
        return (
          <motion.button
            key={item}
            onClick={() => toggleTag(item)}
            layout
            initial={false}
            animate={{
              backgroundColor: isSelected ? "rgba(6, 78, 59, 1)" : "rgba(39, 39, 42, 0.5)",
            }}
            whileHover={{
              backgroundColor: isSelected ? "rgba(6, 78, 59, 1)" : "rgba(39, 39, 42, 0.8)",
            }}
            whileTap={{
              backgroundColor: isSelected ? "rgba(6, 95, 70, 1)" : "rgba(39, 39, 42, 0.9)",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
              backgroundColor: { duration: 0.1 },
            }}
            className={`
              inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
              whitespace-nowrap overflow-hidden ring-1 ring-inset
              transition-all duration-300
              ${
                isSelected
                  ? "text-emerald-400 ring-[hsla(0,0%,100%,0.12)]"
                  : "text-zinc-400 ring-[hsla(0,0%,100%,0.06)]"
              }
            `}
          >
            <motion.div
              className="relative flex items-center"
              animate={{
                width: isSelected ? "auto" : "100%",
                paddingRight: isSelected ? "1.5rem" : "0",
              }}
              transition={{
                ease: [0.175, 0.885, 0.32, 1.275],
                duration: 0.3,
              }}
            >
              <span>{item}</span>
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={transitionProps}
                    className="absolute right-0"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#064e3b]" strokeWidth={1.5} />
                    </div>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}