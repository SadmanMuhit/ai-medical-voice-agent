import { NextRequest, NextResponse } from "next/server";

// simple in-memory store (dev only)
let sessions: any[] = [];

export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();

  const sessionId = Math.random().toString(36).substring(7);

  const newSession = {
    id: Date.now(),
    notes,
    sessionId,
    selectedDoctor, // ✅ full doctor object
    createdOn: new Date().toISOString(),
  };

  sessions.push(newSession);

  return NextResponse.json({ sessionId });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  const session = sessions.find((s) => s.sessionId === sessionId);

  return NextResponse.json(session || {});
}