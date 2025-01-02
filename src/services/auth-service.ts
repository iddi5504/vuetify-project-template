import type { AuthPayload, PasswordChangePayload, PasswordResetPayload } from "@/repositories/auth-repository";
import type AuthRepository from "@/repositories/auth-repository";
import { useAuthStore } from "@/stores/authStore";
export default class AuthService {
    constructor(private authRepository: AuthRepository) { }
    async login(payload: AuthPayload) {
        const authStore = useAuthStore()
        const res = await this.authRepository.login(payload);
        localStorage.setItem('jwt_access_token', res.data.access_token);
        localStorage.setItem('jwt_refresh_token', res.data.refresh_token);
        authStore.userAccount = res.data.user;
        return res.data.user
    }
    async logout() {
        const authStore = useAuthStore()
        try {
            await this.authRepository.logout();
            localStorage.removeItem('jwt_access_token');
            authStore.userAccount = null;
        } catch (error) {
            // openSnacker("Could not logout, try again", "error")
        }
    }

    async verifyUser(tenant: string) {
        const res = await this.authRepository.verifyUser(tenant)
        return res;
    }
    async changePassword(payload: PasswordChangePayload) {
        const res = await this.authRepository.changePassword(payload)
        return res;
    }
    async resetPassword(payload: PasswordResetPayload, tenant: string) {
        const res = await this.authRepository.resetPassword(payload, tenant)
        return res;
    }

    async getPermissions() {
        const res = await this.authRepository.getPermissions({
            lang: 'en'
        })
        return res.data;
    }

}