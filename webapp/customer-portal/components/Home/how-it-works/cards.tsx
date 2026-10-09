import { Badge } from '@/components/reui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CircleCheckIcon } from '@/components/ui/circle-check'
import { DownloadIcon } from '@/components/ui/download'
import { FolderArchiveIcon } from '@/components/ui/folder-archive'
import { MessageSquareIcon } from '@/components/ui/message-square'
import { Progress } from '@/components/ui/progress'
import QrcodeIcon from '@/components/ui/qrcode-icon'
import ScanBarcodeIcon from '@/components/ui/scan-barcode-icon'
import { Separator } from '@base-ui/react'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'
import {
    CutoutCard,
    CutoutCardContent,
    CutoutCardImage,
    CutoutCardInsetLabel,
    CutoutCardMedia,
    CutoutCardOverlay,
    CutoutCorner,
} from '@/components/ui/cutout-card'
import { MouseEvent } from 'react'

export function FigmaWebFlow() {
    const { t } = useLanguage()

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
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <CutoutCard
                className="
                    w-full
                    border border-border
                    shadow-sm
                    transition-transform duration-300
                    hover:-translate-y-4
                    rounded-3xl
                    bg-card
                    relative
                    group
                    overflow-hidden
                "
            >
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />

                {/* IMAGE */}
                <CutoutCardMedia className="h-56">
                    <CutoutCardImage
                        src="/figmatowebflow.jpg"
                        alt={t('figmaCardHeader')}
                        className="object-cover rounded-t-3xl"
                    />

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
                            Figma → Webflow
                        </span>

                        <CutoutCorner className="absolute right-[-31px] -bottom-px rotate-90 text-background" />

                        <CutoutCorner className="absolute top-[-31px] -left-px rotate-90 text-background" />
                    </CutoutCardInsetLabel>
                </CutoutCardMedia>

                {/* CONTENT */}
                <CutoutCardContent className="px-6 py-5">
                    <h3 className="text-xl font-bold tracking-tight">
                        {t('figmaCardHeader')}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                        {t('figmaCardDescription')}
                    </p>
                </CutoutCardContent>
            </CutoutCard>
        </motion.div>
    )
}

