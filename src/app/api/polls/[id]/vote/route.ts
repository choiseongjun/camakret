import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    const body = await request.json();
    const { optionIndex, userId } = body;

    const pollsFilePath = path.join(process.cwd(), '..', 'dataapi', 'data', 'polls.json');

    if (!fs.existsSync(pollsFilePath)) {
      return NextResponse.json(
        { success: false, error: 'Polls file not found' },
        { status: 404 }
      );
    }

    const pollsContent = fs.readFileSync(pollsFilePath, 'utf-8');
    const allPolls = JSON.parse(pollsContent);

    const pollIndex = allPolls.findIndex((p: any) => p.id === pollId);

    if (pollIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Poll not found' },
        { status: 404 }
      );
    }

    const poll = allPolls[pollIndex];

    // 이미 투표했는지 확인
    const hasVoted = poll.options.some((opt: any) =>
      opt.votedBy && opt.votedBy.includes(userId)
    );

    if (hasVoted) {
      // 기존 투표 취소
      poll.options.forEach((opt: any) => {
        if (opt.votedBy && opt.votedBy.includes(userId)) {
          opt.votedBy = opt.votedBy.filter((id: string) => id !== userId);
          opt.votes = Math.max(0, opt.votes - 1);
          poll.totalVotes = Math.max(0, poll.totalVotes - 1);
        }
      });
    }

    // 새 투표 추가
    if (!poll.options[optionIndex].votedBy) {
      poll.options[optionIndex].votedBy = [];
    }
    poll.options[optionIndex].votedBy.push(userId);
    poll.options[optionIndex].votes++;
    poll.totalVotes++;

    allPolls[pollIndex] = poll;

    fs.writeFileSync(pollsFilePath, JSON.stringify(allPolls, null, 2));

    return NextResponse.json({
      success: true,
      data: poll
    });
  } catch (error) {
    console.error('Error voting on poll:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to vote on poll' },
      { status: 500 }
    );
  }
}
