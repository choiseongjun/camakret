import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creatorId');
    const category = searchParams.get('category');

    const filePath = path.join(process.cwd(), '../../dataapi/data/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let products = JSON.parse(fileContents);

    // Filter by creatorId if provided
    if (creatorId) {
      products = products.filter((p: any) => p.creatorId === creatorId);
    }

    // Filter by category if provided
    if (category) {
      products = products.filter((p: any) => p.category === category);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
