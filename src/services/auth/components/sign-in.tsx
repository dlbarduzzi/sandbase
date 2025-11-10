"use client"

import type { SignInSchema } from "@/services/auth/schemas/sign-in"

import Link from "next/link"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { Input, InputPassword } from "@/components/ui/input"

import { Logo } from "./logo"
import { Terms } from "./terms"
import { Action } from "./action"
import { Layout } from "./layout"

import { cn } from "@/core/css"
import { delay } from "@/core/time"
import { signInSchema } from "@/services/auth/schemas/sign-in"

import { toast } from "@/components/ui/sonner"
import { authClient } from "@/core/auth/client"
import { getCodeFromError } from "@/core/auth/errors"

export function SignIn() {
  const [showPasswordValue, setShowPasswordValue] = useState(false)

  const router = useRouter()

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: undefined,
    },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: SignInSchema) {
    setShowPasswordValue(() => false)

    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    }, {
      onError: ({ error }) => {
        const code = getCodeFromError(error)
        switch (code) {
          case "EMAIL_NOT_VERIFIED":
            toast.error("You must verify your email address.")
            break
          case "INVALID_EMAIL_OR_PASSWORD":
            toast.error("Invalid email or password.")
            break
          default:
            toast.error("Something went wrong! Please try again.")
            break
        }
      },
      onSuccess: async () => {
        // Notify user that he is signed in.
        toast.success("Signed in! You will be redirected soon.")

        // Allow time for user to see toast notification.
        await delay(1500)

        // Redirect user after success login.
        router.push("/")

        // Remove toast notification.
        toast.dismiss()
      },
    })
  }

  return (
    <Layout>
      <div className="w-full max-w-[400px]">
        <Card>
          <CardHeader>
            <Logo isDisabled={isPending} />
            <div className="mt-6 space-y-1.5">
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Enter your details to access your account.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-sign-in-email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="form-sign-in-email"
                        disabled={isPending}
                        placeholder="you@email.com"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid
                        ? <FieldError errors={[fieldState.error]} />
                        : null
                      }
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="leading-0 flex gap-x-2 justify-between items-center">
                        <FieldLabel htmlFor="form-sign-in-password">Password</FieldLabel>
                        <Link
                          href="/forgot-password"
                          prefetch={false}
                          className={cn(
                            "mr-1 text-[13px] leading-none font-medium outline-none",
                            "text-gray-900 hover:text-gray-700 focus-visible:ring-2",
                            "focus-visible:ring-offset-2 focus-visible:ring-gray-900",
                            isPending && "text-gray-500 pointer-events-none focus-visible:ring-0",
                          )}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <InputPassword
                        {...field}
                        id="form-sign-in-password"
                        disabled={isPending}
                        placeholder="Enter your password..."
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        showPassword={showPasswordValue}
                        setShowPassword={setShowPasswordValue}
                      />
                      {fieldState.invalid
                        ? <FieldError errors={[fieldState.error]} />
                        : null
                      }
                    </Field>
                  )}
                />
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                      className="flex items-start"
                    >
                      <Checkbox
                        id="form-sign-in-remember-me"
                        name={field.name}
                        disabled={isPending}
                        aria-invalid={fieldState.invalid}
                        onCheckedChange={value => {
                          field.onBlur()
                          field.onChange(value)
                        }}
                      />
                      <FieldContent>
                        <FieldLabel
                          htmlFor="form-sign-in-remember-me"
                          className="leading-snug"
                        >
                          Remember me
                        </FieldLabel>
                        <FieldDescription>
                          Not recommended on shared devices.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />
                <Button
                  type="submit"
                  size="md"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? <Spinner /> : "Sign in"}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Action action="sign-up" isDisabled={isPending} />
          </CardFooter>
        </Card>
        <div className="px-2 pt-7 pb-6">
          <Terms action="sign-in" isDisabled={isPending} />
        </div>
      </div>
    </Layout>
  )
}
