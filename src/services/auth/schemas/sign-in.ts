import z from "zod"

export const signInSchema = z.strictObject({
  email: z
    .email("Not a valid email")
    .trim()
    .min(1, "Email is required"),
  password: z
    .string({ error: "Password is required" })
    .trim()
    .min(1, "Password is required"),
  rememberMe: z.boolean().or(z.undefined()),
})

export type SignInSchema = z.infer<typeof signInSchema>
