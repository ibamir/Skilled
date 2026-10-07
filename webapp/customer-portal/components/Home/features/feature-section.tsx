'use client'

import type { ComponentType, MouseEvent } from 'react'
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    type Variants,
} from 'motion/react'
import { ShieldCheckIcon } from 'lucide-react'
import CreditCard from '@/components/ui/credit-card'
import { KeyCircleIcon } from '@/components/ui/key-circle'
import { RocketIcon } from '@/components/ui/rocket'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

type FeatureIcon = ComponentType<{
    size?: number
    className?: string
}>

type FeatureType = {
    title: string
    description: string
    icon: FeatureIcon
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function Features() {
    const { t } = useLanguage()

    const features: FeatureType[] = [
        {
            title: t('titleF1'),
            description: t('descriptionF1'),
            icon: RocketIcon,
        },
        {
            title: t('titleF2'),
            description: t('descriptionF2'),
            icon: KeyCircleIcon,
        },
        {
            title: t('titleF3'),
            description: t('descriptionF3'),
            icon: ShieldCheckIcon,
        },
        {
            title: t('titleF4'),
            description: t('descriptionF4'),
            icon: CreditCard,
        },
    ]

    return (
        <motion.div
            className="mx-auto w-full max-w-7xl px-4 py-24"
            id="features"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            {/* Header */}
            <motion.div
                className="mx-auto mb-12 max-w-2xl text-center"
                variants={itemVariants}
            >
                <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {t('features')}
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {t('featureHeader')}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t('featureDescription')}
                </p>
            </motion.div>

            {/* Cards */}
            <motion.div
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                }}
            >
                {features.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                ))}
            </motion.div>
        </motion.div>
    )
}

function FeatureCard({ feature }: { feature: FeatureType }) {
    const Icon = feature.icon

    // Mouse-following spotlight
    const mouseX = useMotionValue(-400)
    const mouseY = useMotionValue(-400)
    const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--primary) 10%, transparent), transparent 72%)`

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - bounds.left)
        mouseY.set(event.clientY - bounds.top)
    }

    return (
        <motion.div
            className="w-full"
            variants={itemVariants}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <Card className="group relative h-full w-full overflow-hidden rounded-4xl border border-border bg-card shadow-sm ring-0 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />

                <CardContent className="relative p-6">
                    {/* Icon tile */}
                    <motion.div
                        variants={{
                            visible: {
                                y: 0,
                                scale: 1,
                                transition: {
                                    duration: 0.3,
                                    ease: 'easeOut',
                                },
                            },
                            hover: {
                                y: -3,
                                scale: 1.08,
                                transition: {
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 20,
                                },
                            },
                        }}
                        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border bg-muted/30 text-primary"
                    >
                        <Icon size={20} />
                    </motion.div>

                    <h3 className="text-lg font-medium tracking-tight">
                        {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    )
}
