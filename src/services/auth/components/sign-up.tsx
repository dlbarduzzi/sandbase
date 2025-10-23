"use client"

import type { SignUpSchema } from "@/services/auth/schemas/sign-up"

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
import { Spinner } from "@/components/ui/spinner"

import { AuthLogo } from "./logo"
import { AuthLayout } from "./layout"
import { AuthFooter } from "./footer"
import { SocialButtons } from "./social"
import { AuthSeparator } from "./separator"

import { signUpSchema } from "@/services/auth/schemas/sign-up"

export function SignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const isPending = form.formState.isSubmitting

  function onSubmit(data: SignUpSchema) {
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
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create an account and start exploring.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-y-8">
            <SocialButtons isPending={isPending} />
            <AuthSeparator />
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                type="button"
                size="md"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? <Spinner /> : "Sign up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <AuthFooter
              href="/sign-in"
              title="Sign in"
              question="Already have an account?"
              isPending={isPending}
            />
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  )
}
