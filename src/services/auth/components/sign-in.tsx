"use client"

import type { SignInSchema } from "@/services/auth/schemas/sign-in"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { AuthLogo } from "./logo"
import { AuthLayout } from "./layout"
import { AuthFooter } from "./footer"
import { SocialButtons } from "./social"
import { AuthSeparator } from "./separator"

import { signInSchema } from "@/services/auth/schemas/sign-in"

export function SignIn() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: undefined,
    },
  })

  const isPending = form.formState.isSubmitting

  function onSubmit(data: SignInSchema) {
    // eslint-disable-next-line no-console
    console.log(data)
  }

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
          <CardContent className="grid grid-cols-1 gap-y-8">
            <SocialButtons isPending={isPending} />
            <AuthSeparator />
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                size="md"
                disabled={isPending}
                className="w-full"
              >
                Sign in
              </Button>
            </form>
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
