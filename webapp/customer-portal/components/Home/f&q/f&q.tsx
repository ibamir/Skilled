'use client'

import { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import {
    GraduationCap,
    CreditCard,
    WalletCards,
    Rocket,
    Banknote,
    RotateCcw,
    BadgeCheck,
    MessageCircle,
    CircleCheck,
    Presentation,
    type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

type FaqItem = {
    icon: LucideIcon
    question: string
    answer: string
}

type FaqCategory = {
    id: string
    label: string
    icon: LucideIcon
    faqs: FaqItem[]
}

function CategoryPill({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground'
            }`}
        >
            {children}
        </button>
    )
}

export default function FrequentAskedQuestions() {
    const { t } = useLanguage()

    const faqCategories: FaqCategory[] = [
        {
            id: 'getting-started',
            label: t('faqCatGettingStarted'),
            icon: Rocket,
            faqs: [
                {
                    icon: GraduationCap,
                    question: t('fq1'),
                    answer: t('fq1answer'),
                },
                { icon: Rocket, question: t('fq6'), answer: t('fq6answer') },
                {
                    icon: CircleCheck,
                    question: t('fq12'),
                    answer: t('fq12answer'),
                },
            ],
        },
        {
            id: 'payments',
            label: t('faqCatPayments'),
            icon: WalletCards,
            faqs: [
                {
                    icon: CreditCard,
                    question: t('fq3'),
                    answer: t('fq3answer'),
                },
                { icon: Banknote, question: t('fq7'), answer: t('fq7answer') },
                { icon: RotateCcw, question: t('fq9'), answer: t('fq9answer') },
            ],
        },
        {
            id: 'teaching',
            label: t('faqCatTeaching'),
            icon: Presentation,
            faqs: [
                {
                    icon: Presentation,
                    question: t('fq13'),
                    answer: t('fq13answer'),
                },
                {
                    icon: BadgeCheck,
                    question: t('fq10'),
                    answer: t('fq10answer'),
                },
                {
                    icon: WalletCards,
                    question: t('fq4'),
                    answer: t('fq4answer'),
                },
            ],
        },
    ]

    const [activeCategory, setActiveCategory] = useState<string>('all')

    const visibleFaqs =
        activeCategory === 'all'
            ? faqCategories.flatMap((category) => category.faqs)
            : (faqCategories.find((c) => c.id === activeCategory)?.faqs ?? [])

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqCategories.flatMap((category) =>
            category.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
        ),
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-24" id="faq">
            {/* Google rich results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-10 flex flex-col items-center"
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground"
                >
                    {t('faq')}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl font-bold tracking-tight sm:text-5xl text-center"
                >
                    {t('frequentAsked')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg text-muted-foreground"
                >
                    {t('frequentAnswers')}
                </motion.p>
            </motion.div>

            {/* Category filter */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 flex flex-wrap items-center justify-center gap-2"
            >
                <CategoryPill
                    active={activeCategory === 'all'}
                    onClick={() => setActiveCategory('all')}
                >
                    {t('faqAll')}
                </CategoryPill>
                {faqCategories.map((category) => {
                    const Icon = category.icon
                    return (
                        <CategoryPill
                            key={category.id}
                            active={activeCategory === category.id}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <Icon className="h-4 w-4" strokeWidth={1.7} />
                            {category.label}
                        </CategoryPill>
                    )
                })}
            </motion.div>

            {/* FAQ grid — your original cards, untouched */}
            <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.05 }}
                className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
            >
                {visibleFaqs.map((faq) => {
                    const Icon = faq.icon

                    return (
                        <motion.article
                            key={faq.question}
                            variants={itemVariants}
                            className="group"
                        >
                            {/* Icon */}
                            <motion.div
                                whileHover={{
                                    y: -2,
                                    scale: 1.04,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 20,
                                }}
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-muted/30"
                            >
                                <Icon
                                    className="h-5 w-5 text-primary"
                                    strokeWidth={1.7}
                                />
                            </motion.div>

                            {/* Question */}
                            <h3 className="text-base font-medium tracking-tight">
                                {faq.question}
                            </h3>

                            {/* Answer */}
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {faq.answer}
                            </p>
                        </motion.article>
                    )
                })}
            </motion.div>

            {/* Still have questions? */}
            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-16 rounded-3xl border bg-muted/30 p-10 text-center sm:p-14"
            >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border bg-background">
                    <MessageCircle
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.7}
                    />
                </div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {t('faqStillHaveQuestions')}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    {t('faqStillHaveQuestionsDesc')}
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    ← replace with your real support email
                    <a
                        href="mailto:support@skilled.com"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        {t('faqContactSupport')}
                    </a>
                    ← replace #survey with your real survey link
                    <a
                        href="#survey"
                        className="inline-flex h-10 items-center justify-center rounded-full border px-6 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        {t('faqTakeSurvey')}
                    </a>
                </div>
            </motion.div> */}
        </section>
    )
}