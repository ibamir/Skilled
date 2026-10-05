'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ExpandingArrowButton } from '@/components/motion/expanding-arrow-button'
import { CircleCheckIcon } from '@/components/ui/circle-check'
import { Progress } from '@/components/ui/progress'
import { UserIcon } from '@/components/ui/user'
import { WalletIcon } from '@/components/ui/wallet'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
    CutoutCard,
    CutoutCardContent,
    CutoutCardFooter,
    CutoutCardImage,
    CutoutCardInsetLabel,
    CutoutCardMedia,
    CutoutCardOverlay,
    CutoutCardPin,
    CutoutCorner,
    cutoutCardSurfaceClassName,
} from '@/components/ui/cutout-card'

const FAN = [
    // first card: left in LTR, right in RTL
    {
        wrapper: 'lg:mt-12',
        card: '[--fan:6deg] rtl:[--fan:-6deg] lg:rotate-[var(--fan)] lg:hover:rotate-0',
    },
    // center, raised
    { wrapper: 'lg:mt-0', card: '' },
    // last card: right in LTR, left in RTL
    {
        wrapper: 'lg:mt-12',
        card: '[--fan:-6deg] rtl:[--fan:6deg] lg:rotate-[var(--fan)] lg:hover:rotate-0',
    },
]


export function useCards() {
    const { t } = useLanguage()

    return [
        {
            id: 1,
            image: '/figmatowebflow.jpg',
            title: t('title1'),
            body: t('body1'),
            footer: (
                <div className="w-full flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center justify-center gap-2 group">
                        <WalletIcon
                            className="group-hover:-translate-y-0.5"
                            size={15}
                        />
                        {t('payWith')}
                    </span>
                    <span className="flex items-center gap-1 text-green-600">
                        {t('instant')} <CircleCheckIcon size={15} />
                    </span>
                </div>
            ),
        },
        {
            id: 2,
            image: '/nextjs.jpg',
            title: t('title2'),
            body: t('body2'),
            footer: (
                <div className="w-full flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center justify-center gap-2">
                        <UserIcon size={16} />
                        {t('learners')}
                    </span>
                    <span className="shrink-0">65 TND</span>
                </div>
            ),
        },
        {
            id: 3,
            title: (
                <span className='flex items-center gap-2'>
                    <CircleCheckIcon size={15} />
                    {t('title3')}
                </span>
            ),
            body: t('body3'),
            footer: (
                <div className="w-full flex flex-col justify-center gap-2">
                    <Progress
                        value={80}
                        max={100}
                        min={0}
                        className="w-full h-fit"
                    />
                    <span className="flex items-center justify-between gap-2 text-xs">
                        <h1>{t('creatorPay')}</h1>
                        <h1>{t('platform')}</h1>
                    </span>
                </div>
            ),
            card: (
                <div className="flex flex-col items-center justify-center gap-2 h-56 w-full overflow-hidden rounded-xl bg-background p-4 border border-border">
                    <span className="flex items-center justify-between w-full font-bold text-sm">
                        {t('CreatorEarn')}
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
                            {t('ready')}
                        </p>
                    </span>
                    <span className="flex items-center justify-between w-full bg-secondary rounded-xl p-2">
                        <p>{t('flouci')}</p>
                        <p className="text-green-600 font-bold">
                            {t('connected')}
                        </p>
                    </span>
                    <span className="flex items-center justify-between w-full bg-secondary rounded-xl p-2">
                        <p>{t('poste')}</p>
                        <p className="text-green-600 font-bold">
                            {t('connected')}
                        </p>
                    </span>
                </div>
            ),
        },
    ]
}

