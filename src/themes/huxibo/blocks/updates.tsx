import { cn } from '@/shared/lib/utils';
import { Post as PostType } from '@/shared/types/blocks/blog';
import { Section } from '@/shared/types/blocks/landing';

export function Updates({
  section,
  className,
  posts,
}: {
  section: Section;
  className?: string;
  posts: PostType[];
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-24 md:py-36 overflow-hidden', section.className, className)}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-background to-teal-50/30 dark:from-slate-950/20 dark:via-background dark:to-teal-950/20" />
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-40 left-1/3 w-96 h-96 bg-teal-400/10 dark:bg-teal-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-slate-400/10 dark:bg-slate-600/10 rounded-full blur-3xl" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />
      
      <div className="relative z-10 mx-auto mb-12 text-center">
        <h1 className="mb-6 text-3xl font-bold text-pretty lg:text-4xl">
          {section.title}
        </h1>
        <p className="text-muted-foreground mb-4 max-w-xl lg:max-w-none lg:text-lg">
          {section.description}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-10 lg:px-10">
        <div className="relative">
          {posts?.map((post) => {
            return (
              <div key={post.url} className="relative">
                <div className="flex flex-col gap-y-6 md:flex-row">
                  <div className="flex-shrink-0 md:w-48">
                    <div className="pb-10 md:sticky md:top-8">
                      {post.version && (
                        <div className="text-foreground border-primary text-primary relative z-10 inline-flex items-center justify-center rounded-lg border px-2 py-1 text-xs font-bold">
                          v{post.version}
                        </div>
                      )}
                      {post.date && post.date && (
                        <time className="text-muted-foreground mt-3 block text-sm font-medium">
                          {post.date}
                        </time>
                      )}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="relative flex-1 pb-10 md:pl-8">
                    {/* Vertical timeline line */}
                    <div className="bg-border absolute top-2 left-0 hidden h-full w-px md:block">
                      {/* Timeline dot */}
                      <div className="bg-primary absolute z-10 hidden size-3 -translate-x-1/2 rounded-full md:block" />
                    </div>

                    <div className="space-y-6">
                      <div className="relative z-10 flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-balance">
                          {post.title}
                        </h2>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="bg-muted text-muted-foreground flex h-6 w-fit items-center justify-center rounded-full border px-2 text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="prose dark:prose-invert prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance max-w-none">
                        {post.body}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
