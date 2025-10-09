import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'products.json');
    const fileContents = await fs.readFile(jsonDirectory, 'utf8');
    const products = JSON.parse(fileContents);
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error reading products.json:', error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
