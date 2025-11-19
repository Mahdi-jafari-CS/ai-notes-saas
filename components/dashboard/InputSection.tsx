import { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { Button } from "@/components/ui/button"
import { Loader2, FileText } from "lucide-react"
import { parsePDF, validatePDFFile } from "@/lib/pdf-parser"
import { useUser } from "@clerk/nextjs"

interface InputSectionProps {
  onGenerate: (inputText: string, fileName?: string, noteId?: string) => void
  isGenerating: boolean
  onFileUploaded: () => void
  viewStage: 'upload' | 'results'
}

export function InputSection({ onGenerate, isGenerating, onFileUploaded, viewStage }: InputSectionProps) {
  const [files, setFiles] = useState<File[]>([])
  const [textInput, setTextInput] = useState("")
  const [isParsing, setIsParsing] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null)
  const [originalText, setOriginalText] = useState("") // Track original text for comparison
  const { user } = useUser()

  const createNoteInDatabase = async (inputText: string, fileName?: string) => {
    if (!user) {
      console.error("No user logged in")
      return null
    }

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: fileName ? fileName.replace('.pdf', '') : `Text Notes - ${new Date().toLocaleDateString()}`,
          inputText: inputText,
          inputType: files.length > 0 ? 'pdf' : 'text',
          fileName: fileName,
          status: 'pending'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create note in database')
      }

      const data = await response.json()
      return data.note.id
    } catch (error) {
      console.error('Error creating note:', error)
      return null
    }
  }

  const handleFileUpload = async (uploadedFiles: File[]) => {
    setParseError(null)
    setCurrentNoteId(null)
    
    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0]
      
      // Validate file before parsing
      const validationError = validatePDFFile(file)
      if (validationError) {
        setParseError(validationError)
        setFiles([]) // Clear files on validation error
        setTextInput("")
        return
      }
      
      // Only set files after validation passes
      setFiles(uploadedFiles)

      // Auto-parse PDF and extract text
      setIsParsing(true)
      try {
        const result = await parsePDF(file)
        const extractedText = result.text
        setTextInput(extractedText)
        setOriginalText(extractedText) // Store original for comparison
        setParseError(null)

        // Create note in database with parsed text
        const noteId = await createNoteInDatabase(extractedText, file.name)
        setCurrentNoteId(noteId)
        
        // Notify parent that file was uploaded
        onFileUploaded()
        
      } catch (error) {
        console.error('Failed to parse PDF:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to parse PDF'
        setParseError(errorMessage)
        setTextInput("") // Clear text input on error
      } finally {
        setIsParsing(false)
      }
    } else {
      setTextInput("") // Clear when no files
      setOriginalText("")
      setParseError(null)
      setCurrentNoteId(null)
    }
  }



  const handleGenerate = async () => {
    if (!textInput.trim() && files.length === 0) return
    
    // Check character limit before proceeding
    const MAX_CHARACTERS = 50000
    if (textInput.length > MAX_CHARACTERS) {
      setParseError(`Text is too long. Maximum ${MAX_CHARACTERS.toLocaleString()} characters allowed. Your text contains ${textInput.length.toLocaleString()} characters.`)
      return
    }
    
    const fileName = files.length > 0 ? files[0].name : undefined
    
    // If we don't have a note ID yet (text input only), create one now
    let noteId = currentNoteId
    if (!noteId && textInput.trim()) {
      noteId = await createNoteInDatabase(textInput, fileName)
      setCurrentNoteId(noteId)
    }

    onGenerate(textInput, fileName, noteId || undefined)
  }

  const canGenerate = !isGenerating && !isParsing && (textInput.trim() || files.length > 0)

  // Collapsed view for results stage
  if (viewStage === 'results') {
    return (
      <div className="flex items-center gap-3 text-sm text-foreground bg-card px-4 py-2 rounded-lg border shadow-sm">
        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span className="font-medium">
          {files.length > 0 ? files[0].name : 'Text Input'}
        </span>
        <span className="text-gray-500 dark:text-gray-400">•</span>
        <span className="text-gray-500 dark:text-gray-400">{textInput.length.toLocaleString()} characters</span>
      </div>
    )
  }

  // Combined upload and review view - always show everything together
  return (
    <div className="space-y-6 bg-card p-8 rounded-2xl shadow-xl border">
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 bg-blue-50/30 dark:bg-blue-900/20">
        <FileUpload onChange={handleFileUpload} />
        
        {isParsing && (
          <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Parsing PDF and saving to database...
          </div>
        )}
        
        {parseError && (
          <div className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            {parseError}
          </div>
        )}
        
        {files.length > 0 && !isParsing && !parseError && (
          <div className="mt-4 text-sm text-green-600 dark:text-green-400 flex items-center justify-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <FileText className="w-4 h-4 mr-2" />
            PDF ready: {files[0].name}
            {currentNoteId && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">• Saved to database</span>
            )}
          </div>
        )}
      </div>

      {/* Text Input - Always visible */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
          <span>{files.length > 0 ? 'Review & Edit Extracted Text:' : 'Or paste text directly:'}</span>
          {textInput.length > 0 && (
            <span className={`text-xs ${textInput.length > 50000 ? 'text-red-600 dark:text-red-400 font-semibold' : textInput.length > 40000 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {textInput.length.toLocaleString()} / 50,000 characters
            </span>
          )}
        </label>
        <textarea
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value)
            // Clear error if user edits text to be under limit
            if (parseError && e.target.value.length <= 50000) {
              setParseError(null)
            }
            if (e.target.value.trim() && viewStage === 'upload') {
              onFileUploaded()
            }
          }}
          placeholder={
            files.length > 0 
              ? "Review and edit the extracted text..." 
              : "Paste your study text here..."
          }
          className="w-full h-48 p-4 border rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-ring transition-all font-mono text-sm leading-relaxed bg-background text-foreground"
          disabled={isParsing}
        />
      </div>

      {/* Generate Button - Always visible when content exists */}
      <Button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating All Formats...
          </>
        ) : isParsing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Parsing PDF...
          </>
        ) : (
          '✨ Generate All Study Materials'
        )}
      </Button>

      {/* Database status indicator */}
      {currentNoteId && !isParsing && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          ✓ Ready to generate - Note saved to database
        </div>
      )}
    </div>
  )
}