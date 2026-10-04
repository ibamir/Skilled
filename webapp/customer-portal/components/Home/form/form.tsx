'use client'

import { useId, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { GraduationCapIcon } from '@/components/ui/graduation-cap'
import { BriefcaseBusinessIcon } from '@/components/ui/briefcase-business'
import { CheckIcon } from '@/components/ui/check'
import { ArrowRightIcon } from '@/components/ui/arrow-right'
import { ArrowLeftIcon } from '@/components/ui/arrow-left'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { saveToNotion } from '@/app/actions/notion/action'
import { useLanguage } from '@/lib/language-switch/LanguageProvider'

export function InterestForm() {
    const id = useId()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { t } = useLanguage()

    const questions = [
        {
            id: 'role',
            question: t('question1'),
            options: [
                {
                    value: 'student',
                    label: t('label1a'),
                    icon: GraduationCapIcon,
                },
                {
                    value: 'professional',
                    label: t('label1b'),
                    icon: BriefcaseBusinessIcon,
                },
                {
                    value: 'creator',
                    label: t('label1c'),
                    icon: BriefcaseBusinessIcon,
                },
            ],
        },
        {
            id: 'interest',
            question: t('question2'),
            options: [
                {
                    value: 'learn',
                    label: t('label2a'),
                },
                {
                    value: 'sell',
                    label: t('label2b'),
                },
                {
                    value: 'both',
                    label: t('label2c'),
                },
            ],
        },
        {
            id: 'content',
            question: t('question3'),
            options: [
                {
                    value: 'templates',
                    label: t('label3a'),
                },
                {
                    value: 'courses',
                    label: t('label3b'),
                },
                {
                    value: 'resources',
                    label: t('label3c'),
                },
                {
                    value: 'skills',
                    label: t('label3d'),
                },
                {
                    value: 'other',
                    label: t('label3e'),
                },
            ],
        },
        {
            id: 'likelihood',
            question: t('question4'),
            options: [
                {
                    value: 'definitely',
                    label: t('label4a'),
                },
                {
                    value: 'probably',
                    label: t('label4b'),
                },
                {
                    value: 'maybe',
                    label: t('label4c'),
                },
                {
                    value: 'probably-not',
                    label: t('label4d'),
                },
            ],
        },
        {
            id: 'email',
            question: t('question5'),
            type: 'email',
            options: [],
        },
    ]

    const question = questions[currentQuestion]
    const selectedAnswer = answers[question.id]
    const isEmailQuestion = question.type === 'email'

    const selectAnswer = (value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [question.id]: value,
        }))
    }

    const next = async () => {
        if (!selectedAnswer) return
        if (
            question.id === 'content' &&
            selectedAnswer === 'other' &&
            !answers.contentOther?.trim()
        ) {
            return
        }

        // 1. Check if the user is submitting the very last question
        if (currentQuestion === questions.length - 1) {
            setIsSubmitting(true)

            // 2. Combine previous answers with the final question's answer
            const completeData = {
                ...answers,
                [question.id]: selectedAnswer,
            }

            try {
                // 3. Send all compiled data to Notion in one single batch
                const response = await saveToNotion(completeData)
                if (response.success) {
                    setSubmitted(true)
                } else {
                    alert('Something went wrong. Please try again.')
                }
            } catch (err) {
                console.error(err)
                alert('Connection error. Please check your network.')
            } finally {
                setIsSubmitting(false)
            }

            return
        }

        // Move to the next question if it's not the end
        setCurrentQuestion((prev) => prev + 1)
    }

    const back = () => {
        if (currentQuestion === 0) return

        setCurrentQuestion((prev) => prev - 1)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
            >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-accent">
                    <CheckIcon size={25} />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                    {t('thx')}
                </h3>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {t('message')}
                </p>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="mx-auto w-full max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Progress */}
            <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        {t('question')} {currentQuestion + 1} {t('from')}{' '}
                        {questions.length}
                    </span>

                    <span>
                        {Math.round(
                            ((currentQuestion + 1) / questions.length) * 100,
                        )}
                        %
                    </span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                        className="h-full bg-foreground"
                        initial={false}
                        animate={{
                            width: `${
                                ((currentQuestion + 1) / questions.length) * 100
                            }%`,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                        }}
                    />
                </div>
            </div>

            {/* Question */}
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                }}
            >
                <h2 className="text-2xl font-semibold tracking-tight">
                    {question.question}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    {isEmailQuestion ? t('enter') : t('choose')}
                </p>

                {isEmailQuestion ? (
                    <Input
                        type="email"
                        value={selectedAnswer ?? ''}
                        onChange={(event) => selectAnswer(event.target.value)}
                        placeholder={t('enterEmail')}
                        className="mt-6 h-12 rounded-2xl"
                        required
                    />
                ) : (
                    <RadioGroup
                        value={selectedAnswer ?? ''}
                        onValueChange={(value) => selectAnswer(value ?? '')}
                        className="mt-6 gap-3"
                    >
                        {question.options.map((option) => {
                            const Icon = 'icon' in option ? option.icon : null

                            const isSelected = selectedAnswer === option.value
                            const itemId = `${id}-${question.id}-${option.value}`

                            return (
                                <Label
                                    key={option.value}
                                    htmlFor={itemId}
                                    className={cn(
                                        'flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-4 text-left transition-colors',
                                        isSelected
                                            ? 'border-primary bg-primary/5'
                                            : 'border-input hover:bg-muted/50',
                                    )}
                                >
                                    <span className="relative flex size-5 shrink-0 items-center justify-center">
                                        <RadioGroupItem
                                            id={itemId}
                                            value={option.value}
                                            className="size-5 data-checked:bg-transparent! **:data-[slot=radio-group-indicator]:hidden"
                                        />
                                        {isSelected && (
                                            <motion.span
                                                layoutId={`${id}-${question.id}-indicator`}
                                                className="pointer-events-none absolute inset-1 rounded-full bg-primary"
                                                transition={{
                                                    type: 'spring',
                                                    bounce: 0.25,
                                                    duration: 0.45,
                                                }}
                                            />
                                        )}
                                    </span>

                                    {Icon && (
                                        <motion.span
                                            animate={{
                                                x: isSelected ? [0, 4, 0] : 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeOut',
                                            }}
                                            className={cn(
                                                'flex size-8 shrink-0 items-center justify-center rounded-lg',
                                                isSelected
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-background border border-border text-muted-foreground',
                                            )}
                                        >
                                            <Icon
                                                className="size-4 text-primary"
                                                size={14}
                                            />
                                        </motion.span>
                                    )}

                                    <span className="text-sm font-medium">
                                        {option.label}
                                    </span>
                                </Label>
                            )
                        })}
                        {question.id === 'content' &&
                            selectedAnswer === 'other' && (
                                <Input
                                    value={answers.contentOther ?? ''}
                                    onChange={(event) =>
                                        setAnswers((prev) => ({
                                            ...prev,
                                            contentOther: event.target.value,
                                        }))
                                    }
                                    placeholder={t('tellUs')}
                                    className="h-12 rounded-2xl"
                                    required
                                />
                            )}
                    </RadioGroup>
                )}
            </motion.div>

            {/* Navigation */}
            <div
                className="mt-8 flex flex-wrap items-center justify-between gap-3"
                dir="ltr"
            >
                <Button
                    onClick={back}
                    disabled={currentQuestion === 0}
                    className="h-10! w-30! rounded-2xl p-2 gap-2"
                    variant="secondary"
                    dir="ltr"
                >
                    <ArrowLeftIcon size={17} />
                    {t('back')}
                </Button>

                <motion.button
                    type="button"
                    onClick={next}
                    disabled={!selectedAnswer}
                    whileTap={{ scale: 0.97 }}
                    className="h-10! w-30! bg-primary text-primary-foreground hover:bg-primary/80 rounded-2xl flex items-center justify-center gap-2 p-2"
                    dir="ltr"
                >
                    {currentQuestion === questions.length - 1
                        ? t('finish')
                        : t('continue')}

                    <ArrowRightIcon size={17} />
                </motion.button>
            </div>
        </motion.div>
    )
}

export function InterestFormSection() {
    const { t } = useLanguage()
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, {
        once: false,
        amount: 0.05,
        margin: '0px',
    })

    return (
        <motion.section
            ref={sectionRef}
            className="mx-auto w-full max-w-6xl px-8 py-24"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            id="help-us"
        >
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {t('quick')}
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {t('help')}
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                    {t('answer')}
                </p>
            </div>
            <InterestForm />
        </motion.section>
    )
}
