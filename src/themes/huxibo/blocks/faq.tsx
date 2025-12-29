'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { Section } from '@/shared/types/blocks/landing';

export function Faq({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section id={section.id} className={`py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/50 ${className}`}>
      <div className={`mx-auto max-w-full px-4 md:max-w-3xl md:px-8`}>
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center text-balance">
            <h2 className="text-foreground mb-6 text-3xl font-serif font-bold tracking-tight md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mx-auto mt-8 max-w-full space-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
            >
              {section.items?.map((item, idx) => (
                <AccordionItem
                    key={idx}
                    value={item.question || item.title || ''}
                    className="border-none rounded-2xl bg-white dark:bg-slate-950 px-6 py-2 shadow-sm data-[state=open]:shadow-md transition-all"
                >
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-4">
                      {item.question || item.title || ''}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {item.answer || item.description || ''}
                    </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div 
              className="text-center text-muted-foreground mt-8 px-8"
              dangerouslySetInnerHTML={{ __html: section.tip || '' }}
            />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
