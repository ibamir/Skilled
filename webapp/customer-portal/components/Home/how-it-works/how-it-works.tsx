'use client'

import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import React, { useRef } from 'react'
import { FigmaWebFlow, Payment, Features, CashOut } from './cards'
import { Badge } from '@/components/reui/badge'
import { LockKeyholeIcon } from '@/components/ui/lock-keyhole'
import { CircleCheckIcon } from '@/components/ui/circle-check'
import { MessageSquareIcon } from '@/components/ui/message-square'
import { ReceiptTextIcon } from '@/components/ui/receipt-text'
import CreditCard from '@/components/ui/credit-card'
import { CompassIcon } from '@/components/ui/compass'
import { UsersRoundIcon } from '@/components/ui/users-round'
import { Landmark } from 'lucide-react'

type Step = {
    number: string
    title: string
    description: string
    card: React.ReactNode
    tags?: string[]
    encryption?: string
    charging?: string
}

const steps: Step[] = [
    {
        number: '01',
        title: 'Find the right skill to learn',
        description:
            'When Talented launches, explore practical courses, guides, and live cohorts in Darija, French, and English. Choose resources that match your goals and your level.',
        card: <FigmaWebFlow />,
        tags: ['Freelance Contracts', 'Figma & Webflow', 'Next.js & SaaS'],
    },
    {
        number: '02',
        title: 'Pay in Tunisian dinars',
        description:
            'When the platform opens, no international card will be required. Pay through D17 or Flouci and access your purchase without leaving the platform.',
        card: <Payment />,
        encryption: '128-bit Encrypted',
        charging: '0% Currency Surcharge',
    },
    {
        number: '03',
        title: 'Learn with practical resources',
        description:
            'At launch, work through lessons, templates, exercises, and community spaces built to help you finish real projects and keep improving.',
        card: <Features />,
        tags: ['Instant asset download', 'Discord / Telegram'],
    },
    {
        number: '04',
        title: 'Share your knowledge and earn',
        description:
            'Creators will be able to publish a course, guide, or resource for their audience, keep 88% of each sale, and choose clear local payout options.',
        card: <CashOut />,
        tags: ['Same-Week Payouts', 'Auto Tax Invoice PDF'],
    },
]

const tags = [
    '01 Discovery',
    '02 Local Checkout',
    '03 Cohort & Drills',
    '04 Creator Cashout',
]

