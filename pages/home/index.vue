<script lang="ts" setup>
const { $toast: toast } = useNuxtApp()

const router = useRouter()

/**
 * Sign out method
 */
async function signOut() {
  try {
    await $fetch('/api/signout', {
      method: 'POST',
      body: {
        type: 'local',
      },
    })

    toast.info('Successfully logged out')
    router.push('/')
  }
  catch (err) {
    toast.error('Error while logging out')
  }
}
</script>

<template>
  <span>Home</span>
  <button class="btn btn-primary rounded-full btn-block" @click="signOut">
    Sign out
  </button>
</template>
