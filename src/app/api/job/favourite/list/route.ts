import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const user = await getAuth()
         if(!user.id) return NextResponse.json({error: "unauthorized"}, {status: 401})

        //get all favourite jobs of the user
        const favoriteJobs = await prisma.favorite.findMany({
            where: {
                userId: user.id
            },
            include: {
                job: true
            }
        })

        return NextResponse.json(favoriteJobs)



    } catch (error) {
        console.log("Fetch All Jobs Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}