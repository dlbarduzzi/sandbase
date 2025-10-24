"use client"

import Link from "next/link"

import type { SignInSchema } from "@/services/auth/schemas/sign-in"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

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

import { Input, InputPassword } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"

import { AuthLogo } from "./logo"
import { AuthTerms } from "./terms"
import { AuthLayout } from "./layout"
import { AuthFooter } from "./footer"
import { SocialButtons } from "./social"
import { AuthSeparator } from "./separator"

import { authClient } from "@/auth/client"
import { signInSchema } from "@/services/auth/schemas/sign-in"

import { cn } from "@/core/css"

export function SignIn() {
  const [showPasswordValue, setShowPasswordValue] = useState(false)

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
    setShowPasswordValue(() => false)

    authClient.signIn.email(data, {
      onError: (ctx) => {
        console.error("Sign in failed...")
        console.error(ctx.error)
      },
      onSuccess: (ctx) => {
        // eslint-disable-next-line no-console
        console.log("Sign in success...")
        // eslint-disable-next-line no-console
        console.log(ctx.data)
      },
    })
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[400px]">
        <Card>
          <CardHeader>
            <AuthLogo isPending={isPending} />
            <div className="mt-6 space-y-1.5">
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Enter your details to access your account.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-y-8">
            <SocialButtons isPending={isPending} />
            <AuthSeparator />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-6"
            >
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-sign-in-email">
                        Email
                      </FieldLabel>
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
                        <FieldLabel htmlFor="form-sign-in-password">
                          Password
                        </FieldLabel>
                        <Link
                          href="/forgot-password"
                          prefetch={false}
                          className={cn(
                            "mr-1 text-[13px] leading-none text-gray-900 font-medium outline-none",
                            "hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2",
                            "focus-visible:ring-gray-900",
                            isPending && "pointer-events-none focus-visible:ring-0",
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
                          field.onChange(value)
                          field.onBlur()
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
              </FieldGroup>
              <Field>
                <Button
                  type="submit"
                  size="md"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? <Spinner /> : "Sign in"}
                </Button>
              </Field>
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
        <div className="px-2 pt-9 pb-6">
          <AuthTerms action="sign-in" isPending={isPending} />
        </div>
      </div>
    </AuthLayout>
  )
}
