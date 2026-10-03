'use client'

import { useLanguage } from '@/lib/language-switch/LanguageProvider'
import { Badge } from '@/components/reui/badge'
import { Megaphone } from 'lucide-react'
import { scrollToHash } from '@/lib/utils'


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
                <a
                    className="flex items-center justify-center gap-2"
                    href="#help-us"
                    onClick={(event) => scrollToHash(event, '#help-us')}
                >
                    <Megaphone aria-hidden="true" className="size-4" />
                    <span>{t('prelaunchBanner')}</span>
                </a>
            </Badge>
        </aside>
    )
}
