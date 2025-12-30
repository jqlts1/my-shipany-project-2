"use client";

import { Section } from '@/shared/types/blocks/landing';
import { cn } from '@/shared/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';

export function BrandStory({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section
      id={section.id}
      ref={containerRef}
      className={cn(
        'relative py-24 md:py-32 overflow-hidden flex items-center justify-center min-h-[60vh]',
        section.className,
        className
      )}
    >
      {/* Dynamic Background - Breathing Gradient */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] bg-teal-500/20 dark:bg-teal-500/10 blur-[100px] rounded-full"
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
            }}
            className="absolute w-[50vw] h-[50vw] md:w-[500px] md:h-[500px] bg-blue-400/20 dark:bg-blue-400/10 blur-[80px] rounded-full"
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            
            {/* Pill Label */}
            <ScrollAnimation>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50/80 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30 backdrop-blur-sm mb-6">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                    </span>
                    <span className="text-sm font-medium text-teal-800 dark:text-teal-200">
                        Concept
                    </span>
                </div>
            </ScrollAnimation>

            {/* Main Headline */}
            <ScrollAnimation delay={0.1}>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    {section.title}
                </h2>
            </ScrollAnimation>

            {/* Editorial Line Info */}
            <ScrollAnimation delay={0.2}>
                 <div className="w-24 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto opacity-50" />
            </ScrollAnimation>

            {/* Description / Story */}
            <ScrollAnimation delay={0.3}>
                <div className="prose prose-lg md:prose-xl dark:prose-invert mx-auto text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                     <p>
                        {section.description}
                     </p>
                </div>
            </ScrollAnimation>

            {/* Feature Cards Grid */}
            {section.items && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
                {section.items.map((item, idx) => (
                  <ScrollAnimation key={idx} delay={0.4 + idx * 0.1}>
                    <div className="group relative h-full p-6 rounded-2xl bg-white/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800/50 hover:shadow-lg hover:shadow-teal-900/5 transition-all duration-300">
                      <div className="text-teal-600 dark:text-teal-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                         {/* We assume SmartIcon is available or use a simple div if not imported. 
                             Need to check imports. Hero has SmartIcon. */}
                         <div className="text-2xl font-bold">
                            0{idx + 1}
                         </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
