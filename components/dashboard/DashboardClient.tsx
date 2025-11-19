'use client'

import { useState } from "react"
import { InputSection } from "./InputSection"
import { OutputSection } from "./OutputSection"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"

const loadingStates = [
  { text: "Analyzing your content..." },
  { text: "Generating comprehensive summary..." },
  { text: "Creating organized bullet points..." },
  { text: "Designing study flashcards..." },
  { text: "Preparing quiz questions..." },
  { text: "Finalizing your study materials..." },
]

type ViewStage = 'upload' | 'results'
type GenerationStatus = 'pending' | 'generating' | 'ready' | 'error'

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("summary")
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewStage, setViewStage] = useState<ViewStage>('upload')
  const [outputs, setOutputs] = useState<Record<string, string>>({
    summary: '',
    bullets: '',
    flashcards: '',
    quiz: ''
  })
  const [generationStatus, setGenerationStatus] = useState<Record<string, GenerationStatus>>({
    summary: 'pending',
    bullets: 'pending',
    flashcards: 'pending',
    quiz: 'pending'
  })

  const handleFileUploaded = () => {
    // Do nothing - keep in upload view until generate is clicked
  }

  const handleStartNew = () => {
    setViewStage('upload')
    setOutputs({
      summary: '',
      bullets: '',
      flashcards: '',
      quiz: ''
    })
    setGenerationStatus({
      summary: 'pending',
      bullets: 'pending',
      flashcards: 'pending',
      quiz: 'pending'
    })
  }

  const handleGenerate = async (inputText: string, fileName?: string, noteId?: string) => {
    setIsGenerating(true)
    
    try {
      // Update note status to 'generating' and save current inputText
      if (noteId) {
        await fetch(`/api/notes?id=${noteId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputText: inputText,
            status: 'generating'
          }),
        })
      }

      // Step 1: Generate summary first
      setGenerationStatus(prev => ({ ...prev, summary: 'generating' }))
      console.log('🚀 Generating summary...', { textLength: inputText.length })
      
      const summaryResponse = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: inputText,
          type: 'summary'
        })
      })
      
      const allGeneratedContent: Record<string, string> = {}
      
      if (!summaryResponse.ok) {
        const errorData = await summaryResponse.json().catch(() => ({}))
        console.error('❌ Summary generation failed:', errorData)
        setGenerationStatus(prev => ({ ...prev, summary: 'error' }))
        setOutputs(prev => ({ ...prev, summary: 'Error generating summary. Please try again.' }))
        allGeneratedContent.summary = 'Error generating summary. Please try again.'
      } else {
        const summaryData = await summaryResponse.json()
        const summaryContent = summaryData.result || summaryData.content
        setOutputs(prev => ({ ...prev, summary: summaryContent }))
        setGenerationStatus(prev => ({ ...prev, summary: 'ready' }))
        allGeneratedContent.summary = summaryContent
        console.log('✅ Summary generated successfully')
      }

      // Show results page with summary immediately
      setIsGenerating(false)
      setViewStage('results')

      // Step 2: Generate remaining content in background
      const remainingTypes: Array<'bullets' | 'flashcards' | 'quiz'> = ['bullets', 'flashcards', 'quiz']
      
      for (const type of remainingTypes) {
        // Add delay to avoid rate limiting (6 seconds between requests)
        await new Promise(resolve => setTimeout(resolve, 6000))
        
        setGenerationStatus(prev => ({ ...prev, [type]: 'generating' }))
        console.log(`🚀 Generating ${type}...`)
        
        try {
          const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              text: inputText,
              type: type
            })
          })
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error(`❌ ${type} generation failed:`, errorData)
            setGenerationStatus(prev => ({ ...prev, [type]: 'error' }))
            setOutputs(prev => ({ ...prev, [type]: `Error generating ${type}. Please try again.` }))
            allGeneratedContent[type] = `Error generating ${type}. Please try again.`
          } else {
            const data = await response.json()
            const generatedContent = data.result || data.content
            setOutputs(prev => ({ ...prev, [type]: generatedContent }))
            setGenerationStatus(prev => ({ ...prev, [type]: 'ready' }))
            allGeneratedContent[type] = generatedContent
            console.log(`✅ ${type} generated successfully`)
          }
        } catch (error) {
          console.error(`❌ Error generating ${type}:`, error)
          setGenerationStatus(prev => ({ ...prev, [type]: 'error' }))
          setOutputs(prev => ({ ...prev, [type]: `Error generating ${type}. Please try again.` }))
          allGeneratedContent[type] = `Error generating ${type}. Please try again.`
        }
      }

      // After all generations complete, update the note
      if (noteId) {
        console.log('📤 Updating note with all AI content:', { noteId })
        
        const updateResponse = await fetch(`/api/notes?id=${noteId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            outputType: 'all',
            outputText: JSON.stringify(allGeneratedContent),
            status: 'completed'
          }),
        })
        
        if (!updateResponse.ok) {
          const errorData = await updateResponse.json()
          console.error('❌ Failed to update note:', errorData)
        } else {
          console.log('✅ Note updated with all AI content')
        }
      }

    } catch (error) {
      console.error('Generation failed:', error)
      setIsGenerating(false)
      
      // Update note status to failed if we have a noteId
      if (noteId) {
        try {
          await fetch(`/api/notes?id=${noteId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: 'failed'
            }),
          })
        } catch (dbError) {
          console.error('Failed to update note status:', dbError)
        }
      }
    }
  }

  const hasResults = Object.values(outputs).some(output => output.length > 0)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Multi-step Loader */}
      <MultiStepLoader loadingStates={loadingStates} loading={isGenerating} duration={2000} />
      
      <div className="container mx-auto p-6">
        {/* Header - Shrinks when in results view */}
        <div className={`text-center transition-all duration-500 ${viewStage === 'results' ? 'mb-4' : 'mb-8'}`}>
          <h1 className={`font-bold text-gray-900 dark:text-white transition-all duration-500 ${viewStage === 'results' ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            AI Study Notes Generator
          </h1>
          {viewStage !== 'results' && (
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2 animate-fade-in">
              Upload your study materials and get instant summaries, flashcards, and quizzes
            </p>
          )}
        </div>

        {/* Dynamic Layout based on stage */}
        {viewStage === 'upload' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <InputSection 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              onFileUploaded={handleFileUploaded}
              viewStage={viewStage}
            />
          </div>
        )}

        {viewStage === 'results' && (
          <div className="animate-fade-in space-y-4">
            {/* Small file info chip at top */}
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <InputSection 
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                onFileUploaded={handleFileUploaded}
                viewStage={viewStage}
              />
              <button
                onClick={handleStartNew}
                className="px-4 py-2 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white hover:bg-card dark:hover:bg-gray-800 rounded-lg transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:border-muted dark:hover:border-gray-500 bg-white dark:bg-gray-800"
              >
                📤 Upload New Document
              </button>
            </div>

            {/* Full-width results */}
            <div className="max-w-7xl mx-auto">
              <OutputSection
                activeTab={activeTab}
                onTabChange={setActiveTab}
                outputs={outputs}
                isGenerating={isGenerating}
                generationStatus={generationStatus}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}