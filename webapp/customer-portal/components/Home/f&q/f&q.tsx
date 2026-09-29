'use client'

import { motion, type Variants } from 'motion/react'
import {
    GraduationCap,
    Users,
    CreditCard,
    WalletCards,
    ShieldCheck,
    Rocket,
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

export default function FrequentAskedQuestions() {
    const { t } = useLanguage()
    
    const faqs = [
        {
            icon: GraduationCap,
            question: t('fq1'),
            answer: t('fq1answer'),
        },
        {
            icon: Users,
            question: t('fq2'),
            answer: t('fq2answer'),
        },
        {
            icon: CreditCard,
            question: t('fq3'),
            answer: t('fq3answer'),
        },
        {
            icon: WalletCards,
            question: t('fq4'),
            answer: t('fq4answer'),
        },
        {
            icon: ShieldCheck,
            question: t('fq5'),
            answer: t('fq5answer'),
        },
        {
            icon: Rocket,
            question: t('fq6'),
            answer: t('fq6answer'),
        },
    ]


    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-24" id="faq">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-12 flex flex-col items-center"
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
                    {t('frequentAnswers')}
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

            {/* FAQ grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
            >
                {faqs.map((faq) => {
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
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border bg-muted/30"
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
        </section>
    )
}
