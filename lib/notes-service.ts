import { prisma } from '@/lib/db'

export interface CreateNoteData {
  userId: string
  title?: string
  inputText: string
  inputType: 'text' | 'pdf'
  fileName?: string
  status?: 'pending' | 'generating' | 'completed' | 'failed'
}

export async function createNote(data: CreateNoteData) {
  try {
    const note = await prisma.note.create({
      data: {
        userId: data.userId,
        title: data.title || `Note ${new Date().toLocaleDateString()}`,
        inputText: data.inputText,
        inputType: data.inputType,
        fileName: data.fileName,
        status: data.status || 'pending', 
      }, 
    })
    return note
  } catch (error) {
 
    throw new Error('Could not save note to database')
  }
}

// The rest of the functions stay exactly the same:
export async function getUserNotes(userId: string) {
  try {
    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return notes
  } catch (error) {
  
    throw new Error('Could not fetch notes from database')
  }
}

export async function updateNote(
  id: string, 
  userId: string, 
  data: {
    inputText?: string
    outputType?: string
    outputText?: string
    status?: string
  }
) {
  try {
    const note = await prisma.note.update({
      where: { id, userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
    return note
  } catch (error) {
   
    throw new Error('Could not update note in database')
  }
}

export async function getNoteById(id: string, userId: string) {
  try {
    const note = await prisma.note.findFirst({
      where: { id, userId },
    })
    return note
  } catch (error) {
   
    throw new Error('Could not fetch note from database')
  }
}