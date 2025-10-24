import z from "zod"

const SERVER_ERROR = "INTERNAL_SERVER_ERROR"

const codeErrorSchema = z.object({
  code: z.enum([
    "EMAIL_NOT_VERIFIED",
    "INVALID_EMAIL_OR_PASSWORD",
    "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
    SERVER_ERROR,
  ]),
})

export function parseCodeError(error: unknown) {
  const parsed = codeErrorSchema.safeParse(error)
  return parsed.success ? parsed.data.code : SERVER_ERROR
}
