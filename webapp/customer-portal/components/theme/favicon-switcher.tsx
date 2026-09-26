'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ROTATION_DEG = 0

function rotateSvgToDataUrl(svgUrl: string, deg: number): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            const size = 64
            const canvas = document.createElement('canvas')
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext('2d')!
            ctx.translate(size / 2, size / 2)
            ctx.rotate((deg * Math.PI) / 180)
            ctx.drawImage(img, -size / 2, -size / 2, size, size)
            resolve(canvas.toDataURL('image/png'))
        }
        img.src = svgUrl
    })
}

export function FaviconSwitcher() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const src = resolvedTheme === 'dark' ? '/dark.svg' : '/light.svg'

        rotateSvgToDataUrl(src, ROTATION_DEG).then((dataUrl) => {
            let favicon =
                document.querySelector<HTMLLinkElement>("link[rel='icon']")
            if (!favicon) {
                favicon = document.createElement('link')
                favicon.rel = 'icon'
                document.head.appendChild(favicon)
            }
            favicon.href = dataUrl
        })
    }, [resolvedTheme, mounted])

    return null
}