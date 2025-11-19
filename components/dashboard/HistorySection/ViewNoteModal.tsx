'use client'

import { Note } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { X, Copy, Download } from 'lucide-react'
import { useState } from 'react'
import { OutputDisplay } from '@/components/dashboard/OutputDisplay'
import { formatNoteContent } from '@/lib/formatNoteContent'

interface ViewNoteModalProps {
  note: Note
  isOpen: boolean
  onClose: () => void
}

export function ViewNoteModal({ note, isOpen, onClose }: ViewNoteModalProps) {
  const [activeTab, setActiveTab] = useState('summary')

  if (!isOpen) return null

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'bullets', label: 'Key Points' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'quiz', label: 'Quiz' }
  ]

  // Format the content based on type
  const formattedContent = formatNoteContent(note.outputText || '', activeTab)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {note.title || 'Untitled Document'}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Created {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <OutputDisplay 
            content={formattedContent} 
            type={activeTab} 
          />
        </div>
      </div>
    </div>
  )
}