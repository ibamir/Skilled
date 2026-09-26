import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { FaviconSwitcher } from '@/components/theme/favicon-switcher'
import { LanguageProvider } from '@/lib/language-switch/LanguageProvider'
import { ToasterProvider } from '@/components/theme/toster-provider'

const PlusJakartaSans = Plus_Jakarta_Sans({
    variable: '--font-plus-jakarta',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Talented | Learn any skill',
    description:
        'Learn practical skills, share what you know, and discover creators on Talented.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${PlusJakartaSans.variable}  h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ToasterProvider />
                    <FaviconSwitcher />
                    <LanguageProvider>{children}</LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
