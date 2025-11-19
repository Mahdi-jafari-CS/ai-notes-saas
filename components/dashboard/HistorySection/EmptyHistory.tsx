import { Button } from '@/components/ui/button'
import { FileText, ArrowRight, Search } from 'lucide-react'

interface EmptyHistoryProps {
  hasNotes: boolean
  searchQuery?: string
}

export function EmptyHistory({ hasNotes, searchQuery }: EmptyHistoryProps) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {hasNotes ? (
          // No search results
          <>
            <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No notes found
            </h3>
            <p className="text-muted-foreground mb-6">
              No notes match "{searchQuery}". Try different keywords or clear your search.
            </p>
          </>
        ) : (
          // No notes at all
          <>
            <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No history yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Generate your first set of study notes to see them here!
            </p>
          </>
        )}

        <Button 
          onClick={() => window.location.href = '/dashboard'}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {hasNotes ? 'Clear Search' : 'Create Notes'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}