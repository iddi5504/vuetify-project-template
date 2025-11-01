import type { AxiosError } from "axios";
import { MyApi } from "./myApi";
import { AxiosClient } from "@/client";
import { client } from "@/plugins/dependency-injections";
import { countries } from "@/constants";
import vuetify from "@/plugins/vuetify";

/**
 * 
 * @param input The string in camelCase or snake_case to convert to readable sentence
 * @returns {string} The transformed version of the sentence
 */
export function toSentenseCase(input: string): string {
    return input
        .split('_') // Split by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(' '); // Join with spaces
}


/**
 * Tries to extract a meaningful error message from an axios error object.
 * @param {any} e The error object from axios 
 * @returns {string | null} The error message or null if not found
 */
export function getAxiosError(e: unknown) {
    const _e = e as AxiosError;
    let message = '';
    try {
        if (_e.response?.data) {
            message = (_e.response.data as Record<string, string>).message;
        }
    } catch (error) {
        message = _e.message;
    }
    if (!message?.length) {
        return null;
    }
    return message;
}

/**
 * This function constructs a full URL for a file based on a base path and file ID.
 * @param path The base url 
 * @param id The id of the file
 * @returns The full url of a file
 */
export function getIdPath(path: string, id: string) {
    return `${path}/${id}`
}


/**
 * This function constructs a full storage URL for a given file path.
 * @param path The path of the file
 * @returns the full url appended with the base storage url
 */
export function getStorageURL(path: string) {
    if (!path?.length) return ''
    return `${import.meta.env.VITE_BASE_STORAGE}/${path}`
}
export function getS3StorageFile(path: string) {
    if (!path?.length) return ''
    return `${import.meta.env.VITE_S3_BUCKET}${path}`
}

// write a debounce function
export function debounce(func: Function, timeout: number) {
    let timer: number;
    return function (...args: any) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), timeout);
    }
}

export async function uploadFile(payload: FormData) {
    const myApi = new MyApi({
        axiosClient: client,
        path: '/files'
    })

    return await myApi.uploadFile(payload)
}

export const dateApiFormat = (dateValue: string) => {
    const selectedDate = new Date(dateValue);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const hours = String(selectedDate.getHours()).padStart(2, "0");
    const minutes = String(selectedDate.getMinutes()).padStart(2, "0");
    const seconds = String(selectedDate.getSeconds()).padStart(2, "0");
    const api_date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return api_date;
};



export function formatDateToFromAPI(dateString: string) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export const getCountryName = (code: string) => {
    return countries.find((country) => country.code === code)?.name ?? ''
}

export const toggleTheme = (darkMode: boolean | null) => {
    vuetify.theme.global.name.value = darkMode ? 'dark' : 'light'
}