import { defineStore } from 'pinia'
import type { Credentials } from '~/interfaces/params'
import type { SessionUser } from '~/interfaces/user'

export const useUsersStore = defineStore('users', () => {
  const session = reactive<Partial<SessionUser>>({})

  /**
   * Method that logs in a user
   * @param credentials The credentials to use for logging in
   * @throws error if login fails
   */
  async function login(credentials: Credentials) {
    const { session: sessionData } = await $fetch('/api/login', {
      body: credentials,
      method: 'POST',
    })
    Object.assign(session, sessionData)
  }

  return {
    session,
    login,
  }
})
