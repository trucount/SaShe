import { NextRequest, NextResponse } from 'next/server';

const PANTRY_API_KEY = '09984b41-cb2b-49c3-8b2e-541dd192796e';
const PANTRY_BASKET_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_API_KEY}/basket/products`;

export async function GET() {
    try {
        const getResponse = await fetch(PANTRY_BASKET_URL);

        if (getResponse.status === 400) {
            return NextResponse.json({ products: [] }, { status: 200 });
        } else if (getResponse.ok) {
            const products = await getResponse.json();
            return NextResponse.json(products, { status: 200 });
        } else {
            console.error('Pantry GET Error:', await getResponse.text());
            return NextResponse.json(
                { message: "Failed to retrieve products." },
                { status: getResponse.status }
            );
        }
    } catch (error) {
        console.error('Error fetching products from Pantry:', error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    try {
        const newProducts = await req.json();

        const postResponse = await fetch(PANTRY_BASKET_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProducts),
        });

        if (postResponse.ok) {
            const data = await postResponse.json();
            return NextResponse.json(data, { status: 200 });
        } else {
            console.error('Pantry POST Error:', await postResponse.text());
            return NextResponse.json(
                { message: "Failed to save products." },
                { status: postResponse.status }
            );
        }
    } catch (error) {
        console.error('Error saving products to Pantry:', error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}