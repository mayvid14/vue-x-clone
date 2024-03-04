import Vue3Toastify, { type ToastContainerOptions, toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    closeButton: true,
    limit: 5,
    newestOnTop: true,
    theme: 'dark',
    clearOnUrlChange: false,
  } as ToastContainerOptions)

  return {
    provide: { toast },
  }
})
