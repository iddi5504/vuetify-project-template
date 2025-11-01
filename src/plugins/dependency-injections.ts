import { AxiosClient } from "@/client";
import AuthRepository from "@/repositories/auth-repository";
import AuthService from "@/services/auth-service";
import axios from "axios";
import type { App } from "vue";


export const client = new AxiosClient(axios, {
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false

})

export const authAxiosClient = new AxiosClient(axios, {
    baseURL: import.meta.env.VITE_AUTH_URL,
    withCredentials: false
})
export const storageAxiosClient = new AxiosClient(axios, {
    baseURL: import.meta.env.VITE_BASE_STORAGE,
    withCredentials: false
})

export const initializeAppDependencies = (app: App) => {


    const authRepository = new AuthRepository(authAxiosClient)


    /* 
    Initialize Services
    */
    const authService = new AuthService(authRepository)

    app.provide('authService', authService)

}