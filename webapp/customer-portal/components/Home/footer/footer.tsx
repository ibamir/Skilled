'use client'

import { links } from '@/components/Home/navbar/header'
import { Separator } from '@base-ui/react'
import WordmarkFooter from '@/components/ruixen/wordmark-footer'
import { motion } from 'motion/react'
import { scrollToHash } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { LanguageSwitcher } from '@/lib/language-switch/language-switcher'


export default function Footer() {
    const { theme } = useTheme()

    return (
        <motion.div
            className="w-full h-fit px-8 space-y-7 bg-background"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
                <div className="flex flex-col justify-center items-start gap-2 w-full">
                    <a className="rounded-md" href="#home">
                        <span className="flex items-center justify-center min-w-fit gap-0.5">
                            <img
                                src={
                                    theme === 'dark'
                                        ? '/dark.svg'
                                        : '/light.svg'
                                }
                                alt="Talented"
                                className="w-25"
                            />
                        </span>
                    </a>
                    <p className="text-muted-foreground max-w-70">
                        Tunisia&apos;s talent & micro-skill platform. Powered by
                        local payments through D17 &amp; Flouci.
                    </p>
                </div>
                <div className="flex md:flex-row flex-wrap justify-center items-center gap-4 md:min-w-fit">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(event) => scrollToHash(event, link.href)}
                        >
                            <p className="hover:text-primary text-accent-foreground dark:text-accent-foreground hover:font-bold">
                                {link.label}
                            </p>
                        </a>
                    ))}
                </div>
                <LanguageSwitcher />
            </div>
            <Separator className="w-full h-px bg-border" />
            <p className="text-center">
                &copy; 2026 Talented Inc. All rights reserved.
            </p>
            <WordmarkFooter brandName="TALENTED" />
        </motion.div>
    )
}