const stage = [
    {
        id: '1',
        stage: 'Vetted Micro-Skills',
        icon: <CompassIcon size={15} />,
    },
    {
        id: '2',
        stage: 'No foreign card needed',
        icon: <CreditCard size={15} />,
    },
    {
        id: '3',
        stage: 'Hands-on Cohorts & Assets',
        icon: <UsersRoundIcon size={15} />,
    },
    {
        id: '4',
        stage: 'Fair & Transparent Earnings',
        icon: <Landmark size={13} className="hover:animate-bounce" />,
    },
]

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 75%', 'end 25%'],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.2,
    })

    const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

    return (
        <section
            ref={containerRef}
            className="relative mx-auto max-w-6xl px-8 py-32"
            id="how-it-works"
        >
            {/* Header */}
            <motion.div
                className="mx-auto mb-24 max-w-2xl text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground"
                >
                    How it works
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl font-bold tracking-tight sm:text-5xl"
                >
                    From learning goal to useful result.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg text-muted-foreground"
                >
                    Discover a skill, pay locally, learn by doing, and share
                    what you know with the next learner.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg text-muted-foreground"
                >
                    {tags
                        .toString()
                        .split(',')
                        .map((t) => (
                            <span className="px-2" key={t}>
                                <Badge
                                    variant="primary-light"
                                    key={t}
                                    className="rounded-xl p-3"
                                >
                                    {t}
                                </Badge>
                            </span>
                        ))}
                </motion.p>
            </motion.div>

            <p className="mb-8 text-center text-xs text-muted-foreground">
                Product preview - illustrative data.
            </p>

            {/* Timeline */}
            <div className="relative">
                {/* Background line */}
                <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />

                {/* Progress line */}
                <motion.div
                    style={{ height: lineHeight }}
                    className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-foreground md:block"
                />

                <div className="space-y-24 md:space-y-32">
                    {steps.map((step, index) => (
                        <TimelineStep
                            key={step.number}
                            step={step}
                            index={index}
                            progress={smoothProgress}
                            total={steps.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TimelineStep({
    step,
    index,
    progress,
    total,
}: {
    step: Step
    index: number
    progress: ReturnType<typeof useSpring>
    total: number
}) {
    /**
     * Each node gets a section of the global scroll progress.
     *
     * Example with 4 steps:
     *
     * Step 1 → 0.00 - 0.25
     * Step 2 → 0.25 - 0.50
     * Step 3 → 0.50 - 0.75
     * Step 4 → 0.75 - 1.00
     */
    const start = index / total
    const end = (index + 1) / total

    const scale = useTransform(
        progress,
        [start, start + 0.03, end],
        [1, 1.35, 1],
    )

    const opacity = useTransform(
        progress,
        [start - 0.02, start, end],
        [0.5, 1, 0.65],
    )

    const ringScale = useTransform(
        progress,
        [start, start + 0.03, start + 0.08],
        [0.8, 1.8, 1],
    )

    const ringOpacity = useTransform(
        progress,
        [start, start + 0.03, start + 0.1],
        [0, 0.5, 0],
    )

    const imageScale = useTransform(
        progress,
        [start - 0.03, start, start + 0.08],
        [0.96, 1.02, 1],
    )

    return (
        <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-20">
            {/* Content */}
            <motion.div
                initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -30 : 30,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                }}
                viewport={{
                    once: false,
                    amount: 0.35,
                }}
                transition={{
                    duration: 0.7,
                    ease: 'easeOut',
                }}
                className={`${
                    index % 2 === 0 ? 'md:pr-12' : 'md:order-2 md:pl-12'
                }`}
            >
                <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-foreground">
                        {step.number}
                    </span>

                    <div className="h-px w-8 bg-border" />

                    <span className="font-mono text-sm text-muted-foreground">
                        {stage.map((s) => (
                            <span key={s.id}>
                                {step.number.toLowerCase().includes(s.id) && (
                                    <span className="flex items-center justify-center gap-2">
                                        <span>{s.icon}</span>
                                        <span>{s.stage}</span>
                                    </span>
                                )}
                            </span>
                        ))}
                    </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {step.title}
                </h3>

                <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
                    {step.description}
                </p>
                {step.number === '01' && (
                    <span className="flex items-center gap-4 mt-4 flex-wrap">
                        {step.tags
                            ?.toString()
                            .split(',')
                            .map((t) => (
                                <Badge
                                    className="p-3 rounded-xl"
                                    variant="primary-light"
                                    key={t}
                                >
                                    {t}
                                </Badge>
                            ))}
                    </span>
                )}

                {step.number === '02' && (
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                        <span className="flex items-center justify-center gap-2 text-green-600">
                            <CircleCheckIcon size={17} />
                            <p>{step.charging}</p>
                        </span>
                        <span className="flex items-center justify-center gap-2">
                            <LockKeyholeIcon size={17} />
                            <p>{step.encryption}</p>
                        </span>
                    </div>
                )}
                {step.number === '03' && (
                    <div className="flex items-center flex-wrap gap-4 mt-4">
                        {step.tags
                            ?.toString()
                            .split(',')
                            .map((t) => (
                                <Badge
                                    className="p-3 rounded-xl [&_svg:not([class*=size-])]:size-4!"
                                    variant="primary-light"
                                    key={t}
                                >
                                    {t
                                        .trim()
                                        .toLowerCase()
                                        .includes('instant asset download') ? (
                                        <span className="flex items-center justify-center gap-2 h-full">
                                            <CircleCheckIcon size={25} />
                                            {t}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <MessageSquareIcon size={25} />
                                            {t}
                                        </span>
                                    )}
                                </Badge>
                            ))}
                    </div>
                )}

                {step.number === '04' && (
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                        {step.tags
                            ?.toString()
                            .split(',')
                            .map((t) => (
                                <span key={t}>
                                    {t
                                        .trim()
                                        .toLowerCase()
                                        .includes('same-week payouts') ? (
                                        <span className="flex items-center justify-center gap-2 h-full">
                                            <CreditCard size={17} />
                                            {t}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <ReceiptTextIcon size={17} />
                                            {t}
                                        </span>
                                    )}
                                </span>
                            ))}
                    </div>
                )}
            </motion.div>

            {/* Image */}
            <motion.div
                initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? 30 : -30,
                }}
                style={{ scale: imageScale }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                }}
                viewport={{
                    once: false,
                    amount: 0.35,
                }}
                transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: 'easeOut',
                }}
                className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
            >
                {step.card}
            </motion.div>

            {/* Timeline node */}
            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                {/* Pulse ring */}
                <motion.div
                    style={{
                        scale: ringScale,
                        opacity: ringOpacity,
                    }}
                    className="absolute inset-0 rounded-full bg-foreground"
                />

                {/* Node */}
                <motion.div
                    style={{
                        scale,
                        opacity,
                    }}
                    className="relative flex h-5 w-5 items-center justify-center rounded-full border-4 border-background bg-foreground shadow-md"
                />
            </div>
        </div>
    )
}
