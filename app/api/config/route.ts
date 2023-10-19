import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";

/**
 * `GET /api/config` gets a configuration according to the session's user
 */
export async function GET(request: Request, { params }: any) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      authorized: false,
      config: {},
    });
  }

  const config = await prisma.config.findFirst({
    where: {
      email: session.user.email ?? "",
    },
  });

  return NextResponse.json({ config });
}

/**
 * `POST /api/config` updates a configuration according to the session's user.
 */
export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({
      authorized: false,
      success: false,
    });
  }

  if (!session.user.email) {
    // NOTE: This should not be reached
    return;
  }

  const body = (await request.json()) as ConfigBody;

  await prisma.config.update({
    data: {
      ...body,
    },
    where: {
      email: session.user.email,
    },
  });

  return NextResponse.json({
    authorized: true,
    success: true,
  });
}
