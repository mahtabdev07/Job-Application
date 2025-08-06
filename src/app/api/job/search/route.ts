import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest)=>{
    try {
    const {searchParams} = new URL(req.url)
    const query = searchParams.get("q") || "" 
    const location = searchParams.get("location") || ""
    const minSalaryStr = searchParams.get("minSalary") || ""
    const maxSalaryStr = searchParams.get("maxSalary") || ""


    const minSalary = minSalaryStr? parseInt(minSalaryStr, 10) : undefined
    const maxSalary = maxSalaryStr? parseInt(maxSalaryStr, 10) : undefined


    const where: any = {}

    if(query){
        where.job_title = {
            contains: query,
            mode: "insensitive"
        }
    }
    if(location){
        where.job_location = {
            contains: location,
            mode: "insensitive"
        }
    }
    if(minSalary !== undefined){
        where.salary_min = {
            gte: minSalary
        }
    }
    if(maxSalary !== undefined){
        where.salary_max = {
            lte: maxSalary
        }
    }

    const jobs = await prisma.job.findMany({
        where,
        include: {
            company: true,
            postedBy: true
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    return NextResponse.json(jobs)
    } catch (error) {
        console.log("search jobs Error", error)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}