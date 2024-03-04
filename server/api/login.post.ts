import { z } from 'zod'
import db from '~/server/utils/supabase'

const GENERIC_MESSAGE = 'Invalid credentials'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

/**
 * Method that will log in a user
 */
export default defineEventHandler(async (event) => {
  const parsedBody = await readValidatedBody(event, body => credentialsSchema.safeParse(body))

  // Throw error if email or password fails schema check
  if (!parsedBody.success) {
    throw createError({
      statusCode: 401,
      statusMessage: GENERIC_MESSAGE,
    })
  }

  // Get the credentials and sign in
  const { data: credentials } = parsedBody
  const { data: signInData, error: signInError } = await db.getClient(event).auth.signInWithPassword(credentials)

  // Status 400 means invalid credentials, so throw that
  if (signInError?.status === 400) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid credentials',
    })
  }

  return {
    session: signInData.session,
  }
})
