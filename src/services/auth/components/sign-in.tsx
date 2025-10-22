"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AuthLogo } from "./logo"
import { AuthLayout } from "./layout"
import { AuthFooter } from "./footer"

export function SignIn() {
  const isPending = false
  return (
    <AuthLayout>
      <div className="w-full max-w-[400px]">
        <Card>
          <CardHeader>
            <AuthLogo isPending={isPending} />
            <div className="mt-6 space-y-1.5">
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Enter your details to access your account.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm">Content...</div>
          </CardContent>
          <CardFooter>
            <AuthFooter
              href="/sign-up"
              title="Sign up"
              question="Need to create an account?"
              isPending={isPending}
            />
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  )
}
