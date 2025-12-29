'use client';

import { motion } from 'motion/react';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function BenefitsGrid({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-32 relative overflow-hidden', section.className, className)}
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className={`container space-y-16 md:space-y-24`}>
        <ScrollAnimation>
          <div className="mx-auto max-w-3xl text-center text-balance">
            <h2 className="text-foreground mb-6 text-3xl font-serif font-bold tracking-tight md:text-5xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section.items?.map((item, idx) => (
            <ScrollAnimation key={idx} delay={idx * 0.1} className="h-full">
              <div 
                className="group relative h-full p-8 md:p-10 rounded-[32px] bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-teal-100 dark:hover:border-teal-900/30 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/10 flex flex-col items-center text-center"
              >
                <div className="size-20 rounded-3xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out">
                   <SmartIcon name={item.icon as string} className="size-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
                    {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {item.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
