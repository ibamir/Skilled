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
import { motion } from 'motion/react'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

export function FigmaWebFlow() {
    const {t} = useLanguage()

    return (
        <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
        >
            <Card className="w-full border border-primary shadow-sm rounded-3xl hover:-translate-y-4">
                <CardContent className="flex flex-col gap-4">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl">
                        <img
                            src="/course-figma-to-webflowcover.jpeg"
                            alt="16:9"
                            width={1000}
                            height={800}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <CardHeader className="text-xl font-bold p-0">
                        {t('figmaCardHeader')}
                    </CardHeader>

                    <p className="text-foreground text-sm">
                        {t('figmaCardDescription')}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function Payment() {
    const { t } = useLanguage()

    return (
        <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
        >
            <Card className="w-full border border-primary shadow-sm rounded-3xl hover:-translate-y-4">
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center gap-2 h-full w-full overflow-hidden rounded-xl">
                        <div className="flex flex-col items-center justify-center gap-4 h-fit w-full overflow-hidden rounded-xl p-4">
                            <span className="flex items-center text-primary justify-between w-full font-bold text-md">
                                <span className="flex items-center justify-center gap-2">
                                    <ScanBarcodeIcon size={20} />
                                    {t('expressLocalCheckout')}
                                </span>
                                <Badge
                                    variant="success-light"
                                    className="p-3 rounded-xl font-bold "
                                >
                                    {t('instantRail')}
                                </Badge>
                            </span>
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
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function Features() {
    const { t } = useLanguage()

    return (
        <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
        >
            <Card className="w-full border border-primary shadow-sm rounded-3xl hover:-translate-y-4">
                <CardContent>
                    <div className="bg-background border border-border p-4 flex flex-col gap-4 rounded-2xl">
                        <CardHeader className="text-md p-0">
                            <span className="flex items-center justify-between gap-2">
                                <p className="uppercase font-bold text-primary">
                                    {t('access')}
                                </p>
                                <Badge
                                    variant="success-light"
                                    className="p-3 capitalize rounded-xl font-bold"
                                >
                                    {t('activeSeat')}
                                </Badge>
                            </span>
                        </CardHeader>

                        <div className="flex items-center justify-between p-2 bg-card rounded-2xl border border-border px-4">
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
                            <DownloadIcon size={22} className='md:block hidden'/>
                        </div>
                        <div className="flex md:flex-row flex-col items-center justify-between p-2 bg-card rounded-2xl border border-border px-4 md:gap-0 gap-2">
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
                            <Button className="rounded-xl md:w-fit w-full" variant="secondary">
                                {t('join')}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export function CashOut() {
    const { t } = useLanguage()

    return (
        <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
        >
            <Card className="w-full border border-primary shadow-sm rounded-3xl hover:-translate-y-4">
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center gap-4 h-full w-full overflow-hidden rounded-xl">
                        <div className="flex flex-col items-center justify-center gap-2 h-fit w-full overflow-hidden p-4">
                            <span className="flex items-center text-primary justify-between w-full font-bold text-md">
                                <span className="flex items-center justify-center gap-2">
                                    <ScanBarcodeIcon size={20} />
                                    {t('automate')}
                                </span>
                                <CircleCheckIcon
                                    size={20}
                                    className="text-green-600"
                                />
                            </span>
                            <Separator className="w-full h-px bg-border" />
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
                                <p className="font-bold text-green-600">
                                    88.0%
                                </p>
                            </span>
                            <Progress
                                value={80}
                                max={100}
                                min={0}
                                className="w-full h-fit **:data-[slot=progress-indicator]:bg-green-600!"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
