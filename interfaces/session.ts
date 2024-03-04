import type { SessionUser } from '~/interfaces/user'

export interface XSession {
  provider_token?: string | null | undefined
  provider_refresh_token?: string | null | undefined
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number | undefined
  token_type: string
  user: SessionUser
}
