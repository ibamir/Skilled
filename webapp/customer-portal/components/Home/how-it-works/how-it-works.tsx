'use client'

import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import React, { useRef } from 'react'
import { FigmaWebFlow, Payment, Features, CashOut, Apply, Publish } from './cards'
import { Badge } from '@/components/reui/badge'
import { LockKeyholeIcon } from '@/components/ui/lock-keyhole'
import { ReceiptTextIcon } from '@/components/ui/receipt-text'
import CreditCard from '@/components/ui/credit-card'
import { CompassIcon } from '@/components/ui/compass'
import { UsersRoundIcon } from '@/components/ui/users-round'
import { Landmark } from 'lucide-react'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

type Step = {
    title: string
    description: string
    stage: string
    icon: React.ReactNode
    card: React.ReactNode
    tags?: string[]
}

function useTracks() {
    const { t } = useLanguage()
    const list = (key: Parameters<typeof t>[0]) => t(key) as unknown as string[]

    const learn: Step[] = [
        {
            title: t('title01'),
            description: t('description01'),
            stage: t('stage01'),
            icon: <CompassIcon size={15} />,
            card: <FigmaWebFlow />,
            tags: list('tags01'),
        },
        {
            title: t('title02'),
            description: t('description02'),
            stage: t('stage02'),
            icon: <CreditCard size={15} />,
            card: <Payment />,
            tags: list('tags02'),
        },
        {
            title: t('title03'),
            description: t('description03'),
            stage: t('stage03'),
            icon: <UsersRoundIcon size={15} />,
            card: <Features />,
            tags: list('tags03'),
        },
    ]

    const teach: Step[] = [
        {
            title: t('titleT1'),
            description: t('descriptionT1'),
            stage: t('stageT1'),
            icon: <LockKeyholeIcon size={15} />,
            card: <Apply />,
        },
        {
            title: t('titleT2'),
            description: t('descriptionT2'),
            stage: t('stageT2'),
            icon: <ReceiptTextIcon size={15} />,
            card: <Publish />,
        },
        {
            title: t('title04'),
            description: t('description04'),
            stage: t('stage04'),
            icon: <Landmark size={13} />,
            card: <CashOut />,
            tags: list('tags04'),
        },
    ]

    return { learn, teach }
}

export default function HowItWorks() {
    const { t } = useLanguage()
    const { learn, teach } = useTracks()

    return (
        <section
            className="relative mx-auto max-w-6xl w-full px-4 py-24 overflow-x-hidden"
            id="how-it-works"
        >
            {/* Header */}
            <motion.div
                className="mx-auto mb-16 max-w-3xl text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {t('howItWorks')}
                </span>

                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-center">
                    {t('HHeader')}
                </h2>

                <p className="mt-5 text-lg text-muted-foreground text-balance">
                    {t('HSubtext')}
                </p>
            </motion.div>

            <p className="mb-12 text-center text-xs text-muted-foreground">
                {t('productPreview')}
            </p>

            {/* Two tracks: columns on desktop, stacked on mobile.
                In right-to-left languages the grid order flips by itself. */}
            <div className="grid gap-20 lg:grid-cols-2 md:justify-center lg:gap-16">
                <Track label={t('trackLearn')} steps={learn} />
                <Track label={t('trackTeach')} steps={teach} />
            </div>
        </section>
    )
}

function Track({ label, steps }: { label: string; steps: Step[] }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 75%', 'end 25%'],
    })
    const progress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.2,
    })
    const lineHeight = useTransform(progress, [0, 1], ['0%', '100%'])

    return (
        <div ref={ref}>
            <h3 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
                {label}
            </h3>

            <div className="relative ps-10">
                {/* Line: logical properties so it sits on the correct side in Arabic */}
                <div className="absolute inset-s-3 top-0 h-full w-px bg-border" />
                <motion.div
                    style={{ height: lineHeight }}
                    className="absolute inset-s-3 top-0 w-px bg-foreground"
                />
                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <TrackStep
                            key={step.title}
                            step={step}
                            number={String(index + 1).padStart(2, '0')}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function TrackStep({ step, number }: { step: Step; number: string }) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Node on the line */}
            <span className="absolute -inset-s-10 top-0 flex size-6 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px] text-muted-foreground shadow-sm">
                {number}
            </span>

            <div className="mb-3 flex items-center gap-2 font-mono text-sm text-muted-foreground">
                {step.icon}
                <span>{step.stage}</span>
            </div>

            <h4 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {step.title}
            </h4>

            <p className="mt-2 max-w-md text-base leading-7 text-muted-foreground">
                {step.description}
            </p>

            {step.tags && step.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="primary-light"
                            className="rounded-xl p-3"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}
            <div className="mt-6 max-w-md">{step.card}</div>
        </motion.div>
    )
}
