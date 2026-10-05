'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useInView, type Variants } from 'motion/react'
import {
    BookOpen,
    BriefcaseBusiness,
    Frown,
    GraduationCap,
    Heart,
    Layers,
    LayoutTemplate,
    Library,
    Loader2,
    Mail,
    Meh,
    MonitorPlay,
    PenLine,
    Store,
    ThumbsUp,
    Video,
    Zap,
} from 'lucide-react'
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const questionVariants: Variants = {
    enter: (direction: number) => ({
        opacity: 0,
        x: 24 * direction,
    }),
    center: {
        opacity: 1,
        x: 0,
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: -24 * direction,
    }),
}

export function InterestForm() {
    const id = useId()
    const { t } = useLanguage()

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [direction, setDirection] = useState(1)
    const [error, setError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState(false)

    const headingRef = useRef<HTMLHeadingElement>(null)
    const prevQuestionRef = useRef(currentQuestion)

    useEffect(() => {
        // skip the initial mount — only focus when the question really changed
        if (prevQuestionRef.current === currentQuestion) return
        prevQuestionRef.current = currentQuestion

        const timer = setTimeout(
            () => headingRef.current?.focus({ preventScroll: true }),
            260,
        )
        return () => clearTimeout(timer)
    }, [currentQuestion])

    const questions = [
        {
            id: 'role',
            question: t('question1'),
            options: [
                { value: 'student', label: t('label1a'), icon: GraduationCap },
                {
                    value: 'professional',
                    label: t('label1b'),
                    icon: BriefcaseBusiness,
                },
                { value: 'creator', label: t('label1c'), icon: Video },
            ],
        },
        {
            id: 'interest',
            question: t('question2'),
            layout: 'grid',
            options: [
                { value: 'learn', label: t('label2a'), icon: BookOpen },
                { value: 'sell', label: t('label2b'), icon: Store },
                { value: 'both', label: t('label2c'), icon: Layers },
            ],
        },
        {
            id: 'content',
            question: t('question3'),
            layout: 'grid',
            options: [
                {
                    value: 'templates',
                    label: t('label3a'),
                    icon: LayoutTemplate,
                },
                { value: 'courses', label: t('label3b'), icon: MonitorPlay },
                { value: 'resources', label: t('label3c'), icon: Library },
                { value: 'skills', label: t('label3d'), icon: Zap },
                { value: 'other', label: t('label3e'), icon: PenLine },
            ],
        },
        {
            id: 'likelihood',
            question: t('question4'),
            layout: 'grid',
            options: [
                { value: 'definitely', label: t('label4a'), icon: Heart },
                { value: 'probably', label: t('label4b'), icon: ThumbsUp },
                { value: 'maybe', label: t('label4c'), icon: Meh },
                { value: 'probably-not', label: t('label4d'), icon: Frown },
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
    const isLastQuestion = currentQuestion === questions.length - 1
    const progress = Math.round(
        ((currentQuestion + 1) / questions.length) * 100,
    )

    const selectAnswer = (value: string) => {
        setAnswers((prev) => {
            const next = { ...prev, [question.id]: value }
            if (question.id === 'content' && value !== 'other') {
                delete next.contentOther
            }
            return next
        })
        setError(null)
        if (isEmailQuestion) setEmailError(false)
    }

    const handleNext = async (event: FormEvent) => {
        event.preventDefault()
        if (isSubmitting || submitted) return
        if (!selectedAnswer?.trim()) return

        if (isEmailQuestion && !EMAIL_RE.test(selectedAnswer.trim())) {
            setEmailError(true)
            return
        }

        if (
            question.id === 'content' &&
            selectedAnswer === 'other' &&
            !answers.contentOther?.trim()
        ) {
            return
        }

        if (isLastQuestion) {
            setIsSubmitting(true)
            setError(null)

            const completeData = {
                ...answers,
                [question.id]: selectedAnswer.trim(),
            }

            try {
                const response = await saveToNotion(completeData)
                if (response.success) {
                    setSubmitted(true)
                } else {
                    setError(t('formError'))
                }
            } catch (err) {
                console.error(err)
                setError(t('formError'))
            } finally {
                setIsSubmitting(false)
            }
            return
        }

        setDirection(1)
        setCurrentQuestion((prev) => prev + 1)
    }

    const back = () => {
        if (currentQuestion === 0 || isSubmitting) return
        setError(null)
        setEmailError(false)
        setDirection(-1)
        setCurrentQuestion((prev) => prev - 1)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mx-auto w-full max-w-2xl rounded-3xl border bg-muted/30 p-10 text-center sm:p-14"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-primary text-accent ring-8 ring-primary/15"
                >
                    <CheckIcon size={26} />
                </motion.div>

                <h3 className="text-2xl font-semibold tracking-tight">
                    {t('thx')}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    {t('message')}
                </p>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="mx-auto w-full max-w-3xl rounded-3xl border bg-card p-6 sm:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <form onSubmit={handleNext} noValidate>
                {/* Progress */}
                <div
                    className="mb-8"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={questions.length}
                    aria-valuenow={currentQuestion + 1}
                    aria-label={`${t('question')} ${currentQuestion + 1} ${t('from')} ${questions.length}`}
                >
                    <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            {t('question')} {currentQuestion + 1} {t('from')}{' '}
                            {questions.length}
                        </span>

                        <span>{progress}%</span>
                    </div>

                    <div className="flex gap-1.5">
                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
                            >
                                <motion.div
                                    className="h-full rounded-full bg-primary"
                                    initial={false}
                                    animate={{
                                        width:
                                            index <= currentQuestion
                                                ? '100%'
                                                : '0%',
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: 'easeOut',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={question.id}
                        custom={direction}
                        variants={questionVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <h2
                            ref={headingRef}
                            tabIndex={-1}
                            className="text-2xl font-semibold tracking-tight focus:outline-none"
                        >
                            {question.question}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {isEmailQuestion ? t('enter') : t('choose')}
                        </p>

                        {isEmailQuestion ? (
                            <div>
                                <div className="relative mt-6">
                                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        value={selectedAnswer ?? ''}
                                        onChange={(event) =>
                                            selectAnswer(event.target.value)
                                        }
                                        placeholder={t('enterEmail')}
                                        aria-invalid={emailError}
                                        className="h-12 rounded-2xl bg-background pl-11"
                                    />
                                </div>
                                {emailError ? (
                                    <p
                                        role="alert"
                                        className="mt-2 text-sm text-destructive"
                                    >
                                        {t('errorEmail')}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-xs text-muted-foreground">
                                        {t('emailPrivacy')}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <>
                                <RadioGroup
                                    value={selectedAnswer ?? ''}
                                    onValueChange={(value) =>
                                        selectAnswer(value ?? '')
                                    }
                                    className={cn(
                                        'mt-6 gap-3',
                                        question.layout === 'grid' &&
                                            'grid grid-cols-1 sm:grid-cols-2',
                                    )}
                                >
                                    {question.options.map((option) => {
                                        const Icon =
                                            'icon' in option
                                                ? option.icon
                                                : null

                                        const isSelected =
                                            selectedAnswer === option.value
                                        const itemId = `${id}-${question.id}-${option.value}`

                                        return (
                                            <Label
                                                key={option.value}
                                                htmlFor={itemId}
                                                className={cn(
                                                    'flex w-full cursor-pointer items-center gap-3 rounded-2xl border bg-background p-4 text-left transition-all hover:-translate-y-0.5',
                                                    isSelected
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-input hover:border-primary/40',
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
                                                            x: isSelected
                                                                ? [0, 4, 0]
                                                                : 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            ease: 'easeOut',
                                                        }}
                                                        className={cn(
                                                            'flex size-9 shrink-0 items-center justify-center rounded-xl border',
                                                            isSelected
                                                                ? 'border-primary/20 bg-primary/10 text-primary'
                                                                : 'bg-muted/50 text-muted-foreground',
                                                        )}
                                                    >
                                                        <Icon
                                                            className="size-4"
                                                            strokeWidth={1.7}
                                                        />
                                                    </motion.span>
                                                )}

                                                <span className="text-sm font-medium">
                                                    {option.label}
                                                </span>

                                                {isSelected && (
                                                    <motion.span
                                                        initial={{
                                                            scale: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            scale: 1,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 500,
                                                            damping: 25,
                                                        }}
                                                        className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                                                    >
                                                        <CheckIcon size={11} />
                                                    </motion.span>
                                                )}
                                            </Label>
                                        )
                                    })}
                                </RadioGroup>

                                {question.id === 'content' &&
                                    selectedAnswer === 'other' && (
                                        <Input
                                            value={answers.contentOther ?? ''}
                                            onChange={(event) =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    contentOther:
                                                        event.target.value,
                                                }))
                                            }
                                            placeholder={t('tellUs')}
                                            className="mt-3 h-12 rounded-2xl bg-background"
                                            autoFocus
                                        />
                                    )}
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Submit error */}
                {error && (
                    <p role="alert" className="mt-6 text-sm text-destructive">
                        {error}
                    </p>
                )}

                {/* Navigation */}
                <div
                    className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"
                    dir="ltr"
                >
                    <Button
                        type="button"
                        onClick={back}
                        disabled={currentQuestion === 0 || isSubmitting}
                        className="h-11! w-full! gap-2 rounded-2xl p-2 sm:w-30!"
                        variant="secondary"
                        dir="ltr"
                    >
                        <ArrowLeftIcon size={17} />
                        {t('back')}
                    </Button>

                    <motion.button
                        type="submit"
                        disabled={!selectedAnswer || isSubmitting}
                        whileTap={{ scale: 0.97 }}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary sm:w-auto sm:min-w-30"
                        dir="ltr"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={17} className="animate-spin" />
                                {t('sending')}
                            </>
                        ) : (
                            <>
                                {isLastQuestion ? t('finish') : t('continue')}
                                <ArrowRightIcon size={17} />
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
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
            className="mx-auto w-full max-w-6xl px-4 py-24"
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
