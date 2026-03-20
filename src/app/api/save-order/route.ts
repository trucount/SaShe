import { NextRequest, NextResponse } from 'next/server';

const HEHO_API_KEY = 'heho_42cdf0fd9abd1ae818f6768d';
const HEHO_API_URL = 'https://heho.vercel.app/api/v1/database/manage';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Prepare the order data for HeHo
    const hehoOrderData = {
      order_id: orderData.orderId,
      full_name: orderData.fullName,
      email: orderData.email || '',
      phone_number: orderData.phoneNumber,
      address: orderData.address,
      whatsapp_number: orderData.whatsappNumber,
      total_price: orderData.totalPrice,
      adjusted_total_price: orderData.adjustedTotalPrice,
      products_ordered: JSON.stringify(orderData.products),
    };

    // Save order to HeHo
    const response = await fetch(HEHO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HEHO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'add',
        tableName: 'orders',
        data: hehoOrderData,
      }),
    });

    if (!response.ok) {
      throw new Error(`HeHo API error: ${response.statusText}`);
    }

    const result = await response.json();

    return NextResponse.json(
      { message: 'Order saved successfully', orderId: orderData.orderId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving order to HeHo:', error);
    return NextResponse.json(
      { message: 'Failed to save order', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
