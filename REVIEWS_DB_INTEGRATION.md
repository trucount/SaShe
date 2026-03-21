# SaShe Reviews Database Integration Guide

## Overview

This guide explains how to connect the SaShe reviews system to a database table, similar to how products are managed. The reviews are currently stored in a static TypeScript file (`src/lib/reviews.ts`) but can be easily migrated to a database.

## Database Schema

### Reviews Table

```sql
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data from reviews.ts
INSERT INTO reviews (user_name, content, rating, date) VALUES
('Alex K.', '"Finding clothes that align with my personal style used to be a challenge until I discovered SaShé. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."', 5, 'August 14, 2023'),
('Sarah M.', '"I''m blown away by the quality and style of the clothes I received from SaShé. From casual wear to elegant dresses, every piece I''ve bought has exceeded my expectations."', 5, 'August 15, 2023'),
('Ethan R.', '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer''s touch in every aspect of this shirt."', 5, 'August 16, 2023'),
('Olivia P.', '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It''s evident that the designer poured their creativity into making this t-shirt stand out."', 5, 'August 17, 2023'),
('Liam K.', '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer''s skill. It''s like wearing a piece of art that reflects my passion for both design and fashion."', 5, 'August 18, 2023'),
('Samantha D.', '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It''s become my favorite go-to shirt."', 5, 'August 19, 2023');
```

## Current Implementation

Currently, reviews are loaded from `src/lib/reviews.ts`:

```typescript
import { Review } from "@/types/review.types";

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content: "...",
    rating: 5,
    date: "August 14, 2023",
  },
  // ... more reviews
];
```

## Migration Steps

### Step 1: Create the Database Table

Execute the SQL schema provided in `reviews_table.sql` in your database (Supabase, PostgreSQL, etc.).

### Step 2: Create a Database Service

Create a new file `src/lib/services/reviewsService.ts`:

```typescript
import { Review } from "@/types/review.types";

export async function getReviews(): Promise<Review[]> {
  try {
    const response = await fetch('/api/reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Fallback to static data if database fails
    const { reviewsData } = await import('@/lib/reviews');
    return reviewsData;
  }
}

export async function addReview(review: Omit<Review, 'id'>): Promise<Review> {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error('Failed to add review');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}
```

### Step 3: Create API Routes

Create `src/app/api/reviews/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data, error } = await supabase
      .from('reviews')
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 4: Update the Reviews Component

Update `src/components/homepage/Reviews/index.tsx` to use the database service:

```typescript
"use client";

import React, { useEffect, useState } from "react";
import { Review } from "@/types/review.types";
import { getReviews } from "@/lib/services/reviewsService";
// ... other imports

type ReviewsProps = { data?: Review[] };

const Reviews = ({ data: initialData }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      getReviews()
        .then(setReviews)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [initialData]);

  if (loading) return <div>Loading reviews...</div>;

  // ... rest of component using `reviews` instead of `data`
};
```

## Benefits

- **Dynamic Content**: Update reviews without redeploying the application
- **Scalability**: Handle unlimited reviews as your business grows
- **Admin Panel**: Easily manage reviews through a database UI
- **Analytics**: Query and analyze customer feedback
- **Consistency**: Same database structure as products table

## Database Structure Comparison

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Unique identifier |
| user_name | VARCHAR(255) | Customer name |
| content | TEXT | Review text |
| rating | INTEGER | Rating 1-5 |
| date | VARCHAR(100) | Review date |
| created_at | TIMESTAMP | Database timestamp |

This mirrors the products table structure for consistency across your application.
