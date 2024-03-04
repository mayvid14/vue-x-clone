/**
 * Composable that handles hide and show of a modal
 * @param show The ref used to show/hide the modal
 * @param modal The ref of the modal
 */
export function useModals(show: MaybeRef<boolean>, modal: MaybeRef<HTMLDialogElement | undefined>) {
  // To track modal close
  const { escape } = useMagicKeys()

  // Update modal visibility on basis of show ref
  watch(() => unref(show), (newValue) => {
    const modalVal = unref(modal)
    if (!modalVal)
      return

    if (newValue) {
      modalVal.showModal()
      return
    }

    modalVal.close()
  })

  // Close modal on escape press
  watch(escape, (v) => {
    if (v && isRef(show))
      show.value = false
  })
}
