"use client"

import type { SignUpSchema } from "@/services/auth/schemas/sign-up"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input, InputPassword } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { AuthLogo } from "./logo"
import { AuthTerms } from "./terms"
import { AuthLayout } from "./layout"
import { AuthFooter } from "./footer"
import { SocialButtons } from "./social"
import { AuthSeparator } from "./separator"

import { authClient } from "@/auth/client"
import { signUpSchema } from "@/services/auth/schemas/sign-up"

import { cn } from "@/core/css"

export function SignUp() {
  const router = useRouter()

  const [showPasswordValue, setShowPasswordValue] = useState(false)

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
    setShowPasswordValue(() => false)

    authClient.signUp.email(data, {
      onError: (ctx) => {
        console.error("Sign up failed...")
        console.error(ctx.error)
      },
      onSuccess: () => {
        router.push("/sign-in")
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
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Create an account and start exploring.
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
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-sign-up-name">
                        Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-sign-up-name"
                        disabled={isPending}
                        placeholder="Brian Smith"
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
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-sign-up-email">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-sign-up-email"
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
                      <FieldLabel htmlFor="form-sign-up-password">
                        Password
                      </FieldLabel>
                      <InputPassword
                        {...field}
                        id="form-sign-up-password"
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
                      <div className="leading-0 flex justify-end">
                        <button
                          type="button"
                          onClick={() => console.warn("This functionality is under construction...")}
                          className={cn(
                            "mr-1 text-[13px] leading-none text-gray-900 font-medium outline-none",
                            "hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2",
                            "focus-visible:ring-gray-900 cursor-pointer",
                            isPending && "pointer-events-none focus-visible:ring-0",
                          )}
                        >
                          Show requirements
                        </button>
                      </div>
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
                  {isPending ? <Spinner /> : "Sign up"}
                </Button>
              </Field>
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
        <div className="px-2 pt-9 pb-6">
          <AuthTerms action="sign-up" isPending={isPending} />
        </div>
      </div>
    </AuthLayout>
  )
}
