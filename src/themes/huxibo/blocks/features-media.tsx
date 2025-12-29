'use client';

import { motion } from 'motion/react';

import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';

export function FeaturesMedia({ section }: { section: Section }) {
  const imagePosition = section.image_position || 'left';
  const isImageRight = imagePosition === 'right';

  return (
    <section
      id={section.id || section.name}
      className={cn('py-24 md:py-32 overflow-hidden relative', section.className)}
    >
      {/* Dynamic Background Element (Optional) */}
       <div className={cn(
           "absolute pointer-events-none -z-10 blur-3xl opacity-30 w-[500px] h-[500px] rounded-full",
           isImageRight ? "left-0 top-1/2 -translate-y-1/2 bg-teal-500/20" : "right-0 top-1/2 -translate-y-1/2 bg-blue-500/20"
       )} />

      <div className="container px-6">
        <div
          className={cn(
            'flex flex-col md:flex-row items-center gap-12 lg:gap-24',
            isImageRight ? 'md:flex-row-reverse' : ''
          )}
        >
          {/* Visual Side (Phone Frame) */}
          <ScrollAnimation 
            direction={isImageRight ? 'left' : 'right'} 
            className="w-full md:w-1/2 flex justify-center"
          >
             <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[48px] border-[6px] border-slate-200 dark:border-slate-700 bg-slate-950 shadow-2xl shadow-teal-900/20 overflow-hidden ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm transform transition-transform hover:scale-[1.02] duration-500">
                 {/* Glossy Reflection */}
                 <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent z-40 pointer-events-none opacity-40 rounded-t-[42px]" />
                 <LazyImage
                    src={section.image?.src ?? ''}
                    alt={section.image?.alt ?? ''}
                    className="size-full object-cover"
                 />
            </div>
          </ScrollAnimation>

          {/* Content Side */}
          <ScrollAnimation 
             direction={isImageRight ? 'right' : 'left'}
             className="w-full md:w-1/2 space-y-8"
          >
            <div>
                <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {section.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                {section.description}
                </p>
            </div>

            <div className="grid gap-6">
              {section.items?.map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 size-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                    <SmartIcon name={item.icon as string} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                        {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
