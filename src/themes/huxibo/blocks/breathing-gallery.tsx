'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function BreathingGallery({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id={section.id}
      className={cn('py-24 relative overflow-hidden', section.className, className)}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50 pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              {section.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {section.description}
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="size-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 transition-colors"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="size-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 transition-colors"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.items?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="min-w-[300px] md:min-w-[380px] snap-center"
            >
              <div className="group h-full p-8 rounded-[32px] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-100/50 dark:hover:border-teal-900/30 transition-all duration-500 relative overflow-hidden">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent dark:from-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                     <div className="size-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-500">
                        <SmartIcon name={item.icon as string} className="size-7" />
                     </div>
                     {item.label && (
                       <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                         {item.label}
                       </span>
                     )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 font-serif group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {item.description}
                  </p>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>开始练习</span>
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Padding for end of scroll */}
          <div className="min-w-[20px] md:min-w-[0px]" /> 
        </div>
      </div>
    </section>
  );
}
