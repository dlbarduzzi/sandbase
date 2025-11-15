import z from "zod"

const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"

const codeError = z.object({
  code: z.enum([
    "EMAIL_NOT_VERIFIED",
    "INVALID_EMAIL_OR_PASSWORD",
    INTERNAL_SERVER_ERROR,
  ]),
})

function getCodeFromError(error: unknown) {
  const parsed = codeError.safeParse(error)
  return parsed.success ? parsed.data.code : INTERNAL_SERVER_ERROR
}

export { getCodeFromError }
