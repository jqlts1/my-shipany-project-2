'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { BorderBeam } from '@/shared/components/magicui/border-beam';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function FeaturesAccordion({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeItem, setActiveItem] = useState<string>('item-1');

  const images: any = {};
  section.items?.forEach((item, idx) => {
    images[`item-${idx + 1}`] = {
      image: item.image?.src ?? '',
      alt: item.image?.alt || item.title || '',
    };
  });

  return (
    <section
      className={cn(
        'overflow-x-hidden py-16 md:py-24 relative',
        section.className,
        className
      )}
    >
       {/* Background Decoration */}
       <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-radial from-teal-50/50 to-transparent dark:from-teal-950/20 -z-10 blur-3xl pointer-events-none" />

      <div className="container space-y-12 lg:space-y-20">
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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Accordion List */}
          <ScrollAnimation delay={0.1} direction="right" className="order-2 lg:order-1">
            <Accordion
              type="single"
              value={activeItem}
              onValueChange={(value) => setActiveItem(value as string)}
              className="w-full space-y-4"
            >
              {section.items?.map((item, idx) => (
                <AccordionItem 
                    value={`item-${idx + 1}`} 
                    key={idx}
                    className="border-none rounded-2xl bg-white/50 dark:bg-slate-900/50 px-6 py-2 transition-all data-[state=open]:bg-white dark:data-[state=open]:bg-slate-900 data-[state=open]:shadow-lg data-[state=open]:shadow-teal-900/5"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className={cn(
                          "flex items-center justify-center size-10 rounded-full transition-colors",
                          activeItem === `item-${idx + 1}` 
                            ? "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      )}>
                        {item.icon && (
                            <SmartIcon name={item.icon as string} size={20} />
                        )}
                      </div>
                      <span className={cn(
                          "text-lg font-bold transition-colors",
                          activeItem === `item-${idx + 1}` ? "text-teal-700 dark:text-teal-400" : "text-foreground"
                      )}>
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-6 text-base text-muted-foreground leading-relaxed">
                      {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimation>

          {/* Vertical Phone Display */}
          <ScrollAnimation delay={0.2} direction="left" className="order-1 lg:order-2 flex justify-center">
             <div className="relative w-[300px] sm:w-[340px] aspect-[9/19]">
                {/* Phone Frame */}
                <div className="absolute inset-0 rounded-[48px] border-[6px] border-slate-200 dark:border-slate-700 bg-slate-950 shadow-2xl shadow-teal-900/20 z-20 overflow-hidden ring-1 ring-black/5 pointer-events-none">
                     {/* Reflection */}
                     <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent z-30 opacity-30" />
                </div>
                
                {/* Content Area */}
                <div className="absolute inset-[6px] rounded-[42px] overflow-hidden bg-slate-900 z-10">
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeItem}-id`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="size-full"
                    >
                        <LazyImage
                        src={images[activeItem].image}
                        className="size-full object-cover"
                        alt={images[activeItem].alt}
                        />
                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
