import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

   try {
    const user = await getAuth();
     const {job_title, job_description, job_location, salary_max, salary_min} = await req.json();
    if(!job_title || !job_description || !job_location || !salary_max || !salary_min){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    const company = await prisma.company.findFirst({
        where: {
            ownerId: user.id
        }
    })

    if(!company){
        return NextResponse.json({error: "Company not found"}, {status: 404})
    }


    const job = await prisma.job.create({
        data: {
            job_title,
            job_description,
            job_location,
              salary_max,
            salary_min,
            companyId: company.id,
            postedByUserId: user.id
        }
    })

    return NextResponse.json(job, {status: 201})
    
   } catch (error) {
    console.log(error)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
   }

};