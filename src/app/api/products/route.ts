import { NextResponse } from 'next/server';
import { Product } from '@/types/product.types';

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

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : [];
    } catch {
      return value ? [value] : [];
    }
  }

  return [];
};

const parseSpecifications = (value: unknown): Product['specifications'] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const label = parseString((item as { label?: unknown }).label);
        const specValue = parseString((item as { value?: unknown }).value);
        return label || specValue ? { label, value: specValue } : null;
      })
      .filter((item): item is Product['specifications'][number] => item !== null);
  }

  if (typeof value === 'string') {
    try {
      return parseSpecifications(JSON.parse(value));
    } catch {
      return [];
    }
  }

  return [];
};


const parseDiscountValue = (
  product: Record<string, unknown>,
  key: 'amount' | 'percentage'
): number => {
  const discount = product.discount;
  const nestedDiscountValue =
    discount && typeof discount === 'object'
      ? (discount as Record<string, unknown>)[key]
      : undefined;

  return parseNumber(
    product[`discount_${key}`] ?? nestedDiscountValue
  );
};

const normalizeProduct = (product: Record<string, unknown>, index: number): Product => {
  const discountAmount = parseDiscountValue(product, 'amount');
  const discountPercentage = parseDiscountValue(product, 'percentage');

  return {
    id: parseNumber(product.id) || index + 1,
    title: parseString(product.title),
    srcUrl: parseString(product.srcUrl ?? product.src_url),
    description: parseString(product.description),
    gallery: parseStringArray(product.gallery),
    price: parseNumber(product.price),
    discount: {
      amount: discountAmount,
      percentage: discountPercentage,
    },
    rating: parseNumber(product.rating),
    specifications: parseSpecifications(product.specifications),
  };
};

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
        tableName: 'products',
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HeHo API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawProducts = Array.isArray(data.data) ? data.data : [];
    const products = rawProducts.map((product: Record<string, unknown>, index: number) =>
      normalizeProduct(product, index)
    );

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products from HeHo:', error);
    return NextResponse.json(
      {
        products: [],
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
