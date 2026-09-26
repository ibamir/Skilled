import { clsx, type ClassValue } from 'clsx'
import type { MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function scrollToHash(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
) {
    if (!href.startsWith('#')) return

    const target = document.getElementById(href.slice(1))
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
}
