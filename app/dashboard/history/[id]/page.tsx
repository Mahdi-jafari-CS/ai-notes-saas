import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { OutputDisplay } from '@/components/dashboard/OutputDisplay'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NoteDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params
  const { id } = await params

  if (!id) {
    notFound()
  }

  const note = await prisma.note.findUnique({
    where: { id }
  })

  if (!note) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Link href="/history">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Button>
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {note.title || 'Untitled Document'}
        </h1>
        <p className="text-gray-600 mb-6">
          Created {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <OutputDisplay 
          content={note.outputText || ''} 
          type={note.outputType || 'summary'} 
        />
      </div>
    </div>
  )
}