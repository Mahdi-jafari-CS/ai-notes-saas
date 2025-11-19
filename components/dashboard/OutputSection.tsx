import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OutputDisplay } from "./OutputDisplay"

type GenerationStatus = 'pending' | 'generating' | 'ready' | 'error'

interface OutputSectionProps {
  activeTab: string
  onTabChange: (tab: string) => void
  outputs: Record<string, string>
  isGenerating: boolean
  generationStatus: Record<string, GenerationStatus>
}

const StatusIndicator = ({ status }: { status: GenerationStatus }) => {
  switch (status) {
    case 'generating':
      return (
        <span className="ml-2 inline-flex items-center">
          <svg className="animate-spin h-3 w-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )
    case 'ready':
      return <span className="ml-2 text-green-500 text-xs">✓</span>
    case 'error':
      return <span className="ml-2 text-red-500 text-xs">✗</span>
    case 'pending':
      return <span className="ml-2 text-gray-400 text-xs">...</span>
    default:
      return null
  }
}

export function OutputSection({ activeTab, onTabChange, outputs, isGenerating, generationStatus }: OutputSectionProps) {
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="summary">
            <span>Summary</span>
            <StatusIndicator status={generationStatus.summary} />
          </TabsTrigger>
          <TabsTrigger value="bullets">
            <span>Bullet Points</span>
            <StatusIndicator status={generationStatus.bullets} />
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <span>Flashcards</span>
            <StatusIndicator status={generationStatus.flashcards} />
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <span>Quiz</span>
            <StatusIndicator status={generationStatus.quiz} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4 mt-4">
          {generationStatus.summary === 'generating' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">Generating summary...</p>
              </div>
            </div>
          ) : (
            <OutputDisplay content={outputs.summary || ''} type="summary" />
          )}
        </TabsContent>

        <TabsContent value="bullets" className="space-y-4 mt-4">
          {generationStatus.bullets === 'generating' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">Generating bullet points...</p>
              </div>
            </div>
          ) : generationStatus.bullets === 'pending' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Waiting to generate bullet points...</p>
            </div>
          ) : (
            <OutputDisplay content={outputs.bullets || ''} type="bullet points" />
          )}
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4 mt-4">
          {generationStatus.flashcards === 'generating' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">Generating flashcards...</p>
              </div>
            </div>
          ) : generationStatus.flashcards === 'pending' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Waiting to generate flashcards...</p>
            </div>
          ) : (
            <OutputDisplay content={outputs.flashcards || ''} type="flashcards" />
          )}
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4 mt-4">
          {generationStatus.quiz === 'generating' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">Generating quiz...</p>
              </div>
            </div>
          ) : generationStatus.quiz === 'pending' ? (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Waiting to generate quiz...</p>
            </div>
          ) : (
            <OutputDisplay content={outputs.quiz || ''} type="quiz" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}