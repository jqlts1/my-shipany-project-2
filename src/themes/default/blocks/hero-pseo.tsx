import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { Link } from '@/core/i18n/navigation';
import { Section } from '@/shared/types/blocks/landing';

export function HeroPseo({
  section,
  className,
  title,
  description,
  eyebrow_text,
  buttons,
  announcement,
}: {
  section?: Section;
  className?: string;
  title?: string;
  description?: string;
  eyebrow_text?: string;
  buttons?: any[];
  announcement?: any;
}) {
  // optionally fallback to section if not spread
  title = title || section?.title;
  description = description || section?.description;
  buttons = buttons || section?.buttons;
  
  return (
    <section
      id={section?.id}
      className={cn(
        'relative w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800',
        section?.className,
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        {eyebrow_text && (
          <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1 text-sm font-medium text-slate-800 dark:text-slate-200 mb-6 font-mono">
             {eyebrow_text}
          </div>
        )}

        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 text-balance leading-tight drop-shadow-sm"
          dangerouslySetInnerHTML={{ __html: title || '' }}
        />

        {description && (
          <p 
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed text-balance"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {buttons?.map((button, idx) => (
            <Button
              asChild
              size="lg"
              className={cn(
                "rounded-full h-12 px-8 text-base font-medium transition-all duration-300",
                idx === 0 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5" 
                  : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-transparent dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm"
              )}
              key={idx}
            >
              <Link href={button.url ?? ''} target={button.target ?? '_self'}>
                {button.icon && <SmartIcon name={button.icon as string} className="mr-2 size-4" />}
                <span>{button.title || button.text}</span>
                {idx === 0 && <ArrowRight className="ml-2 size-4" />}
              </Link>
            </Button>
          ))}
        </div>

        {announcement && (
           <p className="mt-8 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 inline-block px-4 py-1.5 rounded-full">
             {announcement.title}
           </p>
        )}
      </div>
    </section>
  );
}
