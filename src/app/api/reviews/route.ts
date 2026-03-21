import { NextResponse } from 'next/server';
import { Review } from '@/types/review.types';

const HEHO_API_KEY = 'heho_42cdf0fd9abd1ae818f6768d';
const HEHO_API_URL = 'https://heho.vercel.app/api/v1/database/manage';

const parseNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const parseString = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const normalizeReview = (review: Record<string, unknown>, index: number): Review => ({
  id: parseNumber(review.id) || index + 1,
  user: parseString(review.user ?? review.user_name ?? review.name ?? review.customer_name) || 'Anonymous',
  content: parseString(review.content ?? review.review ?? review.message),
  rating: parseNumber(review.rating),
  date: parseString(review.date ?? review.created_at ?? review.createdAt),
});

export async function GET() {
  try {
    const response = await fetch(HEHO_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HEHO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'read',
        tableName: 'reviews',
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HeHo API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawReviews = Array.isArray(data.data) ? data.data : [];
    const reviews = rawReviews
      .map((review: Record<string, unknown>, index: number) => normalizeReview(review, index))
      .filter((review: Review) => Boolean(review.content));

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews from HeHo:', error);
    return NextResponse.json(
      {
        reviews: [],
        message: 'Failed to fetch reviews',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
