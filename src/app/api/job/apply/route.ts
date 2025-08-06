import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth"; // ✅ use the shared auth helper

export const POST = async (req: NextRequest) => {
  try {
    const user = await getAuth();

    const { jobId, coverLetter } = await req.json();
    if (!jobId) {
      return new NextResponse("Job ID is required", { status: 400 });
    }
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: user.id,
      },
    });

    if (existingApplication) {
      return new NextResponse("You have already applied to this job", {
        status: 400,
      });
    }
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: user.id,
        coverLetter,
      },
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Apply Error:", error);
    const isAuthError = error.message.includes("Unauthenticated");
    return new NextResponse(error.message, { status: isAuthError ? 401 : 500 });
  }
};
