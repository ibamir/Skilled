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
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

type Step = {
    number: string
    title: string
    description: string
    card: React.ReactNode
    tags?: string[]
}
function useSteps(): Step[] {
    const { t, language } = useLanguage()
    return [
        {
            number: '01',
            title: t('title01'),
            description: t('description01'),
            card: <FigmaWebFlow />,
            tags: [t('tags01')],
        },
        {
            number: '02',
            title: t('title02'),
            description: t('description02'),
            card: <Payment />,
            tags: [t('tags02')],
        },
        {
            number: '03',
            title: t('title03'),
            description: t('description03'),
            card: <Features />,
            tags: [t('tags03')],
        },
        {
            number: '04',
            title: t('title04'),
            description: t('description04'),
            card: <CashOut />,
            tags: [t('tags04')],
        },
    ]
}

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
    const { t } = useLanguage()
    const steps = useSteps()
    const tags = [t('tags')]

    return (
        <section
            ref={containerRef}
            className="relative mx-auto max-w-6xl px-8 py-24"
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
                    {t('howItWorks')}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl font-bold tracking-tight sm:text-5xl"
                >
                    {t('HHeader')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg text-muted-foreground"
                >
                    {t('HSubtext')}
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
                {t('productPreview')}
            </p>

            {/* Timeline */}
            <div className="relative">
                {/* Background line */}
                <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

                {/* Progress line */}
                <motion.div
                    style={{ height: lineHeight }}
                    className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-foreground lg:block"
                />

                <div className="space-y-24 lg:space-y-32">
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

    const steps = useSteps()
    const { t } = useLanguage()
    const stage = [
        {
            id: '1',
            stage: t('stage01'),
            icon: <CompassIcon size={15} />,
        },
        {
            id: '2',
            stage: t('stage02'),
            icon: <CreditCard size={15} />,
        },
        {
            id: '3',
            stage: t('stage03'),
            icon: <UsersRoundIcon size={15} />,
        },
        {
            id: '4',
            stage: t('stage04'),
            icon: <Landmark size={13} className="hover:animate-bounce" />,
        },
    ]


    return (
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
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
                    index % 2 === 0 ? 'lg:pr-12' : 'lg:order-2 lg:pl-12'
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
                        {step.tags
                            ?.toString()
                            .split(',')
                            .map((t) => {
                                const cleanedTag = t.trim().toLowerCase()
                                // Check for either string explicitly
                                const hasNoSurcharge =
                                    cleanedTag.includes(
                                        '0% currency surcharge',
                                    ) ||
                                    cleanedTag.includes('رسوم تحويل عملة 0٪')

                                return hasNoSurcharge ? (
                                    <span
                                        className="flex items-center justify-center gap-2 text-green-600"
                                        key={t}
                                    >
                                        <CircleCheckIcon size={17} />
                                        <p>{t}</p>
                                    </span>
                                ) : (
                                    <span
                                        className="flex items-center justify-center gap-2"
                                        key={t}
                                    >
                                        <LockKeyholeIcon size={17} />
                                        <p>{t}</p>
                                    </span>
                                )
                            })}
                    </div>
                )}
                {step.number === '03' && (
                    <div className="flex items-center flex-wrap gap-4 mt-4">
                        {step.tags
                            ?.toString()
                            .split(',')
                            .map((t) => {
                                const cleanedTag = t.trim().toLowerCase()
                                // Check both English and Arabic strings explicitly
                                const isInstantDownload =
                                    cleanedTag.includes(
                                        'instant asset download',
                                    ) ||
                                    cleanedTag.includes('تنزيل فوري للموارد')

                                return (
                                    <Badge
                                        className="p-3 rounded-xl [&_svg:not([class*=size-])]:size-4!"
                                        variant="primary-light"
                                        key={t}
                                    >
                                        {isInstantDownload ? (
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
                                )
                            })}
                    </div>
                )}

                {step.number === '04' && (
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                        {step.tags
                            ?.toString()
                            .split(',')
                            .map((t) => {
                                const cleanedTag = t.trim().toLowerCase()
                                // Check both English and Arabic variants separately
                                const isSameWeekPayout =
                                    cleanedTag.includes('same-week payouts') ||
                                    cleanedTag.includes(
                                        'تحويل الأرباح خلال الأسبوع نفسه',
                                    )

                                return (
                                    <span key={t}>
                                        {isSameWeekPayout ? (
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
                                )
                            })}
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
                className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
            >
                {step.card}
            </motion.div>

            {/* Timeline node */}
            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
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
