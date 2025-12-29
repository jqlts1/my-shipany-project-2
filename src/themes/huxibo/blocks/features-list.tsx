'use client';

import { Link } from '@/core/i18n/navigation';
import { LazyImage, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function FeaturesList({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'overflow-x-hidden py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900',
        section.className,
        className
      )}
    >
      <div className="container overflow-x-hidden">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-16">
          <ScrollAnimation direction="right" className="flex-1 order-2 md:order-1">
             <div className="max-w-xl">
                <h2 className="text-foreground text-4xl lg:text-5xl font-serif font-bold text-balance leading-tight">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground my-6 leading-relaxed text-balance">
                  {section.description}
                </p>

                {section.buttons && section.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-8">
                    {section.buttons?.map((button, idx) => (
                      <Button
                        asChild
                        key={idx}
                        variant={button.variant || 'default'}
                        size="lg"
                        className={cn(
                             "rounded-full px-8",
                             button.variant === 'outline' 
                             ? "border-2 border-slate-200 dark:border-slate-800"
                             : "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20"
                        )}
                      >
                        <Link
                          href={button.url ?? ''}
                          target={button.target ?? '_self'}
                        >
                          {button.icon && (
                            <SmartIcon name={button.icon as string} className="mr-2 size-5" />
                          )}
                          {button.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
             </div>
          </ScrollAnimation>

          {/* Vertical Phone Mockup */}
          <ScrollAnimation direction="left" className="w-full md:w-auto flex-shrink-0 order-1 md:order-2 flex justify-center">
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[40px] border-[4px] border-slate-200/50 dark:border-slate-700/50 bg-slate-950 shadow-2xl shadow-teal-900/20 overflow-hidden ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm">
                 {/* Glossy Reflection */}
                 <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent z-40 pointer-events-none opacity-40 rounded-t-[36px]" />
                 <LazyImage
                    src={section.image?.src ?? ''}
                    alt={section.image?.alt ?? ''}
                    className="size-full object-cover"
                 />
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.items?.map((item, idx) => (
              <div 
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1" 
                key={idx}
              >
                <div className="size-12 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon && (
                    <SmartIcon name={item.icon as string} size={24} />
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description ?? ''}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
