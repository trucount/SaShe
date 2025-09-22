import { NextRequest, NextResponse } from 'next/server';

const PANTRY_API_KEY = '09984b41-cb2b-49c3-8b2e-541dd192796e';
const PANTRY_BASKET_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_API_KEY}/basket/orders`;

export async function POST(req: NextRequest) {
  try {
    const newOrder = await req.json();

    // 1. Get existing orders
    let orders = [];
    const getResponse = await fetch(PANTRY_BASKET_URL);

    if (getResponse.status === 400) {
      // Basket doesn't exist, which is fine.
    } else if (getResponse.ok) {
      const currentData = await getResponse.json();
      if (currentData && Array.isArray(currentData.orders)) {
        orders = currentData.orders;
      }
    } else {
      // Handle other errors during GET
      console.error('Pantry GET Error:', await getResponse.text());
      return NextResponse.json(
        { message: "Failed to retrieve existing orders." },
        { status: getResponse.status }
      );
    }

    // 2. Add new order
    orders.push(newOrder);

    // 3. Save updated orders
    const postResponse = await fetch(PANTRY_BASKET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orders }), // Save in the {orders: [...]} structure
    });

    if (postResponse.ok) {
      return NextResponse.json({ message: 'Order saved successfully' });
    } else {
      console.error('Pantry POST Error:', await postResponse.text());
      return NextResponse.json(
        { message: 'Error saving order to Pantry' },
        { status: postResponse.status }
      );
    }
  } catch (error) {
    console.error('Unhandled Error:', error);
    return NextResponse.json({ message: 'Error saving order' }, { status: 500 });
  }
}
