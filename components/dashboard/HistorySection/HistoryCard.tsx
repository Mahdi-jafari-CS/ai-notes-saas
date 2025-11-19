"use client";

import { Note } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileText, Download, Copy, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ViewNoteModal } from "./ViewNoteModal";
import Link from "next/link";

interface HistoryCardProps {
  note: Note;
}

export function HistoryCard({ note }: HistoryCardProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = async () => {
    if (note.outputText) {
      await navigator.clipboard.writeText(note.outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      summary: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      bullets: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      flashcards: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      quiz: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const previewText =
    note.inputText.length > 150
      ? note.inputText.substring(0, 150) + "..."
      : note.inputText;

  return (
    <>
      <div className="bg-card rounded-lg border p-6 hover:border-muted transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-foreground text-lg">
                {note.title || "Untitled Document"}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                  note.outputType || "summary"
                )}`}
              >
                {note.outputType || "note"}
              </span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {previewText}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Completed
              </span>
              <span>•</span>
              <span>{format(new Date(note.createdAt), "MMM d, yyyy")}</span>
              <span>•</span>
              <span>{note.inputType}</span>
              {note.fileName && (
                <>
                  <span>•</span>
                  <span
                    className="truncate max-w-[120px]"
                    title={note.fileName}
                  >
                    {note.fileName}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Link href={`/dashboard/history/${note.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!note.outputText}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              /* Implement download */
            }}
            disabled={!note.outputText}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <ViewNoteModal
        note={note}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
