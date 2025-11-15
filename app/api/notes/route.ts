import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { createNote, getUserNotes, updateNote } from '@/lib/notes-service'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(request)
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkUserId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkUserId,
          email: `user-${clerkUserId}@temp.com`,
          name: 'User'
        }
      })
    }

    const body = await request.json()
    const { title, inputText, inputType, fileName, status } = body

    if (!inputText || !inputType) {
      return NextResponse.json(
        { error: 'Missing required fields: inputText and inputType are required' },
        { status: 400 }
      )
    }

    const note = await createNote({
      userId: user.id, // Use the database user ID
      title,
      inputText,
      inputType,
      fileName,
      status: status || 'pending',
    })

    return NextResponse.json({ note, success: true })
  } catch (error) {
    console.error('Notes API POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(request)
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user by Clerk ID to get database user ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const notes = await getUserNotes(user.id)
    return NextResponse.json({ notes, success: true })
  } catch (error) {
    console.error('Notes API GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId: clerkUserId } = getAuth(request)
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user by Clerk ID to get database user ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const noteId = searchParams.get('id')

    if (!noteId) {
      return NextResponse.json({ error: 'Note ID required' }, { status: 400 })
    }

    const body = await request.json()
    const { inputText, outputType, outputText, status } = body

    console.log('📝 PATCH request data:', {
      noteId,
      userId: user.id,
      inputTextLength: inputText?.length,
      outputType,
      outputTextLength: outputText?.length,
      status
    })

    const note = await updateNote(noteId, user.id, {
      inputText,
      outputType,
      outputText,
      status,
    })

    console.log('✅ Note updated successfully:', {
      noteId: note.id,
      outputType: note.outputType,
      outputTextLength: note.outputText?.length,
      status: note.status
    })

    return NextResponse.json({ note, success: true })
  } catch (error) {
    console.error('Notes API PATCH error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}