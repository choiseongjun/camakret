import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const suggestionId = params.id;
    const body = await request.json();
    const { userId } = body;

    const suggestionsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'suggestions.json');

    if (!fs.existsSync(suggestionsFilePath)) {
      return NextResponse.json(
        { success: false, error: 'Suggestions file not found' },
        { status: 404 }
      );
    }

    const suggestionsContent = fs.readFileSync(suggestionsFilePath, 'utf-8');
    const allSuggestions = JSON.parse(suggestionsContent);

    const suggestionIndex = allSuggestions.findIndex((s: any) => s.id === suggestionId);

    if (suggestionIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Suggestion not found' },
        { status: 404 }
      );
    }

    const suggestion = allSuggestions[suggestionIndex];

    if (!suggestion.upvotedBy) suggestion.upvotedBy = [];

    // 업보트 토글
    if (suggestion.upvotedBy.includes(userId)) {
      suggestion.upvotedBy = suggestion.upvotedBy.filter((id: string) => id !== userId);
      suggestion.upvotes = Math.max(0, suggestion.upvotes - 1);
    } else {
      suggestion.upvotedBy.push(userId);
      suggestion.upvotes++;
    }

    allSuggestions[suggestionIndex] = suggestion;

    fs.writeFileSync(suggestionsFilePath, JSON.stringify(allSuggestions, null, 2));

    return NextResponse.json({
      success: true,
      data: suggestion
    });
  } catch (error) {
    console.error('Error upvoting suggestion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upvote suggestion' },
      { status: 500 }
    );
  }
}
