import { NextResponse } from 'next/server';

const HEHO_API_KEY = process.env.HEHO_API_KEY || 'heho_42cdf0fd9abd1ae818f6768d';
const HEHO_API_URL = 'https://heho.vercel.app/api/v1/database/manage';

export async function GET() {
  try {
    const response = await fetch(HEHO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HEHO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'read',
        tableName: 'products',
      }),
    });

    if (!response.ok) {
      throw new Error(`HeHo API error: ${response.statusText}`);
    }

    const data = await response.json();
    const products = data.data || [];

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products from HeHo:', error);
    return NextResponse.json(
      { message: "Failed to fetch products", error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
