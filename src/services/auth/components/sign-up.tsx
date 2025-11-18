"use client"

import type { SignUpSchema } from "@/services/auth/schemas/sign-up"

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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Input, InputPassword } from "@/components/ui/input"

import { Logo } from "./logo"
import { Terms } from "./terms"
import { Action } from "./action"
import { Layout } from "./layout"

import { cn } from "@/core/css"
import { delay } from "@/core/time"
import { signUpSchema } from "@/services/auth/schemas/sign-up"

import { toast } from "@/components/ui/sonner"
import { authClient } from "@/core/auth/client"
import { getCodeFromError } from "@/core/auth/errors"

export function SignUp() {
  const [showPasswordValue, setShowPasswordValue] = useState(false)

  const router = useRouter()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "NEW_USER",
      email: "",
      password: "",
    },
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: SignUpSchema) {
    setShowPasswordValue(() => false)

    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    }, {
      onError: ({ error }) => {
        const code = getCodeFromError(error)
        switch (code) {
          case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
            toast.error("This email is already registered.")
            break
          default:
            toast.error("Something went wrong! Please try again.")
            break
        }
      },
      onSuccess: async () => {
        // Notify user to verify email address.
        toast.info("Almost there! Please check your email to complete registration.")

        // Allow time for user to see toast notification.
        await delay(2000)

        // Redirect user after success registration.
        router.push("/")

        // Allow time for user to see toast notification.
        await delay(5000)

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
              <CardTitle>Sign up</CardTitle>
              <CardDescription>Create an account and start exploring.</CardDescription>
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
                        <button
                          type="button"
                          className={cn(
                            "mr-1 text-[13px] leading-none font-medium outline-none",
                            "text-gray-900 hover:text-gray-700 focus-visible:ring-2",
                            "focus-visible:ring-offset-2 focus-visible:ring-gray-900",
                            isPending && "text-gray-500 pointer-events-none focus-visible:ring-0",
                          )}
                        >
                          Show Criteria
                        </button>
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
                <Button
                  type="submit"
                  size="md"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? <Spinner /> : "Sign up"}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Action action="sign-in" isDisabled={isPending} />
          </CardFooter>
        </Card>
        <div className="px-2 pt-7 pb-6">
          <Terms action="sign-up" isDisabled={isPending} />
        </div>
      </div>
    </Layout>
  )
}
