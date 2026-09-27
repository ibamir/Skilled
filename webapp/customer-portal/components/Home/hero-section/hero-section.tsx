'use client'

import { motion } from 'motion/react'
import { ExpandingArrowButton } from '@/components/motion/expanding-arrow-button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CircleCheckIcon } from '@/components/ui/circle-check'
import { Progress } from '@/components/ui/progress'
import { UserIcon } from '@/components/ui/user'
import { WalletIcon } from '@/components/ui/wallet'
import Image from 'next/image'

const cardData = [
    {
        id: 1,
        image: '/course-figma-to-webflowcover.jpeg',
        rotate: 'md:-rotate-5',
        title: 'Figma to Webflow for Freelancers',
        body: 'Build client-ready websites and turn your design skills into paid work.',
        footer: (
            <div className="bg-secondary h-10 rounded-xl flex items-center justify-between px-2">
                <span className="flex items-center justify-center gap-2 group">
                    <WalletIcon
                        className="group-hover:-translate-y-0.5"
                        size={16}
                    />
                    Pay locally with D17 or Flouci
                </span>
                Instant
            </div>
        ),
    },
    {
        id: 2,
        image: '/how-to-use-supabase-with-nextjs.webp',
        rotate: '',
        title: 'Build a SaaS with Next.js',
        body: 'A practical course for developers building and launching their first real product.',
        footer: (
            <div className="bg-secondary h-10 rounded-xl flex items-center justify-between px-2">
                <span className="flex items-center justify-center gap-2">
                    <UserIcon size={16} />
                    120 learners joined
                </span>
                65 TND
            </div>
        ),
    },
    {
        id: 3,
        rotate: 'md:rotate-5',
        title: (
            <>
                <CircleCheckIcon size={15} />
                Keep 88% of every sale
            </>
        ),
        titleCentered: true,
        body: 'Sell your guides and courses with clear pricing and payouts designed for Tunisia.',
        footer: (
            <div className="bg-secondary h-12 rounded-xl flex flex-col justify-center gap-2 px-2">
                <Progress
                    value={80}
                    max={100}
                    min={0}
                    className="w-full h-fit"
                />
                <span className="flex items-center justify-between gap-2 text-xs">
                    <h1>Creator Payout: 88%</h1>
                    <h1>Platform + Gateway: 12%</h1>
                </span>
            </div>
        ),
        card: (
            <div className="flex flex-col items-center justify-center gap-2 h-48 w-full overflow-hidden rounded-xl bg-background p-4 border border-border">
                <span className="flex items-center justify-between w-full font-bold text-sm">
                    Creator earnings
                    <WalletIcon className="text-primary" size={17} />
                </span>
                <span className="flex flex-col items-center justify-between w-full">
                    <span className="flex items-center justify-baseline gap-2">
                        <h1 className="text-3xl font-bold text-primary">
                            1,480.00
                        </h1>
                        <p className="text-sm">TND</p>
                    </span>

                    <p className="text-xs text-muted-foreground">
                        Ready for local payout
                    </p>
                </span>
                <span className="flex items-center justify-between w-full bg-secondary rounded-xl p-2">
                    <p>Flouci App Wallet</p>
                    <p className="text-green-600 font-bold">Connected</p>
                </span>
                <span className="flex items-center justify-between w-full bg-secondary rounded-xl p-2">
                    <p>D17 App Wallet</p>
                    <p className="text-green-600 font-bold">Connected</p>
                </span>
            </div>
        ),
    },
]

export function Cards() {
    return (
        <div className="relative w-full max-w-7xl mx-auto pt-6 px-2 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-center gap-6 lg:gap-8">
                {cardData.map((card, i) => (
                    <motion.div
                        key={i}
                        className={`w-full max-w-sm mx-auto ${
                            card.id === 3 ? 'sm:col-span-2 lg:col-span-1' : ''
                        }`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 0.45,
                            delay: i * 0.4,
                            ease: 'easeOut',
                        }}
                    >
                        <Card
                            className={`w-full h-full border border-primary rounded-3xl hover:-translate-y-10 hover:duration-200 shadow-md ${card.rotate}`}
                        >
                            <CardContent className="flex flex-col gap-4 h-full">
                                <div className="relative h-48 w-full overflow-hidden rounded-xl flex items-center justify-center">
                                    {card.card ? (
                                        card.card
                                    ) : (
                                        <Image
                                            src={card.image}
                                            alt="course preview"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <CardHeader
                                    className={`text-xl font-bold p-0 ${
                                        card.titleCentered
                                            ? 'flex items-center gap-2'
                                            : ''
                                    }`}
                                >
                                    {card.title}
                                </CardHeader>

                                <p className="text-muted-foreground text-sm">
                                    {card.body}
                                </p>

                                {card.footer}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
                Product preview - illustrative data.
            </p>
        </div>
    )
}

export default function HeroSection() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 p-4 pb-12 space-y-10">
            
            {/* Header */}
            <motion.h1
                className="text-7xl md:text-9xl font-black tracking-tighter text-primary max-w-7xl leading-[0.9] mb-10 text-center capitalize"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                Get paid for what you know.
            </motion.h1>

            {/* Sub text */}
            <motion.h2
                className="text-center text-xl md:text-2xl text-muted-foreground font-bold max-w-3xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
                Talented is coming soon — a place to learn practical skills,
                share what you know, and get paid for it.
            </motion.h2>

            {/* Call to action */}
            <motion.div
                className="flex flex-wrap items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
                <ExpandingArrowButton
                    labelClassName="text-accent"
                    accentClassName="bg-secondary dark:bg-background"
                    className="bg-primary capitalize font-extrabold"
                    onClick={() =>
                        document
                            .getElementById('help-us')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                >
                    Take the survey
                </ExpandingArrowButton>
            </motion.div>

            {/* Hover cards */}
            <Cards />
        </div>
    )
}
