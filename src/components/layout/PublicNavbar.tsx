'use client'

import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Briefcase, Search } from "lucide-react"
import { useUser } from "@/hooks/getUser"

const PublicNavbar = () => {
  const { data: user, isLoading: userLoading, error } = useUser()

  return (
        <div className="md:px-4 flex items-center justify-between bg-background lg:bg-transparent rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-xl lg:bg-opacity-30  w-full md:h-16 h-16">
        <div className="items-center gap-8 flex">
           <Link href={'/'}> 
            <Briefcase className="w-10 h-10" />
           </Link>
            <ul className="md:flex hidden gap-6 items-center">
                <Link href={'/seeker/dashboard'} className="text-[16px]">Jobs</Link>
                <Link href={'/'} className="text-[16px]">Companies</Link>
                <Link href={'/'} className="text-[16px]">Services</Link>
            </ul>
        </div>
       
         {/* <form action={'/search'} method="GET" className="search hidden max-w-[400px] w-92   lg:flex items-center  border rounded-3xl">
                <Input name="q" className="w-full shadow-none outline-none border-none  rounded-2xl" placeholder="Search" />
                <Button className=" rounded-full px-0" size={'sm'}><Search/></Button>
            </form> */}
       
        <div className="buttons gap-2 flex items-center">
          {!user ? (
            <>
              <Link href={'/login'}>
                <Button className="font-bold" variant={'outline'}>Login</Button>
              </Link> 
              <Link href={'/register'}>
                <Button variant={'destructive'}>Register</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary text-black dark:text-white rounded-full flex items-center justify-center font-semibold text-sm uppercase">
              {user.name?.charAt(0)}
            </div>

            </div>
            
          )}

          <div className="select hidden lg:flex">
            <Link href={'/employer/dashboard'}>
              <Button variant={"link"}>Post a job</Button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default PublicNavbar