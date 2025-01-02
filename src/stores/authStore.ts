import type { PasswordChangePayload, PasswordResetPayload, User } from "@/repositories/auth-repository"
import AuthService from "@/services/auth-service"

import { defineStore } from 'pinia'
import { useAppStore } from "./appStore"

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const userAccount = ref<User | null>()
    const authService = inject<AuthService>('authService')
    const changingPassword = ref<boolean>(false)


    let attempts = 0

    async function login(form: { username: string, password: string }) {
        try {
            attempts++
            const res = await authService?.login({
                ...form,
                tenant: 'e-learning'
            })

            userAccount.value = res;

            useAppStore().showToast(`Logged in as ${res?.username}`, 'success')

            await router.replace('/level')

        } catch (error) {
            if (attempts < 2) {
                login(form)
                return;
            }
            useAppStore().showToast('Could not log in', 'danger')
        }
    }

    async function changePassword(form: PasswordChangePayload) {
        try {
            changingPassword.value = true;
            await authService?.changePassword(form)
            // openSnacker(`Password has been change successfully`, 'success')
        } catch (error) {
            // openSnacker('Could not change password', 'error')
        }
        changingPassword.value = false;
    }
    async function resetPassword(payload: PasswordResetPayload) {
        try {
            changingPassword.value = true;
            await authService?.resetPassword(payload, 'novoradb1')
            // openSnacker(`A reset link has been sent to ${payload.email}`, 'success')
        } catch (error) {
            // openSnacker('COuld not send reset link', 'error')
        }
        changingPassword.value = false;
    }

    async function logout() {
        await authService?.logout()
        router.push('/login')
    }



    // onMounted(() => {
    //   if (!myApi.authStore.isAdmin)
    //     router.push('/login')
    // })

    return {
        login,
        logout,
        userAccount,
        changePassword,
        changingPassword,
        resetPassword
    }
}, {
    persist: {
        pick: ['userAccount']
    }
})

