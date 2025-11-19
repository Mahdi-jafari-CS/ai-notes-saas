'use client'
import { Button } from "@/components/ui/button"
import { Copy, Download, Check, BookOpen, List, CreditCard, HelpCircle, FileText } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'
import { FlashcardsDisplay } from './FlashcardsDisplay'
import { QuizDisplay } from './QuizDisplay'
import { generatePDF } from '@/lib/pdf-generator'

interface OutputDisplayProps {
  content: string
  type: string
}

export function OutputDisplay({ content, type }: OutputDisplayProps) {
  const [copied, setCopied] = useState(false)

  if (!content) {
    return (
      <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground bg-linear-to-br from-background/50 to-background min-h-[400px] flex flex-col items-center justify-center">
        {getEmptyStateIcon(type)}
        <p className="mt-4 text-lg font-medium text-muted-foreground">No {type} generated yet</p>
        <p className="mt-1 text-sm text-muted-foreground/80">Switch to this tab and click Generate Notes to create {type}</p>
      </div>
    )
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadPDF = () => {
    generatePDF({
      content,
      type,
      title: `${capitalizeFirstLetter(type)} Notes`
    })
  }

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="border rounded-xl bg-card shadow-lg overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {getTypeIcon(type)}
          <h3 className="font-bold text-white text-lg capitalize">{type}</h3>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleCopy}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleDownloadPDF}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleDownload}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Download className="w-4 h-4 mr-2" />
            Markdown
          </Button>
        </div>
      </div>

      {/* Content area with better styling */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {/* Show specialized component for flashcards and quiz */}
        {type === 'flashcards' ? (
          <FlashcardsDisplay content={content} />
        ) : type === 'quiz' ? (
          <QuizDisplay content={content} />
        ) : (
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-gray-100 border-b-2 border-blue-200 dark:border-blue-800 pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3 text-gray-900 dark:text-gray-100" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2 text-blue-900 dark:text-blue-300" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-800 dark:text-gray-200" {...props} />,
                p: ({node, ...props}) => <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed text-base" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300" {...props} />,
                li: ({node, ...props}) => <li className="mb-1 text-gray-700 dark:text-gray-300" {...props} />,
                code: ({node, inline, ...props}: any) => 
                  inline 
                    ? <code className="bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded text-sm font-mono text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700" {...props} />
                    : <code className="block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto my-3" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />,
                em: ({node, ...props}) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300" {...props} />
                ),
                hr: ({node, ...props}) => <hr className="my-6 border-t-2 border-gray-200 dark:border-gray-700" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} />
                  </div>
                ),
                th: ({node, ...props}) => <th className="bg-blue-100 dark:bg-blue-900/30 border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold text-left dark:text-gray-200" {...props} />,
                td: ({node, ...props}) => <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 dark:text-gray-300" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

function getTypeIcon(type: string) {
  switch(type) {
    case 'summary':
      return <BookOpen className="w-5 h-5 text-white" />
    case 'bullet points':
    case 'bullets':
      return <List className="w-5 h-5 text-white" />
    case 'flashcards':
      return <CreditCard className="w-5 h-5 text-white" />
    case 'quiz':
      return <HelpCircle className="w-5 h-5 text-white" />
    default:
      return <BookOpen className="w-5 h-5 text-white" />
  }
}

function getEmptyStateIcon(type: string) {
  const Icon = type === 'summary' ? BookOpen : 
               type === 'bullets' || type === 'bullet points' ? List :
               type === 'flashcards' ? CreditCard :
               HelpCircle
  return <Icon className="w-16 h-16 text-gray-300" />
}