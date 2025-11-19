'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, X, RotateCcw, Award } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number // 0-3 for A-D
  explanation?: string
}

interface QuizDisplayProps {
  content: string
}

export function QuizDisplay({ content }: QuizDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  const questions = parseQuiz(content)
  
  // Initialize userAnswers array
  if (userAnswers.length === 0 && questions.length > 0) {
    setUserAnswers(new Array(questions.length).fill(null))
  }
  
  if (questions.length === 0) {
    return <div className="text-muted-foreground">No quiz questions found in the content.</div>
  }

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(optionIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    const newAnswers = [...userAnswers]
    newAnswers[currentIndex] = selectedAnswer
    setUserAnswers(newAnswers)
    setShowResult(true)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(userAnswers[currentIndex + 1])
      setShowResult(userAnswers[currentIndex + 1] !== null)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setUserAnswers(new Array(questions.length).fill(null))
    setQuizCompleted(false)
  }

  // Calculate score
  const score = userAnswers.reduce((acc: number, answer, idx) => {
    if (answer === questions[idx]?.correctAnswer) return acc + 1
    return acc
  }, 0)

  const percentage = Math.round((score / questions.length) * 100)

  // Quiz completed - show results
  if (quizCompleted) {
    return (
      <div className="space-y-6">
        <div className="bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 text-center">
          <Award className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-muted-foreground mb-6">
            You scored {percentage}%
          </div>
          
          {/* Performance message */}
          <div className={`text-lg font-medium ${
            percentage >= 80 ? 'text-green-600' :
            percentage >= 60 ? 'text-blue-600' :
            percentage >= 40 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {percentage >= 80 ? '🎉 Excellent work!' :
             percentage >= 60 ? '👍 Good job!' :
             percentage >= 40 ? '📚 Keep studying!' :
             '💪 Practice makes perfect!'}
          </div>
        </div>

        {/* Review answers */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Review Your Answers</h3>
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[idx]
            const isCorrect = userAnswer === q.correctAnswer
            
            return (
              <div key={idx} className={`border-2 rounded-lg p-4 ${
                isCorrect ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 mt-1" />
                  ) : (
                    <X className="w-6 h-6 text-red-600 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-2">
                      {q.question}
                    </div>
                    <div className="space-y-2">
                      <div className="text-muted-foreground">
                        Your answer: <span className={isCorrect ? 'text-green-700 dark:text-green-400 font-medium' : 'text-red-700 dark:text-red-400 font-medium'}>
                          {userAnswer !== null ? q.options[userAnswer] : 'Not answered'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-green-700 dark:text-green-400">
                          Correct answer: <span className="font-medium">{q.options[q.correctAnswer]}</span>
                        </div>
                      )}
                      {q.explanation && (
                        <div className="text-muted-foreground/80 mt-2 italic">
                          💡 {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Button onClick={handleRestart} className="w-full" size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Quiz
        </Button>
      </div>
    )
  }

  // Quiz in progress
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card rounded-xl border-2 p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx
            const isCorrect = idx === currentQuestion.correctAnswer
            const showCorrectness = showResult
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrectness && isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : showCorrectness && isSelected && !isCorrect
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border hover:border-muted-foreground bg-card'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showCorrectness && isCorrect
                      ? 'bg-green-500 text-white'
                      : showCorrectness && isSelected && !isCorrect
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1 text-foreground">{option}</span>
                  {showCorrectness && isCorrect && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                  {showCorrectness && isSelected && !isCorrect && (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showResult && currentQuestion.explanation && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 rounded">
            <div className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Explanation:</div>
            <div className="text-blue-800 dark:text-blue-200">{currentQuestion.explanation}</div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {!showResult ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1"
            size="lg"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex-1"
            size="lg"
          >
            {isLastQuestion ? 'View Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  )
}

function parseQuiz(content: string): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  
  // Split by question numbers or ### Question markers
  const questionSections = content.split(/(?:###\s*Question\s*\d+|^\d+\.|Question\s*\d+)/im)
  
  for (const section of questionSections) {
    const trimmed = section.trim()
    if (!trimmed || trimmed.length < 10) continue
    
    // Extract question text (everything before first option)
    const questionMatch = trimmed.match(/^(.+?)(?=[A-D]\))/s)
    if (!questionMatch) continue
    
    const question = questionMatch[1].trim()
    
    // Extract options A) B) C) D)
    const options: string[] = []
    const optionMatches = trimmed.matchAll(/([A-D])\)\s*(.+?)(?=[A-D]\)|$|Correct Answer|Answer:|Explanation)/gis)
    
    for (const match of optionMatches) {
      options.push(match[2].trim())
    }
    
    if (options.length < 2) continue
    
    // Extract correct answer
    const answerMatch = trimmed.match(/(?:Correct\s*)?Answer:?\s*\*?\*?([A-D])\*?\*?/i)
    const correctAnswerLetter = answerMatch ? answerMatch[1].toUpperCase() : 'A'
    const correctAnswer = correctAnswerLetter.charCodeAt(0) - 65 // Convert A-D to 0-3
    
    // Extract explanation
    const explanationMatch = trimmed.match(/Explanation:?\s*\*?\*?(.+?)(?=$|###|\n\n)/is)
    const explanation = explanationMatch ? explanationMatch[1].trim() : undefined
    
    questions.push({
      question,
      options,
      correctAnswer: Math.max(0, Math.min(3, correctAnswer)),
      explanation
    })
  }
  
  return questions
}
