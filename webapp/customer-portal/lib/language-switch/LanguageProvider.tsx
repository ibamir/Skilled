'use client'

import {
    createContext,
    useContext,
    useEffect,
    useSyncExternalStore,
} from 'react'
import { DirectionProvider } from '@base-ui/react'
import { translations } from './translations'

type Language = 'en' | 'ar'
type Direction = 'ltr' | 'rtl'

const STORAGE_KEY = 'language'
const LANGUAGE_CHANGE_EVENT = 'language-change'

function subscribeToLanguage(onChange: () => void) {
    const handleStorage = (event: StorageEvent) => {
        if (event.key === STORAGE_KEY) onChange()
    }
    const handleLanguageChange = () => onChange()

    window.addEventListener('storage', handleStorage)
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange)

    return () => {
        window.removeEventListener('storage', handleStorage)
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange)
    }
}

function getStoredLanguage(): Language {
    return window.localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en'
}

function getServerLanguage(): Language {
    return 'en'
}

type LanguageContextType = {
    language: Language
    setLanguage: (language: Language) => void
    direction: Direction
    t: (
        key: keyof typeof translations.en,
        vars?: Record<string, string | number>,
    ) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore(
        subscribeToLanguage,
        getStoredLanguage,
        getServerLanguage,
    )

    const direction = language === 'ar' ? 'rtl' : 'ltr'

    const setLanguage = (lang: Language) => {
        window.localStorage.setItem(STORAGE_KEY, lang)
        window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT))
    }

    const t = (
        key: keyof typeof translations.en,
        vars?: Record<string, string | number>,
    ) => {
        let text: string = translations[language][key]
        if (vars) {
            for (const [k, v] of Object.entries(vars)) {
                text = text.replace(`{${k}}`, String(v))
            }
        }
        return text
    }

    useEffect(() => {
        document.documentElement.lang = language
        document.documentElement.dir = direction
    }, [language, direction])

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                direction,
                t,
            }}
        >
            <DirectionProvider direction={direction}>
                {children}
            </DirectionProvider>
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider')
    }

    return context
}
