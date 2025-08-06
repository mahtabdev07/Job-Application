import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        postedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.log("Fetch All Jobs Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
