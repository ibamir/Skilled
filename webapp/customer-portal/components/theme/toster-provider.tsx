'use client'
import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

export function ToasterProvider() {
    const { theme } = useTheme()
    return (
        <Toaster
            position="bottom-right"
            theme={theme as 'light' | 'dark' | 'system'}
            style={
                {
                    '--normal-bg': 'var(--background)',
                    '--normal-text': 'var(--foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
        />
    )
}
