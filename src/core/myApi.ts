import type { AxiosClient } from "@/client";
import type { API_LIST_QueryParams, API_LIST_RESPONSE, UploadPayload } from "@/types/api";

export class MyApi {
    path: string;
    axiosClient: AxiosClient
    constructor({ axiosClient, path }: { path: string, axiosClient: AxiosClient }) {
        this.path = path;
        this.axiosClient = axiosClient
    }

    async getItems<T>(params?: API_LIST_QueryParams) {
        return await this.axiosClient.get<API_LIST_RESPONSE<T>>(this.path, {
            params: params
        })
    }
    async getItemById<T>(id: string) {
        return await this.axiosClient.get<T>(`${this.path}/${id}`)
    }

    async uploadFile(attachment: UploadPayload) {
        const res = await this.axiosClient.post<{ path: string }>(this.path, attachment, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res;
    }

    async addItem(payload: Record<string, unknown>,) {
        return await this.axiosClient.post<{ uuid: string }>(this.path, payload)
    }
    async updateItem(id: string, payload: Record<string, unknown>,) {
        return await this.axiosClient.patch(`${this.path}/${id}`, payload)
    }

    async deleteItem(id: string) {
        return await this.axiosClient.delete(`${this.path}/${id}`)
    }
}