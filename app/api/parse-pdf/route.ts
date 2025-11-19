import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
// @ts-ignore - pdf2json doesn't have types
import PDFParser from 'pdf2json'

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null
  
  try {

    
    const formData = await request.formData()
    const file = formData.get('pdf') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' }, 
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'File must be a PDF' }, 
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'PDF must be smaller than 10MB' }, 
        { status: 400 }
      )
    }


    
    // Write file to temp directory
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    tempFilePath = join(tmpdir(), `pdf-${Date.now()}.pdf`)
    await writeFile(tempFilePath, buffer)
    
    // Parse PDF using pdf2json
    const pdfParser = new PDFParser()
    
    const text = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: any) => {
        reject(new Error(errData.parserError))
      })
      
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        try {
          // Extract text from all pages
          let fullText = ''
          
          if (pdfData.Pages) {
            for (const page of pdfData.Pages) {
              if (page.Texts) {
                for (const textItem of page.Texts) {
                  if (textItem.R) {
                    for (const run of textItem.R) {
                      if (run.T) {
                        try {
                          fullText += decodeURIComponent(run.T) + ' '
                        } catch (e) {
                          // If decoding fails, use the raw text
                          fullText += run.T + ' '
                        }
                      }
                    }
                  }
                }
                fullText += '\n\n'
              }
            }
          }
          
          resolve(fullText)
        } catch (err) {
          reject(err)
        }
      })
      
      pdfParser.loadPDF(tempFilePath!)
    })
    
   

    // Clean up the text
    const cleanedText = text
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/[^\S\n]+/g, ' ')
      .trim()

    if (!cleanedText) {
      return NextResponse.json(
        { error: 'No text could be extracted from PDF' }, 
        { status: 400 }
      )
    }

    // Check character limit (50,000 characters)
    const MAX_CHARACTERS = 50000
    if (cleanedText.length > MAX_CHARACTERS) {
      return NextResponse.json(
        { error: `PDF text is too long. Maximum ${MAX_CHARACTERS.toLocaleString()} characters allowed. This PDF contains ${cleanedText.length.toLocaleString()} characters.` }, 
        { status: 400 }
      )
    }

    return NextResponse.json({
      text: cleanedText,
      success: true
    })

  } catch (error) {

    
    return NextResponse.json(
      { error: 'Failed to parse PDF file: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  } finally {
    // Clean up temp file
    if (tempFilePath) {
      try {
        await unlink(tempFilePath)
      } catch (err) {
       
      }
    }
  }
}