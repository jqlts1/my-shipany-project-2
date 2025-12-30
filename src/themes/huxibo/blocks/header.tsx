'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { Link, usePathname } from '@/core/i18n/navigation';
import {
  BrandLogo,
  LocaleSelector,
  SignUser,
  SmartIcon,
  ThemeToggler,
} from '@/shared/blocks/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger as RawNavigationMenuTrigger,
} from '@/shared/components/ui/navigation-menu';
import { Button } from '@/shared/components/ui/button';
import { useMedia } from '@/shared/hooks/use-media';
import { cn } from '@/shared/lib/utils';
import { NavItem } from '@/shared/types/blocks/common';
import { Header as HeaderType } from '@/shared/types/blocks/landing';

// For Next.js hydration mismatch warning, conditionally render NavigationMenuTrigger only after mount to avoid inconsistency between server/client render
function NavigationMenuTrigger(
  props: React.ComponentProps<typeof RawNavigationMenuTrigger>
) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // Only render after client has mounted, to avoid SSR/client render id mismatch
  if (!mounted) return null;
  return <RawNavigationMenuTrigger {...props} />;
}

export function Header({ header }: { header: HeaderType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const scrollRafRef = useRef<number | null>(null);
  const isLarge = useMedia('(min-width: 64rem)');
  const pathname = usePathname();

  useEffect(() => {
    // Listen to scroll event to enable header styles on scroll
    const handleScroll = () => {
      // Coalesce high-frequency scroll events & only update state when value changes.
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const next = window.scrollY > 50;
        if (next === isScrolledRef.current) return;
        isScrolledRef.current = next;
        setIsScrolled(next);
      });
    };

    // Initialize once on mount.
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, []);

  // Navigation menu for large screens
  const NavMenu = () => {
    return (
      <NavigationMenu
        viewport={false}
        className="**:data-[slot=navigation-menu-content]:top-10 max-lg:hidden"
      >
        <NavigationMenuList className="gap-2">
                  {header.nav?.items?.map((item, idx) => {
            if (!item.children || item.children.length === 0) {
              return (
                <NavigationMenuLink key={idx} asChild>
                  <Link
                    href={item.url || ''}
                    target={item.target || '_self'}
                    className={cn(
                      "flex flex-row items-center gap-2 px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full",
                      item.is_active || pathname.endsWith(item.url as string)
                        ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
                        : 'text-muted-foreground hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'
                    )}
                  >
                    {item.icon && <SmartIcon name={item.icon as string} />}
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              );
            }

            return (
              <NavigationMenuItem key={idx}>
                <NavigationMenuTrigger className="flex flex-row items-center gap-2 text-sm font-medium rounded-full px-5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800/50 transition-all">
                  {item.icon && (
                    <SmartIcon name={item.icon as string} className="h-4 w-4" />
                  )}
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto">
                   {/* Glass Dropdown Container */}
                  <div className="w-[280px] bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 rounded-2xl p-2 shadow-2xl shadow-teal-900/10 overflow-hidden">
                    <ul className="flex flex-col gap-1">
                      {item.children?.map((subItem: NavItem, index: number) => (
                        <ListItem
                          key={index}
                          href={subItem.url || ''}
                          target={subItem.target || '_self'}
                          title={subItem.title || ''}
                          description={subItem.description || ''}
                        >
                          {subItem.icon && (
                            <SmartIcon name={subItem.icon as string} className="items-center justify-center"/>
                          )}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  // Mobile menu using Accordion, shown on small screens
  const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    return (
      <nav
        role="navigation"
        className="w-full"
      >
        <Accordion
          type="single"
          collapsible
          className="-mx-4 mt-2 space-y-1"
        >
          {header.nav?.items?.map((item, idx) => {
            return (
              <AccordionItem
                key={idx}
                value={item.title || ''}
                className="border-b-0"
              >
                {item.children && item.children.length > 0 ? (
                  <>
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 bg-slate-50/50 dark:bg-slate-900/50">
                      <ul>
                        {item.children?.map((subItem: NavItem, iidx) => (
                          <li key={iidx}>
                            <Link
                              href={subItem.url || ''}
                              onClick={closeMenu}
                              className="flex items-center gap-3 px-8 py-3 text-base text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {subItem.icon && (
                                  <SmartIcon name={subItem.icon as string} className="size-4" />
                                )}
                              <div>{subItem.title}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.url || ''}
                    onClick={closeMenu}
                    className="flex w-full items-center justify-between px-6 py-4 text-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </nav>
    );
  };

  // List item for submenus in NavigationMenu
  function ListItem({
    title,
    description,
    children,
    href,
    target,
    ...props
  }: React.ComponentPropsWithoutRef<'li'> & {
    href: string;
    title: string;
    description?: string;
    target?: string;
  }) {
    return (
      <li {...props}>
        <NavigationMenuLink asChild>
          <Link
            href={href}
            target={target || '_self'}
            className="group flex flex-row items-center gap-4 select-none rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
              {children}
            </div>
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors truncate">
                {title}
              </div>
              <p className="line-clamp-2 text-xs font-medium text-slate-400 group-hover:text-teal-600/70 dark:group-hover:text-teal-400/70 transition-colors leading-relaxed">
                {description}
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <>
      <header
        data-state={isMobileMenuOpen ? 'active' : 'inactive'}
        {...(isScrolled && { 'data-scrolled': true })}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      >
        <div
            className={cn(
            'absolute inset-x-0 top-0 z-50 transition-all duration-300',
             // Default state: Transparent or blurred based on scroll
             isScrolled 
                ? 'h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50' 
                : 'h-20 bg-transparent',
             // Mobile Menu Open State
             isMobileMenuOpen && 'h-screen bg-white dark:bg-slate-950'
            )}
        >
          <div className="container h-full">
            <div className="flex h-full items-center justify-between">
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Brand Logo */}
                {header.brand && <BrandLogo brand={header.brand} />}

                {/* Desktop Navigation Menu */}
                {isLarge && <NavMenu />}
              </div>

               {/* Hamburger menu button for mobile navigation */}
               <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-colors"
                >
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

              {/* Mobile Menu Content Wrapper */}
              {isMobileMenuOpen && (
                  <div className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto bg-white dark:bg-slate-950 px-6 py-4 lg:hidden flex flex-col gap-6 animate-in slide-in-from-top-4 fade-in duration-200">
                     <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />
                     <div className="flex flex-col gap-4 mt-auto pb-8">
                        {/* Mobile Actions */}
                        {header.buttons?.map((button, idx) => (
                           <Button asChild key={idx} size="lg" className="w-full rounded-full font-bold">
                              <Link href={button.url ?? ''}>{button.title}</Link>
                           </Button>
                        ))}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                            {header.show_theme && <ThemeToggler />}
                            {header.show_locale && <LocaleSelector />}
                        </div>
                     </div>
                  </div>
              )}

              {/* Header right section: Desktop Only */}
              <div className="hidden lg:flex items-center gap-4">
                  {header.show_locale ? <LocaleSelector /> : null}
                  {header.show_theme ? <ThemeToggler /> : null}
                  
                  {header.show_sign && <SignUser userNav={header.user_nav} />}

                  {header.buttons &&
                    header.buttons.map((button, idx) => (
                      <Link
                        key={idx}
                        href={button.url || ''}
                        target={button.target || '_self'}
                        className={cn(
                          'inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                          'h-10 px-6',
                          button.variant === 'outline'
                            ? 'bg-transparent border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 text-foreground'
                            : 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5'
                        )}
                      >
                        {button.icon && (
                          <SmartIcon
                            name={button.icon as string}
                            className="size-4"
                          />
                        )}
                        <span>{button.title}</span>
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
