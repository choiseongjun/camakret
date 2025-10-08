import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creatorId');

    const pollsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'polls.json');

    let allPolls = [];

    if (fs.existsSync(pollsFilePath)) {
      const pollsContent = fs.readFileSync(pollsFilePath, 'utf-8');
      allPolls = JSON.parse(pollsContent);
    }

    // 크리에이터별 필터링
    let polls = allPolls;
    if (creatorId) {
      polls = allPolls.filter((p: any) => p.creatorId === creatorId);
    }

    // 최신순 정렬
    polls.sort((a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: polls
    });
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch polls' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, options, creatorId, authorId, endsAt } = body;

    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pollsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'polls.json');

    let allPolls = [];

    if (fs.existsSync(pollsFilePath)) {
      const pollsContent = fs.readFileSync(pollsFilePath, 'utf-8');
      allPolls = JSON.parse(pollsContent);
    }

    // 새 투표 생성
    const newPoll = {
      id: `poll-${Date.now()}`,
      title,
      options: options.map((opt: string) => ({
        text: opt,
        votes: 0,
        votedBy: []
      })),
      creatorId: creatorId || null,
      authorId,
      createdAt: new Date().toISOString(),
      endsAt: endsAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      totalVotes: 0,
      isActive: true
    };

    allPolls.push(newPoll);

    fs.writeFileSync(pollsFilePath, JSON.stringify(allPolls, null, 2));

    return NextResponse.json({
      success: true,
      data: newPoll
    });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}