export function Cards() {
    const { t } = useLanguage()
    const cardData = useCards()

    return (
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-6 lg:gap-12">
                {cardData.map((card, i) => {
                    const fan = FAN[i] ?? FAN[1]

                    return (
                        <motion.div
                            key={card.id}
                            className={`w-full max-w-sm mx-auto ${
                                fan.wrapper
                            } ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{
                                duration: 0.45,
                                delay: i * 0.4,
                                ease: 'easeOut',
                            }}
                        >
                            <CutoutCard
                                className={`
                                    ${cutoutCardSurfaceClassName}
                                    ${fan.card}
                                    transition-transform duration-300
                                    hover:-translate-y-3
                                    border border-border
                                `}
                            >
                                {/* IMAGE / VISUAL */}
                                <CutoutCardMedia className="h-56">
                                    {card.card ? (
                                        card.card
                                    ) : (
                                        <CutoutCardImage
                                            src={card.image}
                                            alt={
                                                typeof card.title === 'string'
                                                    ? card.title
                                                    : 'Talented'
                                            }
                                        />
                                    )}

                                    <CutoutCardOverlay />

                                    {/* Small label sitting inside the image */}
                                    <CutoutCardInsetLabel
                                        className="
                                            bottom-0
                                            left-0
                                            rounded-tr-[20px]
                                            bg-background
                                            px-5  
                                            py-1
                                        "
                                    >
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                            {card.id === 1
                                                ? t('payWith')
                                                : card.id === 2
                                                  ? t('learners')
                                                  : t('creatorPay')}
                                        </span>

                                        <CutoutCorner className="absolute right-[-31px] -bottom-px rotate-90 text-background" />

                                        <CutoutCorner className="absolute top-[-31px] -left-px rotate-90 text-background" />
                                    </CutoutCardInsetLabel>
                                </CutoutCardMedia>

                                {/* CONTENT */}
                                <CutoutCardContent className="px-6 py-5">
                                    <div>
                                        <h3 className="text-xl font-bold tracking-tight">
                                            {card.title}
                                        </h3>
                                    </div>

                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {card.body}
                                    </p>
                                </CutoutCardContent>

                                {/* FOOTER */}
                                <CutoutCardFooter className="px-6 pb-6">
                                    {card.footer}
                                </CutoutCardFooter>
                            </CutoutCard>
                        </motion.div>
                    )
                })}
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
                {t('cardsDescription')}
            </p>
        </div>
    )
}


export function TabletCards() {
    const { t } = useLanguage()
    const cardData = useCards()

    const total = cardData.length
    const [active, setActive] = useState(Math.floor(total / 2)) // start with the middle card centered
    const reduceMotion = useReducedMotion()

    const rootRef = useRef<HTMLDivElement>(null)
    const [wrapW, setWrapW] = useState(0)
    const [stageLeft, setStageLeft] = useState(0)
    useEffect(() => {
        const update = () => {
            const el = rootRef.current
            if (!el) return
            setWrapW(Math.floor(document.documentElement.clientWidth))
            setStageLeft(el.getBoundingClientRect().left)
        }
        update()
        window.addEventListener('resize', update)
        const ro = new ResizeObserver(update)
        if (rootRef.current) ro.observe(rootRef.current)
        return () => {
            window.removeEventListener('resize', update)
            ro.disconnect()
        }
    }, [])

    const EDGE = 16 // px kept clear on each side, on every screen
    const MAX_STAGE = 1280 // above this the fan stops growing and is centered
    const SIDE_SCALE = 0.9
    const TILT_PAD = 22 // extra half-width a 6deg tilt adds to a side card (px)

    const available = Math.min(wrapW || 360, MAX_STAGE) - EDGE * 2
    const cardW = Math.min(320, Math.max(210, available * 0.55))
    const sideHalf = (cardW * SIDE_SCALE) / 2 + TILT_PAD
    const spread = Math.max(0, available / 2 - sideHalf)

    const slots = {
        '-1': {
            x: -spread,
            y: 24,
            rotate: -6,
            scale: SIDE_SCALE,
            zIndex: 10,
        },
        '0': { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30 },
        '1': { x: spread, y: 24, rotate: 6, scale: SIDE_SCALE, zIndex: 10 },
    } as const

    const next = () => setActive((a) => (a + 1) % total)
    const prev = () => setActive((a) => (a - 1 + total) % total)

    // Signed distance from the active card, wrapped into -1 / 0 / 1.
    const getSlot = (i: number) => {
        let d = (i - active + total) % total
        if (d > total / 2) d -= total
        return String(Math.max(-1, Math.min(1, d))) as keyof typeof slots
    }

    return (
        <div
            ref={rootRef}
            className="relative mx-auto w-full max-w-7xl"
            role="group"
            aria-roledescription="carousel"
            onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') prev()
                if (e.key === 'ArrowRight') next()
            }}
        >
            {/* Viewport-wide stage. Clips only on the x axis. */}
            <div
                className="overflow-x-clip"
                style={{
                    width: wrapW || '100%',
                    marginLeft: wrapW ? -stageLeft : 0,
                }}
            >
                <motion.div
                    // All cards share one grid cell, so the stack is exactly as tall as the tallest card.
                    className="grid w-full justify-items-center py-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                    {cardData.map((card, i) => {
                        const slot = getSlot(i)
                        const isActive = slot === '0'

                        return (
                            <motion.div
                                key={card.id ?? i}
                                className="col-start-1 row-start-1 h-full"
                                style={{
                                    width: cardW,
                                    cursor: isActive ? 'default' : 'pointer',
                                }}
                                animate={slots[slot]}
                                transition={
                                    reduceMotion
                                        ? { duration: 0 }
                                        : {
                                              type: 'spring',
                                              stiffness: 260,
                                              damping: 28,
                                          }
                                }
                                onClick={() => !isActive && setActive(i)}
                                aria-hidden={!isActive}
                            >
                                <CutoutCard
                                    className={` 
                                        ${cutoutCardSurfaceClassName}
                                        w-full
                                        border border-border
                                        transition-transform duration-300
                                        ${isActive ? 'shadow-lg' : 'shadow-md'}
                                    `}
                                >
                                    {/* IMAGE / VISUAL */}
                                    <CutoutCardMedia className="h-56">
                                        {card.card ? (
                                            card.card
                                        ) : (
                                            <CutoutCardImage
                                                src={card.image}
                                                alt={
                                                    typeof card.title ===
                                                    'string'
                                                        ? card.title
                                                        : 'Talented'
                                                }
                                            />
                                        )}

                                        <CutoutCardOverlay />

                                        {/* Cutout label */}
                                        <CutoutCardInsetLabel
                                            className="
                                                bottom-0
                                                left-0
                                                rounded-tr-[20px]
                                                bg-background
                                                px-5
                                                py-1
                                            "
                                        >
                                            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                                {card.id === 1
                                                    ? t('payWith')
                                                    : card.id === 2
                                                      ? t('learners')
                                                      : t('creatorPay')}
                                            </span>

                                            <CutoutCorner className="absolute right-[-31px] -bottom-px rotate-90 text-background" />

                                            <CutoutCorner className="absolute top-[-31px] -left-px rotate-90 text-background" />
                                        </CutoutCardInsetLabel>
                                    </CutoutCardMedia>

                                    {/* CONTENT */}
                                    <CutoutCardContent className="px-6 py-5">
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {card.body}
                                        </p>
                                    </CutoutCardContent>

                                    {/* FOOTER */}
                                    <CutoutCardFooter
                                        className={`px-6 pb-6 ${
                                            isActive
                                                ? ''
                                                : 'pointer-events-none'
                                        }`}
                                    >
                                        {card.footer}
                                    </CutoutCardFooter>
                                </CutoutCard>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* Arrows live below the stack so they never cover card content */}
            <div className="mt-2 flex items-center justify-center gap-3">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    aria-label="Previous card"
                    className="size-10 rounded-full"
                >
                    <ChevronLeft className="size-5" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={next}
                    aria-label="Next card"
                    className="size-10 rounded-full"
                >
                    <ChevronRight className="size-5" />
                </Button>
            </div>

            <p className="mt-6 px-2 text-center text-xs text-muted-foreground sm:px-6">
                {t('cardsDescription')}
            </p>
        </div>
    )
}

export default function HeroSection() {
    const { t } = useLanguage()

    return (
        <div className="w-full flex flex-col items-center justify-center pb-10 space-y-10">
            {/* Header */}
            <motion.h1
                className="text-7xl md:text-9xl font-black tracking-tighter text-primary max-w-7xl leading-[0.9] rtl:leading-[1.3] rtl:**:leading-[1.3] mb-10 text-center capitalize"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {t('headline')}
            </motion.h1>

            {/* Sub text */}
            <motion.h2
                className="text-center text-xl md:text-2xl text-muted-foreground font-bold max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
                {t('heroSubtext')}
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
                    accentClassName="bg-background dark:bg-background"
                    className="bg-primary capitalize font-extrabold!"
                    onClick={() =>
                        document
                            .getElementById('help-us')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                >
                    {t('cta')}
                </ExpandingArrowButton>
            </motion.div>

            {/* Hover cards */}
            <div className="lg:block sm:block md:hidden pt-10">
                <Cards />
            </div>
            <div className="hidden md:block lg:hidden">
                <TabletCards />
            </div>
        </div>
    )
}
