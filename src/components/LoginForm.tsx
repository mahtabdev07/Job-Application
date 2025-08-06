'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useLogin } from "@/hooks/useLogin"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()
  const {mutate: login, isPending, error} = useLogin()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    
    // Debug: Log the data being sent
    console.log('Sending login data:', formData)
    
    login({
      email: formData.email.trim(), // Trim whitespace
      password: formData.password
    },{
      onSuccess: () => {
        console.log('Login successful')
        router.push('/seeker/dashboard')
      },
      onError: (error: any) => {
        // Better error handling
        console.error('Login error:', error)
        
        let errorMessage = "Login failed"
        
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error?.response?.data?.error) {
          errorMessage = error.response.data.error
        } else if (error?.message) {
          errorMessage = error.message
        }
        
        alert(errorMessage)
      }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={formData.email} // Fixed: Add value prop
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  name="password" 
                  value={formData.password} // Fixed: Add value prop
                  onChange={handleChange} 
                  id="password" 
                  type="password" 
                  required 
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}