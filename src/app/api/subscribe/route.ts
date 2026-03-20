import { NextResponse } from "next/server";

const HEHO_API_KEY = 'heho_42cdf0fd9abd1ae818f6768d';
const HEHO_API_URL = 'https://heho.vercel.app/api/v1/database/manage';

export async function POST(request: Request) {
  const { email, name, message } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Prepare the contact submission data for HeHo
    const contactData = {
      name: name || 'Newsletter Subscriber',
      email,
      message: message || 'Subscribed to newsletter',
    };

    // Save contact submission to HeHo
    const response = await fetch(HEHO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HEHO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'add',
        tableName: 'contact_submissions',
        data: contactData,
      }),
    });

    if (!response.ok) {
      throw new Error(`HeHo API error: ${response.statusText}`);
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving contact submission to HeHo:', error);
    return NextResponse.json(
      { error: "Failed to save subscription.", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
