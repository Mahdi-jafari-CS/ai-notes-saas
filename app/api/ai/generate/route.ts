import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
  try {

    
    const body = await req.json();
    const { text, type } = body;

  

    if (!text || !type) {
   
      return NextResponse.json(
        { error: 'Missing text or type parameter' },
        { status: 400 }
      );
    }

    // Check character limit (50,000 characters)
    const MAX_CHARACTERS = 50000
    if (text.length > MAX_CHARACTERS) {
     
      return NextResponse.json(
        { error: `Text is too long. Maximum ${MAX_CHARACTERS.toLocaleString()} characters allowed. Your text contains ${text.length.toLocaleString()} characters.` },
        { status: 400 }
      );
    }

   
    let result: string;

    switch (type) {
      case 'summary':
        result = await aiService.generateSummary(text);
        break;
      case 'bullets':
        result = await aiService.generateBulletPoints(text);
        break;
      case 'flashcards':
        result = await aiService.generateFlashcards(text);
        break;
      case 'quiz':
        result = await aiService.generateQuiz(text);
        break;
      default:
        console.error('❌ Invalid type:', type)
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

   

    return NextResponse.json({ result });
  } catch (error) {
    
   
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
