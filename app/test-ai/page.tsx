// app/test-ai/page.tsx
'use client';
import { useState } from 'react';

export default function TestAIPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const testSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          type: 'summary',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      setOutput(data.result);
    } catch (error) {
      setOutput('Error: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test OpenRouter AI</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to summarize..."
        className="w-full h-32 p-2 border rounded mb-4"
      />
      <button 
        onClick={testSummarize} 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Test Summarize'}
      </button>
      {output && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Result:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}