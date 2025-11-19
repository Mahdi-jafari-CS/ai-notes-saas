"use client";

import { useState, useEffect } from "react";
import { Note } from "@prisma/client";
import { HistoryCard } from "./HistoryCard";
import { EmptyHistory } from "./EmptyHistory";
import { Button } from "@/components/ui/button";
import { RefreshCw, History as HistoryIcon, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

import { ShimmerSkeleton } from "./loading/ShimmerSkeleton";

export function HistoryPanel() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/history");
      if (response.ok) {
        const data = await response.json();
        // Filter only completed notes
        const completedNotes =
          data.notes?.filter((note: Note) => note.status === "completed") || [];
        setNotes(completedNotes);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();

    // Search in title (case insensitive)
    const titleMatch = note.title?.toLowerCase().includes(query);

    // Search in input text (first 200 chars for performance)
    const inputMatch = note.inputText.toLowerCase().includes(query);

    // Search in output text (if available)
    const outputMatch = note.outputText?.toLowerCase().includes(query);

    // Search in file name
    const fileMatch = note.fileName?.toLowerCase().includes(query);

    // Search in output type
    const typeMatch = note.outputType?.toLowerCase().includes(query);

    return titleMatch || inputMatch || outputMatch || fileMatch || typeMatch;
  });

  if (loading) {
    return <ShimmerSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <HistoryIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">History</h1>
            <p className="text-muted-foreground">Your previously generated notes</p>
          </div>
        </div>
        <Button
          onClick={fetchHistory}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Search with results count */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by title, content, file name, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search results info */}
        {searchQuery && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Found {filteredNotes.length} of {notes.length} notes
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <EmptyHistory hasNotes={notes.length > 0} searchQuery={searchQuery} />
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note, index) => (
            <div key={note.id}>
              <HistoryCard note={note} />
              {index < filteredNotes.length - 1 && (
                <div className="border-t border-gray-200 my-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
