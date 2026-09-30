'use client'

import { useLanguage } from '@/lib/language-switch/LanguageProvider'
import { Badge } from '@/components/reui/badge'
import { Megaphone } from 'lucide-react'

export default function PrelaunchBanner() {
    const { t } = useLanguage()

    return (
        <aside className="flex w-full max-w-6xl justify-center px-2">
            <Badge
                variant="primary-light"
                size="xl"
                radius="full"
                className="h-auto max-w-full whitespace-normal px-4 py-2 text-center leading-5"
            >
                <Megaphone aria-hidden="true" className="size-4" />
                <span>{t('prelaunchBanner')}</span>
            </Badge>
        </aside>
    )
}
