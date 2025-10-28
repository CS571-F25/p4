import { NextResponse } from 'next/server';

// POST: push a new subscriber to the database for a broadcaster
export async function POST(req: Request) {
    return NextResponse.json({ message: 'Not implemented' });
}

// GET: check the twitch subs api endpoint for a broadcaster, and make sure no subs are missing from the list
export async function GET(req: Request) {
    return NextResponse.json({ message: 'Not implemented' });
}

// DELETE: remove a subscriber because their subscription expired
export async function DELETE(req: Request) {
    return NextResponse.json({ message: 'Not implemented' });
}