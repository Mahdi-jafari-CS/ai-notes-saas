// lib/openrouter.ts

// List of verified free models to try (in order of preference)
// These are confirmed working models on OpenRouter
const FREE_MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'microsoft/phi-3-mini-128k-instruct:free',
  'qwen/qwen-2-7b-instruct:free'
];

// Helper function for retry with exponential backoff and model fallback
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 5, modelIndex = 0): Promise<Response> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);
    
    // If successful, return immediately
    if (response.ok) {
      return response;
    }
    
    // If rate limited or model not available
    if (response.status === 429 || response.status === 404) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || 'Unknown error';
      
   
      if (modelIndex < FREE_MODELS.length - 1) {
     
        const newOptions = { ...options };
        const body = JSON.parse(options.body as string);
        body.model = FREE_MODELS[modelIndex + 1];
        newOptions.body = JSON.stringify(body);
      
        return fetchWithRetry(url, newOptions, maxRetries, modelIndex + 1);
      }
      
      // If no more models to try, wait with exponential backoff
      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 5000; // 10s, 20s, 40s, 80s
       
        await new Promise(resolve => setTimeout(resolve, waitTime));
        // Reset to first model for next attempt
        const resetOptions = { ...options };
        const body = JSON.parse(options.body as string);
        body.model = FREE_MODELS[0];
        resetOptions.body = JSON.stringify(body);
        return fetchWithRetry(url, resetOptions, maxRetries - attempt, 0);
      }
    }
    
    // For other errors or last attempt, return the response
    if (!response.ok && attempt === maxRetries) {
      return response;
    }
  }
  
  throw new Error('Max retries exceeded');
}

export const aiService = {
  async generate(prompt: string, type: 'summary' | 'bullets' | 'flashcards' | 'quiz'): Promise<string> {
  
    
    // Use paid model if specified in environment, otherwise use free models
    const preferredModel = process.env.OPENROUTER_PREFERRED_MODEL || FREE_MODELS[0];
    const usePaidModel = !!process.env.OPENROUTER_PREFERRED_MODEL;
    
    
    
    const response = await fetchWithRetry('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourapp.com',
        'X-Title': 'AI Notes Generator',
      },
      body: JSON.stringify({
        model: preferredModel,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant that creates clear, well-formatted study materials for students. Always provide complete, coherent responses in proper Markdown format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        top_p: 1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || response.statusText;
     
      
      // Check if it's a rate limit error
      if (response.status === 429) {
        throw new Error('All AI models are temporarily rate-limited. Please wait a few minutes and try again.');
      }
      
      throw new Error(`AI generation failed: ${errorMessage}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || 'No response generated';
  
    return result;
  },

  async generateSummary(text: string): Promise<string> {
    const prompt = `Create a clear, comprehensive summary of the following study material. 

Structure your summary with:
- Main concepts and key ideas
- Important definitions or terminology
- Critical points students should remember

Use proper Markdown formatting with headings (###) and bullet points.

Study Material:
${text}`;
    return this.generate(prompt, 'summary');
  },

  async generateBulletPoints(text: string): Promise<string> {
    const prompt = `Convert the following study material into well-organized bullet points.

Requirements:
- Use proper Markdown formatting
- Group related concepts together with headings (###)
- Use nested bullets for sub-points
- Make each point clear and concise
- Focus on key information students need to know

Study Material:
${text}`;
    return this.generate(prompt, 'bullets');
  },

  async generateFlashcards(text: string): Promise<string> {
    const prompt = `Create 8-10 study flashcards from the following text. Each flashcard should test understanding of key concepts.

Format each flashcard as:
### Flashcard [Number]
**Q:** [Clear, specific question]  
**A:** [Concise, accurate answer]

---

Study Material:
${text}`;
    return this.generate(prompt, 'flashcards');
  },

  async generateQuiz(text: string): Promise<string> {
    const prompt = `Create a 5-question multiple choice quiz from the following study material.

Format each question as:
### Question [Number]
[Question text]

A) [Option A]  
B) [Option B]  
C) [Option C]  
D) [Option D]

**Correct Answer:** [Letter]  
**Explanation:** [Brief explanation]

---

Study Material:
${text}`;
    return this.generate(prompt, 'quiz');
  }
};