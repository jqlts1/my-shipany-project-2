'use client';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Cta({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-24 md:py-32 overflow-hidden', section.className, className)}
    >
       {/* Background Aurora */}
       <div className="absolute inset-0 bg-slate-900 -z-20" />
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] -z-10" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />
       
       {/* Grid Pattern Overlay */}
       <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] -z-10" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              {section.title}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.15}>
            <p
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
            />
          </ScrollAnimation>

          <ScrollAnimation delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6">
              {section.buttons?.map((button, idx) => (
                <Button
                  asChild
                  size="lg"
                  key={idx}
                  className={cn(
                      "rounded-full h-14 px-10 text-lg font-bold transition-all hover:-translate-y-1",
                       button.variant === 'outline'
                        ? "bg-transparent border-2 border-slate-700 text-white hover:bg-white hover:text-slate-900"
                        : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white shadow-xl shadow-teal-500/30 border-0"
                  )}
                >
                  <Link
                    href={button.url || ''}
                    target={button.target || '_self'}
                  >
                    {button.icon && <SmartIcon name={button.icon as string} className="mr-2 size-5" />}
                    <span>{button.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
