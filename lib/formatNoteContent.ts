export function formatNoteContent(content: string, type: string): string {
  if (!content) return ''
  
  try {
    // Check if content is JSON
    if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
      const parsed = JSON.parse(content)
      
      switch (type) {
        case 'summary':
          return formatSummary(parsed)
        case 'bullets':
          return formatBullets(parsed)
        case 'flashcards':
          return formatFlashcards(parsed)
        case 'quiz':
          return formatQuiz(parsed)
        default:
          return content
      }
    }
    
    // If not JSON, return as-is (already markdown)
    return content
  } catch (error) {
    // If JSON parsing fails, return original content
    return content
  }
}

function formatSummary(parsed: any): string {
  if (typeof parsed === 'string') return parsed
  
  let markdown = ''
  
  if (parsed.summary) {
    markdown += `${parsed.summary}\n\n`
  }
  
  if (parsed.concepts && Array.isArray(parsed.concepts)) {
    markdown += '### Key Concepts\n\n'
    parsed.concepts.forEach((concept: string) => {
      markdown += `• ${concept}\n`
    })
    markdown += '\n'
  }
  
  if (parsed.keyPoints && Array.isArray(parsed.keyPoints)) {
    markdown += '### Main Points\n\n'
    parsed.keyPoints.forEach((point: string) => {
      markdown += `• ${point}\n`
    })
  }
  
  return markdown || JSON.stringify(parsed, null, 2)
}

function formatBullets(parsed: any): string {
  if (typeof parsed === 'string') return parsed
  
  let markdown = '### Key Points\n\n'
  
  if (parsed.keyPoints && Array.isArray(parsed.keyPoints)) {
    parsed.keyPoints.forEach((point: string) => {
      markdown += `• ${point}\n`
    })
  } else if (parsed.bullets && Array.isArray(parsed.bullets)) {
    parsed.bullets.forEach((bullet: string) => {
      markdown += `• ${bullet}\n`
    })
  } else {
    // Fallback: try to extract any arrays
    Object.entries(parsed).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        markdown += `### ${key}\n\n`
        value.forEach((item: string) => {
          markdown += `• ${item}\n`
        })
        markdown += '\n'
      }
    })
  }
  
  return markdown.trim() || JSON.stringify(parsed, null, 2)
}

function formatFlashcards(parsed: any): string {
  if (typeof parsed === 'string') return parsed
  
  let markdown = '### Flashcards\n\n'
  
  if (parsed.flashcards && Array.isArray(parsed.flashcards)) {
    parsed.flashcards.forEach((card: any, index: number) => {
      markdown += `**Card ${index + 1}**\n`
      markdown += `**Q:** ${card.question || card.front}\n`
      markdown += `**A:** ${card.answer || card.back}\n\n`
    })
  } else {
    return JSON.stringify(parsed, null, 2)
  }
  
  return markdown
}

function formatQuiz(parsed: any): string {
  if (typeof parsed === 'string') return parsed
  
  let markdown = '### Quiz\n\n'
  
  if (parsed.questions && Array.isArray(parsed.questions)) {
    parsed.questions.forEach((question: any, index: number) => {
      markdown += `**${index + 1}. ${question.question}**\n`
      
      if (question.options && Array.isArray(question.options)) {
        question.options.forEach((option: string, optIndex: number) => {
          const letter = String.fromCharCode(65 + optIndex) // A, B, C, D
          markdown += `${letter}. ${option}\n`
        })
      }
      
      markdown += `**Answer:** ${question.answer}\n\n`
    })
  } else {
    return JSON.stringify(parsed, null, 2)
  }
  
  return markdown
}