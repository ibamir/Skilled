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

const faqs = [
    {
        icon: GraduationCap,
        question: 'What exactly is Talented?',
        answer: 'Talented is being built as a learning platform where people will be able to discover useful skills, learn from creators, and share what they know.',
    },
    {
        icon: Users,
        question: 'Who can use Talented?',
        answer: 'When Talented launches, students will be able to find study resources and develop practical digital skills, while creators and top students will be able to turn their knowledge into income.',
    },
    {
        icon: CreditCard,
        question: 'How do I pay without an international card?',
        answer: 'When Talented launches, you will be able to pay in TND through D17 and Flouci, with no foreign card needed.',
    },
    {
        icon: WalletCards,
        question: 'Can I really make money on Talented?',
        answer: 'When Talented launches, creators and top students will be able to upload content, set their own prices, and earn when others purchase it. Earnings can be withdrawn to D17 or Flouci.',
    },
    {
        icon: ShieldCheck,
        question: 'How do you protect my content?',
        answer: 'When Talented launches, premium content will be protected with secure streaming, restricted copying and printing, and unique watermarks designed to discourage unauthorized sharing.',
    },
    {
        icon: Rocket,
        question: 'When is the official launch?',
        answer: 'Talented is preparing for launch and onboarding its first creators and tutors. Take the survey to get notified when the platform opens.',
    },
]

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
    return (
        <section className="mx-auto w-full max-w-6xl px-8 py-24" id="faq">
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
                    FAQ
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl font-bold tracking-tight sm:text-5xl"
                >
                    Frequently Asked Questions
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg text-muted-foreground"
                >
                    Everything you need to know about learning, sharing, and
                    earning on Talented.
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
                                <Icon className="h-5 w-5" strokeWidth={1.7} />
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
