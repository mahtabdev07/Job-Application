import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user info (from token)
    const decoded = await getAuth(); // Assume it returns { id: string }

    if (!decoded || !decoded.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find user in DB
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in /api/user/profile:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
