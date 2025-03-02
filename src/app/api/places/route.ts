import { NextResponse } from "next/server";

const PLACES_API_BASE_URL = "https://places.googleapis.com/v1"

const placesApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export async function POST(request: Request) {
    const { path, body } = await request.json()
    
    const res = await fetch(`https://places.googleapis.com/v1/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": placesApiKey,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json()

    return NextResponse.json(data)
}