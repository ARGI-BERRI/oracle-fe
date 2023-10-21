import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!process.env.ORACLE_URL) {
    return NextResponse.json({
      error: "Oracle endpoint is not set",
    });
  }

  const isFunny = request.nextUrl.searchParams.get("funny") === "true";

  const fate = await (await fetch(`${process.env.ORACLE_URL}/?funny=${isFunny}`)).json();
  const json = fetch(process.env.ORACLE_URL || "");

  return NextResponse.json(fate);
}
