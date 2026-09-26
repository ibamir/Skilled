'use client'

import { cn } from '@/lib/utils'
import { scrollToHash } from '@/lib/utils'
import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Portal, PortalBackdrop } from '@/components/ui/portal'
import { links } from '@/components/Home/navbar/header'
import { XIcon, MenuIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { AnimatePresence, motion } from 'motion/react'
import { LanguageSwitcher } from '@/lib/language-switch/language-switcher'
import { Separator } from '@/components/ui/separator' 

export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="md:hidden">
            <Button
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Toggle menu"
                className="md:hidden"
                onClick={() => setOpen(!open)}
                size="icon"
                variant="outline"
            >
                {open ? (
                    <XIcon className="size-4.5" />
                ) : (
                    <MenuIcon className="size-4.5" />
                )}
            </Button>
            <AnimatePresence>
                {open && (
                    <Portal className="top-14" id="mobile-menu">
                        <PortalBackdrop onClick={() => setOpen(false)} />
                        <motion.div
                            className={cn(
                                'data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in',
                                'size-full p-4',
                            )}
                            data-slot={open ? 'open' : 'closed'}
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="grid gap-y-2 mt-4"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: { staggerChildren: 0.06 },
                                    },
                                }}
                            >
                                {links.map((link) => (
                                    <motion.div
                                        key={link.label}
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 },
                                        }}
                                    >
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'ghost',
                                                }),
                                                'w-full justify-start',
                                            )}
                                            href={link.href}
                                            onClick={(event) => {
                                                setOpen(false)
                                                scrollToHash(event, link.href)
                                            }}
                                        >
                                            <span className="text-primary">
                                                {link.label}
                                            </span>
                                        </a>
                                    </motion.div>
                                ))}
                                <div className='flex items-center justify-center gap-2 px-2.5'>
                                    <span className="flex items-center justify-between w-full flex-1">
                                        <p className="text-primary">Theme : </p>
                                        <ThemeToggle />
                                    </span>
                                    <Separator orientation='vertical' className='h-full  bg-border! wpx'/>
                                    <span className="flex items-center justify-between w-full flex-1">
                                        <p className="text-primary">Language : </p>
                                        <LanguageSwitcher />
                                    </span>
                                </div>
                                
                            </motion.div>
                            <div className="mt-12 flex flex-col gap-2">
                                <a
                                    href="#help-us"
                                    onClick={(event) => {
                                        setOpen(false)
                                        scrollToHash(event, '#help-us')
                                    }}
                                    className={cn(
                                        buttonVariants({ variant: 'default' }),
                                        'min-w-fit h-10 text-accent',
                                    )}
                                >
                                    Take the survey
                                </a>
                            </div>
                        </motion.div>
                    </Portal>
                )}
            </AnimatePresence>
        </div>
    )
}
