import { hero } from './translation/hero'
import { nav } from './translation/nav'
import { howItWorks } from './translation/how-it-works'
import { form } from './translation/form'
import { footer } from './translation/footer'
import { features } from './translation/features'

export const translations = {
    en: {
        ...hero.en,
        ...nav.en,
        ...howItWorks.en,
        ...form.en,
        ...footer.en,
        ...features.en,
    },
    ar: {
        ...hero.ar,
        ...nav.ar,
        ...howItWorks.ar,
        ...form.ar,
        ...footer.ar,
        ...features.ar,
    },
}
