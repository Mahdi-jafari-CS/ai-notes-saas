export interface ParseResult {
  text: string
  pageCount?: number
  metadata?: any
  success: boolean
}

export interface NoteRecord {
  id: string
  title: string
  inputText: string
  inputType: 'text' | 'pdf'
  fileName?: string
  outputType?: string
  outputText?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: Date
}

// Client-side function that uses the API route
export async function parsePDF(file: File): Promise<ParseResult> {
  try {
    console.log('🚀 Sending PDF to API for parsing...')
    
    const formData = new FormData()
    formData.append('pdf', file)

    const response = await fetch('/api/parse-pdf', {
      method: 'POST',
      body: formData,
    })

    console.log('📨 API response status:', response.status)
    
    // Clone the response so we can read it multiple times if needed
    const responseClone = response.clone()

    if (!response.ok) {
      let errorMessage = 'Failed to parse PDF'
      try {
        const errorData = await response.json()
        console.error('❌ API error:', errorData)
        errorMessage = errorData.error || errorMessage
      } catch (e) {
        // If response is not JSON (HTML error page), use the cloned response
        try {
          const errorText = await responseClone.text()
          console.error('❌ Non-JSON error response:', errorText.substring(0, 200))
        } catch {
          console.error('❌ Could not read error response')
        }
        errorMessage = `Server error (${response.status})`
      }
      throw new Error(errorMessage)
    }

    const result = await response.json()
    console.log('✅ PDF parsed via API successfully')
    return result

  } catch (error) {
    console.error('❌ PDF parsing failed:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to parse PDF file')
  }
}

// Helper function to save parsed PDF to database
export async function saveParsedPDFToDatabase(
  fileName: string,
  parsedText: string
): Promise<NoteRecord> {
  try {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fileName.replace('.pdf', ''),
        inputText: parsedText,
        inputType: 'pdf',
        fileName: fileName,
        status: 'pending',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to save note')
    }

    const { note } = await response.json()
    console.log('✅ Note saved to database:', note.id)
    return note
  } catch (error) {
    console.error('❌ Failed to save note:', error)
    throw error
  }
}

// Combined function: parse PDF and save to database
export async function parsePDFAndSave(file: File): Promise<{ 
  parsedText: string
  note: NoteRecord 
}> {
  // Step 1: Parse PDF
  const parseResult = await parsePDF(file)
  
  // Step 2: Save to database
  const note = await saveParsedPDFToDatabase(file.name, parseResult.text)
  
  return {
    parsedText: parseResult.text,
    note
  }
}

// Helper function to validate PDF file
export function validatePDFFile(file: File): string | null {
  if (file.type !== 'application/pdf') {
    return 'File must be a PDF'
  }
  
  if (file.size > 10 * 1024 * 1024) {
    return 'PDF must be smaller than 10MB'
  }
  
  return null
}