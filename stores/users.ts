import { defineStore } from 'pinia'
import type { Credentials } from '~/interfaces/params'

export const useUsersStore = defineStore('users', () => {
  // The reference to supabase client to make calls
  const supabase = useSupabaseClient()

  // The reactive user object
  const session = useSupabaseUser()

  /**
   * Method that logs in a user
   * @param credentials The credentials to use for logging in
   * @param [implicit] true if it was called from somewhere else
   * @returns The status of the call
   * @throws error if login fails
   */
  async function login(credentials: Credentials, implicit = false) {
    const { error } = await supabase.auth.signInWithPassword(credentials)

    // If it is not an invalid user error, throw to show generic error
    if (error && error.status !== 400)
      throw new Error('API error')

    return {
      // It is success if there is no error
      success: !error,
      implicit,
    }
  }

  /**
   * Method that signs up the user
   * @param credentials The credentials to sign up with
   * @returns The status of the call
   * @throws if sign up fails
   */
  async function signup(credentials: Credentials) {
    const { error } = await supabase.auth.signUp(credentials)

    // if no error, send OK
    if (!error) {
      return {
        success: true,
        implicit: false,
      }
    }

    // If user already exists, try logging in
    if (error.status === 400)
      return login(credentials, true)

    // Failure overall
    return {
      success: false,
      implicit: false,
    }
  }

  /**
   * Method that signs out a user
   */
  async function signout() {
    const { error } = await supabase.auth.signOut({
      scope: 'local',
    })

    if (error)
      throw new Error('Sign out error')
  }

  return {
    login,
    signup,
    signout,
    session,
  }
})
