import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creatorId');

    const suggestionsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'suggestions.json');

    let allSuggestions = [];

    if (fs.existsSync(suggestionsFilePath)) {
      const suggestionsContent = fs.readFileSync(suggestionsFilePath, 'utf-8');
      allSuggestions = JSON.parse(suggestionsContent);
    }

    // 크리에이터별 필터링
    let suggestions = allSuggestions;
    if (creatorId) {
      suggestions = allSuggestions.filter((s: any) => s.creatorId === creatorId);
    }

    // 최신순 정렬
    suggestions.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, creatorId, authorId, authorName } = body;

    if (!title || !description || !creatorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const suggestionsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'suggestions.json');

    let allSuggestions = [];

    if (fs.existsSync(suggestionsFilePath)) {
      const suggestionsContent = fs.readFileSync(suggestionsFilePath, 'utf-8');
      allSuggestions = JSON.parse(suggestionsContent);
    }

    // 새 제안 생성
    const newSuggestion = {
      id: `suggestion-${Date.now()}`,
      title,
      description,
      creatorId,
      authorId,
      authorName: authorName || '익명',
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedBy: [],
      status: 'pending', // pending, considering, accepted, declined
      creatorResponse: null
    };

    allSuggestions.push(newSuggestion);

    fs.writeFileSync(suggestionsFilePath, JSON.stringify(allSuggestions, null, 2));

    return NextResponse.json({
      success: true,
      data: newSuggestion
    });
  } catch (error) {
    console.error('Error creating suggestion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create suggestion' },
      { status: 500 }
    );
  }
}
