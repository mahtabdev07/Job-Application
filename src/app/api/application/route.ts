import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const {coverLetter, resume, jobId, userId  } = await req.json()
    if(!coverLetter || !resume || !jobId || !userId) return NextResponse.json({error: "All fields are required"}, {status: 400})
    
    const application = await prisma.application.create({data: {coverLetter, resume, jobId, userId}})
    return NextResponse.json(application)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
};