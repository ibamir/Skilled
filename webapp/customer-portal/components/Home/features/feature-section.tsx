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

type FeatureType = {
    title: string
    icon: React.ReactNode
    description: string
}

export default function Features() {
    return (
        <motion.div
            className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center gap-12 px-8 py-24 md:px-8"
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
                    Features
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Skills for real life and work
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    When Talented launches, learners will be able to build
                    practical skills, access useful resources, and sell what
                    they know through a platform built for Tunisia.
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
            className={cn(
                'w-full'
            )}
            {...props}
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
        >
            <Card className="bg-background border border-primary w-full rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <CardContent className="p-6">
                    <div className="bg-muted dark:bg-muted/10 mb-2 size-fit rounded-lg p-px">
                        <div className="flex h-10 w-10 p-1 text-primary items-center justify-center rounded-lg bg-background shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-background dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
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

const features: FeatureType[] = [
    {
        title: 'Learn practical skills',
        icon: <RocketIcon />,
        description:
            'At launch, learners will be able to explore short courses and guides focused on practical skills.',
    },
    {
        title: 'Access useful resources',
        icon: <KeyCircleIcon />,
        description:
            'At launch, learners will be able to access templates, study guides, and community in one place.',
    },
    {
        title: 'Pay with local methods',
        icon: <ShieldCheckIcon />,
        description:
            'At launch, learners will be able to pay in TND through D17 and Flouci, with no foreign card needed.',
    },
    {
        title: 'Earn from what you know',
        icon: <CreditCard />,
        description:
            'At launch, creators will be able to sell their work with clear pricing and an 88% share.',
    },
]
