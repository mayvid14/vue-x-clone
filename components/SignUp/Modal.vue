<script setup lang="ts">
import useVuelidate, { type ValidationRule } from '@vuelidate/core'
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators'
import type { Credentials } from '~/interfaces/params'

const { $toast: toast } = useNuxtApp()
const { signup } = useUsersStore()

/**
 * The 2-way value that determines if modal is shown
 */
const show = defineModel({
  default: false,
})
const modal = ref<HTMLDialogElement | undefined>()

// Helper methods for modals
useModals(show, modal)

const form = reactive<Credentials>({
  email: '',
  password: '',
})

const confirmPassword = ref('')

/**
 * Helper method for validation rule with error message
 */
function check(rule: ValidationRule, message: string) {
  return helpers.withMessage(message, rule)
}

const rules = computed(() => ({
  form: {
    email: {
      email: check(email, 'Not a valid email'),
      required: check(required, 'This is a required field'),
    },
    password: {
      required: check(required, 'This is a required field'),
      minLength: check(minLength(8), 'Password should be at least 8 characters long'),
      // strength,
    },
  },
  confirmPassword: {
    matchPassword: check(sameAs(form.password), 'Passwords do not match'),
  },
}))

// The validation state
const validation = useVuelidate(
  rules,
  { form, confirmPassword },
  {
    $autoDirty: true,
  },
)

/**
 * Resets the form
 */
function resetForm() {
  form.email = ''
  form.password = ''
  confirmPassword.value = ''

  validation.value.$reset()
}

/**
 * Function that makes the API call to signup
 */
async function signUp() {
  try {
    // Make the API call
    const { implicit, success } = await signup(form)

    if (!success) {
      if (implicit) {
        // Already signed in
        toast.info('This email already exists. Please sign in')
        show.value = false
        return
      }

      // Error in signing up
      toast.error('Some error occurred. Please try again')
      return
    }

    // Sign up OK
    toast.success('Signed Up successfully')
    navigateTo('/home')
  }
  catch (err) {
    toast.error('Some error occurred. Please try again')
  }
}

// If the prop is set to true, then show modal
watch(show, (newValue) => {
  if (newValue)
    return

  resetForm()
})
</script>

<template>
  <dialog
    ref="modal"
    class="modal"
  >
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute left-2 top-2"
          @click="show = false"
        >
          ✕
        </button>
      </form>
      <div class="flex flex-col prose px-10">
        <Icon
          name="carbon:logo-x"
          class="text-3xl w-full"
        />
        <h2 class="mt-3">
          Create your account
        </h2>
        <form>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Type your email here"
              class="input input-bordered w-full"
            >
            <TransitionGroup
              name="fade" tag="div" class="relative"
            >
              <div
                v-for="error of validation.form.email.$errors"
                :key="error.$uid"
                class="label"
              >
                <span class="label-text-alt text-error">{{ error.$message }}</span>
              </div>
            </TransitionGroup>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Password</span>
            </div>
            <input
              v-model="form.password"
              type="password" placeholder="Type your password here"
              class="input input-bordered w-full"
            >
            <TransitionGroup
              name="fade"
              tag="div" class="relative"
            >
              <div
                v-for="error of validation.form.password.$errors"
                :key="error.$uid" class="label"
              >
                <span class="label-text-alt text-error">{{ error.$message }}</span>
              </div>
            </TransitionGroup>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Confirm Password</span>
            </div>
            <input
              v-model="confirmPassword"
              type="password" placeholder="Type your password again"
              class="input input-bordered w-full"
            >
            <TransitionGroup
              name="fade" tag="div"
              class="relative"
            >
              <div
                v-for="error of validation.confirmPassword.$errors"
                :key="error.$uid" class="label"
              >
                <span class="label-text-alt text-error">{{ error.$message }}</span>
              </div>
            </TransitionGroup>
          </label>
        </form>

        <button
          class="btn btn-ghost btn-outline rounded-full btn-block mt-4"
          :disabled="validation.$invalid"
          @click.prevent="signUp"
        >
          Create
        </button>
      </div>
    </div>
  </dialog>
</template>
