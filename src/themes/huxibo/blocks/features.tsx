'use client';

import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-32', section.className, className)}
    >
      <div className={`container space-y-12 md:space-y-20`}>
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

        <ScrollAnimation delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {section.items?.map((item, idx) => (
              <div 
                className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 hover:-translate-y-1" 
                key={idx}
              >
                <div className="size-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <SmartIcon name={item.icon as string} className="size-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
