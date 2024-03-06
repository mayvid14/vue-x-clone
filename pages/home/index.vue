<script lang="ts" setup>
const { $toast: toast } = useNuxtApp()

const { session, signout } = useUsersStore()

/**
 * Sign out method
 */
async function signOut() {
  try {
    await signout()

    toast.info('Successfully logged out')
    navigateTo('/')
  }
  catch (err) {
    toast.error('Error while logging out. Please refresh')
  }
}
</script>

<template>
  <span>Home</span>
  <div>
    {{ session }}
  </div>
  <button class="btn btn-primary rounded-full btn-block" @click="signOut">
    Sign out
  </button>
</template>
