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

const questions = [
    {
        id: 'role',
        question: 'What best describes you?',
        options: [
            {
                value: 'student',
                label: 'Student',
                icon: GraduationCapIcon,
            },
            {
                value: 'professional',
                label: 'Working professional / freelancer',
                icon: BriefcaseBusinessIcon,
            },
            {
                value: 'creator',
                label: 'Creator / Knowledge seller',
                icon: BriefcaseBusinessIcon,
            },
        ],
    },
    {
        id: 'interest',
        question: 'What would you use Talented for?',
        options: [
            {
                value: 'learn',
                label: 'Learn something new',
            },
            {
                value: 'sell',
                label: 'Sell / share what I know',
            },
            {
                value: 'both',
                label: 'Both',
            },
        ],
    },
    {
        id: 'content',
        question: 'What would you be most interested in?',
        options: [
            {
                value: 'templates',
                label: 'Templates & cheatsheets',
            },
            {
                value: 'courses',
                label: 'Mini-courses & videos',
            },
            {
                value: 'cohorts',
                label: 'Live cohorts / group sessions',
            },
            {
                value: 'skills',
                label: 'Practical skill tutorials',
            },
            {
                value: 'other',
                label: 'Other',
            },
        ],
    },
    {
        id: 'likelihood',
        question: 'Would you use Talented if it launched today?',
        options: [
            {
                value: 'definitely',
                label: 'Definitely',
            },
            {
                value: 'probably',
                label: 'Probably',
            },
            {
                value: 'maybe',
                label: 'Maybe, I want to see more',
            },
            {
                value: 'probably-not',
                label: 'Probably not right now',
            },
        ],
    },
    {
        id: 'email',
        question: 'Where should we send launch updates?',
        type: 'email',
        options: [],
    },
]

export function InterestForm() {
    const id = useId()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

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
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                    <CheckIcon size={25} />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                    Thanks for your interest!
                </h3>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Your answers help us build the right courses, resources, and
                    creator tools for the Talented community.
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
                        Question {currentQuestion + 1} of {questions.length}
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
                    {isEmailQuestion
                        ? 'Enter your email to get notified when we launch.'
                        : 'Choose the option that fits you best.'}
                </p>

                {isEmailQuestion ? (
                    <Input
                        type="email"
                        value={selectedAnswer ?? ''}
                        onChange={(event) => selectAnswer(event.target.value)}
                        placeholder="Enter your email"
                        className="mt-6 h-12 rounded-xl"
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
                                        'flex w-full cursor-pointer items-center gap-3 rounded-xl border p-4 text-left transition-colors',
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
                                                'flex size-8 shrink-0 items-center justify-center rounded-md',
                                                isSelected
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-foreground/10 text-muted-foreground',
                                            )}
                                        >
                                            <Icon
                                                className="size-4"
                                                size={14}
                                            />
                                        </motion.span>
                                    )}

                                    <span className="flex-1 text-sm font-medium">
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
                                    placeholder="Tell us what you would like to learn"
                                    className="h-12 rounded-xl"
                                    required
                                />
                            )}
                    </RadioGroup>
                )}
            </motion.div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
                <Button
                    onClick={back}
                    disabled={currentQuestion === 0}
                    className="h-10! rounded-xl p-2"
                    variant="secondary"
                >
                    <ArrowLeftIcon size={17} />
                    Back
                </Button>

                <motion.button
                    type="button"
                    onClick={next}
                    disabled={!selectedAnswer}
                    whileTap={{ scale: 0.97 }}
                    className="h-10! bg-primary text-primary-foreground hover:bg-primary/80 rounded-xl flex items-center justify-center gap-2 p-2"
                >
                    {currentQuestion === questions.length - 1
                        ? 'Finish'
                        : 'Continue'}

                    <ArrowRightIcon size={17} />
                </motion.button>
            </div>
        </motion.div>
    )
}

export function InterestFormSection() {
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
                    Quick community survey
                </span>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Help shape Talented.
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                    Answer a few quick questions about what you want to learn,
                    create, and access, then get notified when we launch.
                </p>
            </div>
            <InterestForm />
        </motion.section>
    )
}
