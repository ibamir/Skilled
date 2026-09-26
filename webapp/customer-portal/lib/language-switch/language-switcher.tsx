'use client'
import { useLanguage } from './LanguageProvider'
import {
    MorphSelect,
    MorphSelectContent,
    MorphSelectItem,
    MorphSelectTrigger,
    MorphSelectValue,
} from '@/components/motion/select'

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    return (
        <MorphSelect
            value={language}
            onValueChange={(value) => {
                if (value === 'en' || value === 'ar') {
                    setLanguage(value)
                }
            }}
        >
            <MorphSelectTrigger className="h-full max-h-fit text-md! cursor-pointer text-xs rounded-lg! bg-transparent border-none shadow-none w-20 px-0 text-md">
                <MorphSelectValue className="text-md" />
            </MorphSelectTrigger>

            <MorphSelectContent className="rounded-xl! w-25 bg-background border border-border text-primary! hover:text-primary! text-md">
                <MorphSelectItem
                    value="en"
                    className="cursor-pointer h-9! hover:bg-primary/20! hover:text-primary hover:font-bold text-md"
                >
                    English
                </MorphSelectItem>
                <MorphSelectItem
                    value="ar"
                    className="cursor-pointer h-9! hover:bg-primary/20! hover:text-primary hover:font-bold text-md"
                >
                    Arabic
                </MorphSelectItem>
            </MorphSelectContent>
        </MorphSelect>
    )
}
