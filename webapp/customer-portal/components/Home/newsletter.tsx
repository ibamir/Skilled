'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../reui/badge'

export interface Newsletter2Props {
    heading?: string
    description?: string
    label?: string
    placeholder?: string
    buttonText?: string
    disclaimer?: React.ReactNode
}

const Newsletter: React.FC<Newsletter2Props> = ({
    heading = 'Be first to know when we launch',
    description = 'Get updates about new courses, creator opportunities, and the Skilled beta in your inbox.',
    label = 'Get launch updates',
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
    disclaimer = (
        <>
            By subscribing you agree to our{' '}
            <a
                href="#"
                className="underline transition-colors font-bold hover:text-white"
            >
                Privacy Policy
            </a>{' '}
            and receiving periodic updates.
        </>
    ),
}) => {
    return (
        <section
            className="flex h-full w-full items-center justify-center py-12 md:py-16 p-8"
            id="interested"
        >
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    className="from-primary to-primary/50 dark:to-primary/70 flex flex-col items-center justify-between gap-10 rounded-3xl bg-linear-to-b p-8 text-white md:p-12 lg:flex-row lg:gap-16 lg:p-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <motion.div
                        className="flex w-full max-w-2xl flex-col space-y-5"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <Badge className="text-primary backdrop-blur-2xl bg-background/50 dark:bg-background/70 p-3 rounded-xl font-bold">
                            <span className="flex items-center justify-center gap-2">
                                <div className="size-2 animate-pulse rounded-full bg-primary" />
                                <p>Skilled launch updates</p>
                            </span>
                        </Badge>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                            {heading}
                        </h2>
                        <p className="max-w-md text-white/70 leading-relaxed md:text-lg">
                            {description}
                        </p>
                    </motion.div>

                    <motion.div
                        className="w-full max-w-md flex-1 lg:w-auto"
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        <div className="flex flex-col space-y-3">
                            {label && (
                                <label className="mb-1 block text-sm font-semibold text-white md:text-base">
                                    {label}
                                </label>
                            )}

                            <form className="flex flex-col gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <Input
                                        type="email"
                                        placeholder={placeholder}
                                        className="bg-background/50 dark:bg-background/70 focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 rounded-xl pl-3 text-accent-foreground backdrop-blur-2xl sm:h-14 sm:w-full "
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-primary/20 h-12 rounded-xl px-6 font-semibold text-white shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)] transition-all active:scale-[0.96] sm:h-14 sm:px-8"
                                >
                                    {buttonText}
                                </Button>
                            </form>

                            {disclaimer && (
                                <p className="text-foreground/60 mt-3 text-xs md:text-sm">
                                    {disclaimer}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Newsletter
