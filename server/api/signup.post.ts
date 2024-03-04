import { z } from 'zod'
import db from '~/server/utils/supabase'

// Schema for the body
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  // Safely parse the request body first
  const parsedBody = await readValidatedBody(event, body => signUpSchema.safeParse(body))

  if (!parsedBody.success) {
    // Early throw if not a valid request body
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid request body structure',
    })
  }

  const { data: credentials } = parsedBody
  const { data: dbData, error: dbError } = await db.getClient(event).auth.signUp({
    ...credentials,
  })

  if (dbError) {
    // If error because of already registered, return a null structure
    if (dbError.message === 'User already registered') {
      return {
        session: null,
      }
    }

    // Some other error. Throw a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Signup failed',
    })
  }

  // Return the response
  return {
    session: {
      ...dbData.session,
    },
  }
})
