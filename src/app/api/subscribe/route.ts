import { NextResponse } from "next/server";

const PANTRY_URL = "https://getpantry.cloud/apiv1/pantry/09984b41-cb2b-49c3-8b2e-541dd192796e/basket/emails";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // --- 1. Get existing emails ---
    let emails: string[] = [];
    const getResponse = await fetch(PANTRY_URL);

    if (getResponse.status === 400) {
      // Basket doesn't exist yet, which is fine. `emails` will remain empty.
    } else if (getResponse.ok) {
      // If basket exists, parse its contents, expecting { emails: [...] }
      const currentData = await getResponse.json();
      if (currentData && Array.isArray(currentData.emails)) {
        emails = currentData.emails;
      }
    } else {
      // Handle other potential server errors during the GET request.
      const errorData = await getResponse.text();
      return NextResponse.json(
        { error: "Failed to retrieve subscription list.", details: errorData },
        { status: getResponse.status }
      );
    }

    // --- 2. Add new email if it doesn't exist ---
    if (emails.includes(email)) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }
    emails.push(email);

    // --- 3. Save the updated list back to Pantry using POST ---
    // The payload MUST be a JSON object, not a raw array.
    const payload = { emails: emails };

    const postResponse = await fetch(PANTRY_URL, {
      method: "POST", // POST replaces the entire basket content.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Send the wrapped array.
    });

    if (postResponse.ok) {
      return NextResponse.json(
        { message: "Successfully subscribed!" },
        { status: 200 }
      );
    } else {
      const errorData = await postResponse.text();
      // This is the error you were seeing. It should now be resolved.
      return NextResponse.json(
        { error: "Failed to save subscription.", details: errorData },
        { status: postResponse.status }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
