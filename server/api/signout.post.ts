import { z } from 'zod'
import db from '~/server/utils/supabase'

const ScopeSchema = z.object({
  type: z.enum(['global', 'local', 'others']),
})

/**
 * Handles the sign out of the user
 */
export default defineEventHandler(async (event) => {
  const parsedBody = await readValidatedBody(event, body => ScopeSchema.safeParse(body))

  if (!parsedBody.success) {
    // If incorrect body, throw
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid scope',
    })
  }

  const response = await db.getClient(event).auth.signOut({
    scope: parsedBody.data.type,
  })

  // If error, throw it
  if (response.error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error while logging out',
    })
  }

  // Return nothing on success
})
