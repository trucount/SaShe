import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    const filePath = path.join(process.cwd(), 'src', 'orders.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const orders = JSON.parse(fileData);

    orders.push(order);

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving order' }, { status: 500 });
  }
}
