import { toast } from 'sonner'

export function useToast() {
  const showToast = {
    success: (message, description) => {
      toast.success(message, {
        description,
        duration: 4000,
      })
    },
    error: (message, description) => {
      toast.error(message, {
        description,
        duration: 5000,
      })
    },
    info: (message, description) => {
      toast.info(message, {
        description,
        duration: 4000,
      })
    },
    warning: (message, description) => {
      toast.warning(message, {
        description,
        duration: 4000,
      })
    },
  }

  return showToast
}
