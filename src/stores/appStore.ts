
import { defineStore } from "pinia"

export const useAppStore = defineStore('appStore', () => {

    const darkMode = ref<boolean>(false)


    const toast = ref({
        message: '',
        varient: '',
        show: false
    })

    const showToast = (message: string, variant?: 'success' | 'danger' | 'warning') => {
        toast.value = {
            message: message,
            varient: variant || 'success',
            show: true
        };
    }

    const appColors = ref<{
        primary?: string;
        secondary?: string;
    }>({});

    return { appColors, toast, darkMode, showToast }
}, {
    persist: {
        pick: ['appColors', 'darkMode']
    }
})
