import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

let client: SupabaseClient

export default {
  /**
   * Helper util to get the supabase client
   * @param event The H3 event object
   * @returns The supabase client
   */
  getClient(event: any) {
    if (!client) {
      const runtimeConfig = useRuntimeConfig(event)
      client = createClient(
        runtimeConfig.dbUrl,
        runtimeConfig.dbKey,
      )
    }

    return client
  },
}
