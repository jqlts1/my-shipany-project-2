'use client';

import { motion } from 'motion/react';
import { LazyImage } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Logos({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const items = section.items || [];
  // Duplicate items to ensure seamless loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section
      id={section.id}
      className={cn('py-12 border-y border-slate-100 dark:border-slate-800/50 overflow-hidden relative', section.className, className)}
    >
       {/* Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container px-0">
        <div className="text-center mb-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
            </p>
        </div>

        <div className="flex overflow-hidden select-none mask-image-linear-to-r">
            <motion.div
              className="flex gap-12 items-center flex-nowrap pr-12"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeItems.map((item, idx) => (
                <div key={idx} className="relative flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                     <div className="h-8 w-32 grayscale opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <LazyImage
                            src={item.image.src ?? ''}
                            alt={item.image.alt ?? ''}
                            className="h-full w-full object-contain dark:invert"
                        />
                     </div>
                  ) : (
                      <span className="text-xl md:text-2xl font-serif font-bold text-slate-300 dark:text-slate-700 whitespace-nowrap px-4">
                          {item.title}
                      </span>
                  )}
                </div>
              ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
