# Rate Limit Solutions Guide

## Current Issue
Free AI models have rate limits that can cause generation failures.

## Solutions Implemented

### 1. **Free Model Fallback System** (Current Setup)
The app now rotates through 4 verified free models:
- `google/gemini-2.0-flash-exp:free` (Primary)
- `meta-llama/llama-3.2-3b-instruct:free` 
- `microsoft/phi-3-mini-128k-instruct:free`
- `qwen/qwen-2-7b-instruct:free`

**Pros:** No cost, automatic fallback
**Cons:** May still hit rate limits during heavy use

### 2. **Paid Model Option** (Recommended for Production)
To use a paid model for guaranteed responses:

1. Open your `.env` file
2. Add this line:
   ```
   OPENROUTER_PREFERRED_MODEL=google/gemini-pro
   ```
3. Restart your dev server

#### Recommended Paid Models:
- **google/gemini-pro** - $0.0001/1k tokens (very affordable, fast)
- **anthropic/claude-3-5-sonnet** - $0.003/1k tokens (best quality)
- **openai/gpt-4o** - $0.0025/1k tokens (excellent quality)

#### Cost Example:
For a typical study note (1000 words):
- Summary: ~2k tokens = $0.0002
- Bullets: ~2k tokens = $0.0002  
- Flashcards: ~2k tokens = $0.0002
- Quiz: ~2k tokens = $0.0002
**Total per document: ~$0.0008 (less than 1 cent!)**

## Current Reliability Features:
- ✅ 6-second delays between generations
- ✅ Automatic model switching on errors
- ✅ 5 retry attempts with exponential backoff (10s, 20s, 40s, 80s)
- ✅ Better error handling and logging

## Recommendation:
For development/testing: Use free models (current setup)
For production/heavy use: Add `OPENROUTER_PREFERRED_MODEL=google/gemini-pro` to .env

The paid option costs less than 1 cent per document and eliminates rate limit issues completely! 🎉
