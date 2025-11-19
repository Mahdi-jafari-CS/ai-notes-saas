'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

interface Flashcard {
  question: string
  answer: string
}

interface FlashcardsDisplayProps {
  content: string
}

export function FlashcardsDisplay({ content }: FlashcardsDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  
  // Parse flashcards from markdown content
  const flashcards = parseFlashcards(content)
  
  if (flashcards.length === 0) {
    return <div className="text-muted-foreground">No flashcards found in the content.</div>
  }

  const currentCard = flashcards[currentIndex]

  const handleNext = () => {
    setFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
  }

  const handlePrevious = () => {
    setFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="font-medium">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
        <div className="flex gap-1">
          {flashcards.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-8 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-blue-600 dark:bg-blue-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Flashcard */}
      <div 
        className="relative h-80 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card (Question) */}
          <div className="absolute inset-0 backface-hidden">
            <div className="h-full bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-white">
              <div className="text-sm font-medium mb-4 opacity-90">QUESTION</div>
              <div className="text-2xl font-bold text-center leading-relaxed">
                {currentCard.question}
              </div>
              <div className="absolute bottom-6 text-sm opacity-75">
                Click to reveal answer
              </div>
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="h-full bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-white">
              <div className="text-sm font-medium mb-4 opacity-90">ANSWER</div>
              <div className="text-xl text-center leading-relaxed">
                {currentCard.answer}
              </div>
              <div className="absolute bottom-6 text-sm opacity-75">
                Click to see question
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={flashcards.length <= 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={() => {
            setCurrentIndex(0)
            setFlipped(false)
          }}
          variant="outline"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>

        <Button
          onClick={handleNext}
          variant="outline"
          disabled={flashcards.length <= 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function parseFlashcards(content: string): Flashcard[] {
  const cards: Flashcard[] = []
  
  // Split by common flashcard separators
  const cardSections = content.split(/(?:###\s*Flashcard\s*\d+|---|\n\n\n)/i)
  
  for (const section of cardSections) {
    const trimmed = section.trim()
    if (!trimmed) continue
    
    // Try to match Q: and A: format
    const qMatch = trimmed.match(/\*?\*?Q:?\*?\*?\s*(.+?)(?=\*?\*?A:?\*?\*?)/is)
    const aMatch = trimmed.match(/\*?\*?A:?\*?\*?\s*(.+?)(?=$|###|\n\n)/is)
    
    if (qMatch && aMatch) {
      cards.push({
        question: qMatch[1].trim(),
        answer: aMatch[1].trim()
      })
    }
  }
  
  return cards
}
