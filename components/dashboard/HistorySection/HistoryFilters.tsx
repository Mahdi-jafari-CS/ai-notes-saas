'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

interface HistoryFiltersProps {
  filter: string
  onFilterChange: (filter: 'all' | 'summary' | 'bullets' | 'flashcards' | 'quiz') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  totalCount: number
  filteredCount: number
}

const filterOptions = [
  { value: 'all', label: 'All Types', count: 0 },
  { value: 'summary', label: 'Summaries', count: 0 },
  { value: 'bullets', label: 'Bullet Points', count: 0 },
  { value: 'flashcards', label: 'Flashcards', count: 0 },
  { value: 'quiz', label: 'Quizzes', count: 0 },
] as const

export function HistoryFilters({ 
  filter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  totalCount,
  filteredCount 
}: HistoryFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search in titles and content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-white border-gray-200 focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          className="sm:hidden flex items-center gap-2"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Filter Chips */}
      <div className={`flex flex-wrap gap-2 ${showMobileFilters ? 'block' : 'hidden sm:flex'}`}>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === option.value
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredCount} of {totalCount} items
        </span>
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear search
          </button>
        )}
      </div>
    </div>
  )
}