"use client"

import { motion, type Variants, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { Highlighter } from '@/shared/components/ui/highlighter';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { SocialAvatars } from './social-avatars';
import { BorderBeam } from '@/shared/components/magicui/border-beam';

export function Hero({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const highlightText = section.highlight_text ?? '';
  let texts = null;
  if (highlightText) {
    texts = section.title?.split(highlightText, 2);
  }

  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Aurora Animation
  const auroraVariant: Variants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
  };

  return (
    <section
      ref={containerRef}
      id={section.id}
      className={cn(
        'relative w-full overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32',
        section.className,
        className
      )}
    >
        {/* === BACKGROUND: THE ETHEREAL BREATH (VIBRANT) === */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950" />
            
            {/* Moving Orbs - Boosted Opacity & Vibrancy */}
            <motion.div 
                variants={auroraVariant}
                animate="animate"
                className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-teal-400/30 dark:bg-teal-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div 
                variants={auroraVariant}
                animate="animate"
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
                className="absolute top-[10%] right-[-20%] w-[50vw] h-[50vw] bg-blue-400/30 dark:bg-blue-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"
            />
             <motion.div 
                variants={auroraVariant}
                animate="animate"
                transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute bottom-[-20%] left-[10%] w-[55vw] h-[55vw] bg-amber-300/30 dark:bg-amber-600/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"
            />

            {/* Grid Mesh & Noise */}
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04] dark:opacity-[0.06]" />
             <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" /> 
        </div>


      <div className="container mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* === LEFT COLUMN: CONTENT === */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            
            {/* Eyebrow Label - Refined */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 hidden lg:inline-block"
            >
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-slate-900/50 border border-teal-200/50 dark:border-teal-800/50 backdrop-blur-md shadow-sm text-teal-700 dark:text-teal-300 text-xs font-bold tracking-wider uppercase">
                     <Star className="size-3.5 fill-current" />
                     <span>#1 Mindfulness App of 2024</span>
                 </div>
            </motion.div>

             {/* Announcement Pill (Mobile) */}
            {section.announcement && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex justify-center lg:justify-start mb-8 lg:hidden"
                >
                    <Link
                    href={section.announcement.url || ''}
                    target={section.announcement.target || '_self'}
                    className="group relative inline-flex items-center gap-2 rounded-full border border-teal-100/50 dark:border-teal-900/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-4 py-1.5 text-sm font-medium shadow-sm transition-all hover:bg-white/80"
                    >
                    <span className="text-foreground/80 group-hover:text-foreground bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-bold">
                        {section.announcement.title}
                    </span>
                    <ArrowRight className="size-4 text-teal-500 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>
            )}

            {/* Headline - Bigger & Bolder with Personality */}
            <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="max-w-3xl lg:max-w-none relative"
            >
                {texts && texts.length > 0 ? (
                <h1 className="text-foreground font-serif font-bold text-5xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-8xl text-balance drop-shadow-sm leading-[1.05] sm:leading-[1.05]">
                    {texts[0]}
                    <span className="relative whitespace-nowrap px-2">
                         <span className="absolute inset-0 -skew-y-2 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/40 dark:to-blue-900/40 rounded-lg -z-10" />
                        <Highlighter action="highlight" color="rgba(45, 212, 191, 0.2)" className="text-teal-600 dark:text-teal-400">
                        {highlightText}
                        </Highlighter>
                    </span>
                    <br className="hidden lg:block"/>
                    {texts[1]}
                </h1>
                ) : (
                <h1 className="text-foreground tracking-tighter font-serif font-bold text-5xl md:text-7xl text-balance">
                    {section.title}
                </h1>
                )}
            </motion.div>

            {/* Description */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <p
                className="text-muted-foreground mt-8 mb-10 text-lg md:text-xl font-medium leading-relaxed text-balance lg:max-w-lg"
                dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
                />
            </motion.div>

            {/* Buttons & Social Proof */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 0.5 }}
               className="flex flex-col items-center lg:items-start gap-8"
            >
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                     {section.buttons?.map((button, idx) => (
                        <Button
                            asChild
                            size="lg"
                            className={cn(
                                "rounded-full h-14 px-8 text-base font-bold tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0",
                                idx === 0 
                                    ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 border-0" 
                                    : "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-800 hover:bg-white text-slate-700 dark:text-slate-200"
                            )}
                            key={idx}
                        >
                            <Link href={button.url ?? ''} target={button.target ?? '_self'}>
                            {button.icon && <SmartIcon name={button.icon as string} className="mr-2 size-5" />}
                            <span>{button.title}</span>
                            </Link>
                        </Button>
                    ))}
                </div>

                {section.show_avatars && (
                     <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40 p-2 pr-4 rounded-full border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
                        <SocialAvatars tip={section.avatars_tip || ''} />
                        <span className="hidden sm:inline-block text-slate-300">•</span>
                        <span>4.9/5 Rating on App Store</span>
                     </div>
                )}
            </motion.div>
        </div>


        {/* === RIGHT COLUMN: 3D VISUALS === */}
        <div className="relative mt-16 lg:mt-0 perspective-1000 group z-10 w-full flex justify-center lg:justify-end lg:pr-12">
             {/* Background glow for the graphic */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-teal-200/40 to-transparent blur-3xl rounded-full -z-10 dark:from-teal-800/20" />
            
            <motion.div 
                style={{ y: y1, rotateY: -12, rotateX: 6 }}
                initial={{ opacity: 0, scale: 0.9, rotateY: 25 }}
                animate={{ opacity: 1, scale: 1, rotateY: -12, rotateX: 6 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                whileHover={{ rotateY: -8, rotateX: 2, scale: 1.02, transition: { duration: 0.4 } }}
                className="relative z-10 w-[280px] sm:w-[300px] lg:w-[320px]"
            >
                 {/* SIMPLE SLEEK PHONE FRAME */}
                 <div className="relative rounded-[40px] border-[4px] border-slate-200/50 dark:border-slate-700/50 bg-slate-950 shadow-2xl shadow-teal-900/30 overflow-hidden aspect-[9/19] ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm">
                     {/* Glass Reflection Top */}
                     <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent z-40 pointer-events-none opacity-40 rounded-t-[36px]" />
                     
                     <BorderBeam duration={8} size={250} colorFrom="#14b8a6" colorTo="#3b82f6" />
                     
                     {/* Screen Content */}
                     {section.image?.src ? (
                         <Image
                            src={section.image.src}
                            alt="App Screenshot"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 320px"
                            priority
                         />
                     ) : (
                         <div className="w-full h-full bg-gradient-to-br from-teal-500 to-blue-600 flex flex-col items-center justify-center text-white p-6 text-center">
                             <div className="size-16 rounded-full bg-white/20 backdrop-blur-md mb-4 animate-pulse"></div>
                             <p className="font-bold opacity-80">BreathWave</p>
                         </div>
                     )}
                 </div>

                 {/* HEALTH CARD - Better Position */}
                 <motion.div 
                    style={{ y: y2 }}
                    className="absolute bottom-16 -left-12 sm:-left-16 lg:-left-20 w-44 sm:w-52 bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-slate-100/50 dark:border-slate-800/50 backdrop-blur-xl"
                 >
                      <div className="flex items-center gap-3 mb-3">
                          <div className="size-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-500">
                             <SmartIcon name="Activity" className="size-5" />
                          </div>
                          <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">HRV Score</p>
                              <p className="text-lg font-serif font-bold text-foreground">84 ms</p>
                          </div>
                      </div>
                      <div className="h-12 w-full flex items-end gap-1 px-1">
                          {[30, 45, 60, 50, 75, 60, 80].map((h, i) => (
                              <div key={i} className="flex-1 bg-teal-500/20 rounded-t-sm hover:bg-teal-500/80 transition-colors" style={{ height: `${h}%` }}></div>
                          ))}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                          <div className="size-1.5 rounded-full bg-green-500 animate-pulse"></div>
                          Daily Optimized
                      </div>
                 </motion.div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}