export function Payment() {
    const { t } = useLanguage()

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
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <Card
                className="w-full shadow-sm rounded-4xl hover:-translate-y-4 relative group overflow-hidden"
            >
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />

                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center gap-4 h-fit w-full overflow-hidden rounded-xl p-2">
                        <div className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-2 font-bold text-lg text-primary">
                                <ScanBarcodeIcon size={20} />
                                {t('expressLocalCheckout')}
                            </span>
                            <Badge className="p-3 rounded-xl font-bold bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border border-green-700/30">
                                {t('instantRail')}
                            </Badge>
                        </div>
                        <Separator className="w-full h-px bg-border" />
                        <div className="flex items-center justify-between rounded-2xl w-full">
                            <span className="flex flex-col justify-center max-h-fit">
                                <p className="capitalize text-muted-foreground text-sm">
                                    {t('cartTotal')}
                                </p>
                                <span className="flex justify-center items-baseline gap-2">
                                    <p className="font-bold text-3xl text-primary">
                                        25.000
                                    </p>
                                    <p className="text-sm text-muted-foreground max-h-fit">
                                        TND
                                    </p>
                                </span>
                            </span>
                            <QrcodeIcon
                                size={50}
                                className="bg-white rounded-lg p-1 text-black"
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full bg-background border border-border rounded-xl p-2 gap-4">
                        <Image
                            width={35}
                            height={35}
                            src="/D17.svg"
                            alt="D17"
                            className="object-cover rounded-xl overflow-hidden"
                        />
                        <span className="flex flex-col justify-center">
                            <p className="text-md font-semibold">
                                {t('poste')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {t('PayViaMobile')}
                            </p>
                        </span>
                    </div>
                    <div className="flex items-center w-full bg-background border border-border rounded-xl p-2 gap-4">
                        <Image
                            width={35}
                            height={35}
                            src="/flouci.png"
                            alt="Flouci"
                            className="object-cover rounded-xl overflow-hidden"
                        />
                        <span className="flex flex-col justify-center">
                            <p className="text-md font-semibold">
                                {t('flouci')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {t('Scan')}
                            </p>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function Features() {
    const { t } = useLanguage()

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
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <Card
                className="w-full shadow-sm rounded-4xl hover:-translate-y-4 relative group overflow-hidden"
            >
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />
                <CardContent>
                    <div className="bg-card flex flex-col gap-4 rounded-2xl">
                        <CardHeader className="text-md">
                            <span className="flex items-center justify-between gap-2">
                                <p className="capitalize font-bold text-lg text-primary">
                                    {t('access')}
                                </p>
                                <Badge className="p-3 capitalize rounded-xl font-bold bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border border-green-700/30">
                                    {t('activeSeat')}
                                </Badge>
                            </span>
                        </CardHeader>
                        <div className="px-4">
                            <Separator className="w-full h-px bg-border" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between p-2 bg-background rounded-2xl border border-border px-4">
                                <div className="flex items-center justify-center gap-4">
                                    <FolderArchiveIcon size={22} />
                                    <span className="flex flex-col justify-center">
                                        <p className="text-md font-semibold">
                                            {t('saas')}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-thin">
                                            {t('includeNextJs')}
                                        </p>
                                    </span>
                                </div>
                                <DownloadIcon
                                    size={22}
                                    className="md:block hidden"
                                />
                            </div>
                            <div className="flex md:flex-row flex-wrap items-center justify-between p-2 bg-background rounded-2xl border border-border px-4 md:gap-0 gap-2">
                                <div className="flex items-center justify-center gap-4">
                                    <MessageSquareIcon size={22} />
                                    <span className="flex flex-col justify-center">
                                        <p className="text-md font-semibold">
                                            {t('private')}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-thin">
                                            {t('members')}
                                        </p>
                                    </span>
                                </div>
                                <Button
                                    className="rounded-xl"
                                    variant="secondary"
                                >
                                    {t('join')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function CashOut() {
    const { t } = useLanguage()

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
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <Card className="w-full shadow-sm rounded-4xl hover:-translate-y-4 relative group overflow-hidden">
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center gap-2 h-fit w-full overflow-hidden p-1">
                        <span className="flex items-center text-primary justify-between w-full font-bold text-md">
                            <span className="flex items-center justify-center gap-2 capitalize font-bold text-lg text-primary">
                                <ScanBarcodeIcon size={20} />
                                {t('automate')}
                            </span>
                            <CircleCheckIcon
                                size={20}
                                className="text-green-600"
                            />
                        </span>
                        <div className="px-4 w-full pt-2">
                            <Separator className="w-full h-px bg-border" />
                        </div>
                        <div className="flex flex-col justify-center w-full">
                            <span className="flex items-baseline gap-2">
                                <p className="font-bold text-3xl text-primary">
                                    840.000
                                </p>
                                <p className="text-sm text-muted-foreground max-h-fit">
                                    TND
                                </p>
                            </span>
                            <p className="capitalize text-muted-foreground text-sm">
                                {t('creditTo')}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full bg-background border border-border rounded-xl p-4 gap-2">
                        <span className="flex items-center justify-between w-full">
                            <p className="">{t('totalGross')}</p>
                            <p className="font-bold">954.500 TND</p>
                        </span>
                        <span className="flex items-center justify-between w-full">
                            <p className="">{t('creatorRevenue')}</p>
                            <p className="font-bold text-green-600">88.0%</p>
                        </span>
                        <Progress
                            value={80}
                            max={100}
                            min={0}
                            className="w-full h-fit **:data-[slot=progress-indicator]:bg-green-600!"
                        />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function Apply() {
    const { t } = useLanguage()

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
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <Card
                className="w-full shadow-sm rounded-4xl hover:-translate-y-4 relative group overflow-hidden"
            >
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-lg text-primary">
                            {t('applyHeader')}
                        </span>
                        <Badge className="p-3 rounded-xl font-bold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-700/30">
                            {t('applyStatus')}
                        </Badge>
                    </div>
                    <Separator className="w-full h-px bg-border" />
                    <div className="flex flex-col gap-1 rounded-xl border border-border bg-background p-3">
                        <p className="text-xs text-muted-foreground">
                            {t('applyField')}
                        </p>
                        <p className="text-md font-semibold">
                            {t('applySample')}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-2 px-4">
                        <FolderArchiveIcon size={22} />
                        <span className="flex flex-col justify-center">
                            <p className="text-md font-semibold">
                                {t('applyOutline')}
                            </p>
                            <p className="text-xs text-muted-foreground font-thin">
                                {t('applyOutlineNote')}
                            </p>
                        </span>
                    </div>
                    <Button className="rounded-xl" variant="secondary">
                        {t('applyButton')}
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function Publish() {
    const { t } = useLanguage()

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
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover="hover"
            onMouseMove={handleMouseMove}
        >
            <Card className="w-full shadow-sm rounded-4xl hover:-translate-y-4 relative group overflow-hidden">
                {/* Spotlight layer */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-lg text-primary">
                            {t('publishHeader')}
                        </span>
                        <Badge className="p-3 rounded-xl font-bold bg-muted text-muted-foreground border border-border">
                            {t('publishDraft')}
                        </Badge>
                    </div>
                    <Separator className="w-full h-px bg-border" />
                    <div className="flex flex-col gap-1 rounded-xl border border-border bg-background p-3">
                        <p className="text-xs text-muted-foreground">
                            {t('publishTitleLabel')}
                        </p>
                        <p className="text-md font-semibold">
                            {t('publishTitle')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 rounded-xl border border-border bg-background p-3">
                            <p className="text-xs text-muted-foreground">
                                {t('publishLessonsLabel')}
                            </p>
                            <p className="text-md font-semibold">
                                {t('publishLessons')}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-xl border border-border bg-background p-3">
                            <p className="text-xs text-muted-foreground">
                                {t('publishPriceLabel')}
                            </p>
                            <span className="flex items-baseline gap-2">
                                <p className="font-bold text-xl text-primary">
                                    {t('publishPrice')}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    TND
                                </p>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-2 px-4">
                        <FolderArchiveIcon size={22} />
                        <p className="text-sm font-semibold">
                            {t('publishResources')}
                        </p>
                    </div>
                    <Button className="rounded-xl">{t('publishButton')}</Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}
