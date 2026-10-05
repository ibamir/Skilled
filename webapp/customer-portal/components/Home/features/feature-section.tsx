'use client'
import { cn } from '@/lib/utils'
import type React from 'react'
import { DecorIcon } from '@/components/Home/features/decor-icon'
import { ShieldCheckIcon } from 'lucide-react'
import CreditCard from '@/components/ui/credit-card'
import { KeyCircleIcon } from '@/components/ui/key-circle'
import { RocketIcon } from '@/components/ui/rocket'
import { motion, type MotionProps } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

type FeatureType = {
    title: string
    icon: React.ReactNode
    description: string
}

export default function Features() {
    const { t } = useLanguage()

    const features: FeatureType[] = [
        {
            title: t('titleF1'),
            icon: <RocketIcon />,
            description: t('descriptionF1'),
        },
        {
            title: t('titleF2'),
            icon: <KeyCircleIcon />,
            description: t('descriptionF2'),
        },
        {
            title: t('titleF3'),
            icon: <ShieldCheckIcon />,
            description: t('descriptionF3'),
        },
        {
            title: t('titleF4'),
            icon: <CreditCard />,
            description: t('descriptionF4'),
        },
    ]

    return (
        <motion.div
            className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center gap-12 px-2 py-24 md:px-4"
            id="features"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            <motion.div
                className="mx-auto max-w-2xl space-y-2 text-center"
                variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                    },
                }}
            >
                <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {t('features')}
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {t('featureHeader')}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    {t('featureDescription')}
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                }}
            >
                {features.map((feature) => (
                    <FeatureCard feature={feature} key={feature.title} />
                ))}
            </motion.div>
        </motion.div>
    )
}

function FeatureCard({
    feature,
    className,
    ...props
}: Omit<React.ComponentProps<'div'>, keyof MotionProps> &
    Pick<React.ComponentProps<'div'>, 'className'> & {
        feature: FeatureType
    }) {

    return (
        <motion.div
            className={cn('w-full')}
            {...props}
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
        >
            <Card className="bg-card border border-border w-full h-full shadow-sm rounded-4xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <CardContent className="p-6">
                    <div className="bg-background mb-2 size-fit rounded-xl p-px">
                        <div className="h-12 w-12 flex items-center justify-center rounded-2xl text-primary border bg-muted/30">
                            {feature.icon}
                        </div>
                    </div>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground mb-3 text-sm">
                        {feature.description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    )
}
