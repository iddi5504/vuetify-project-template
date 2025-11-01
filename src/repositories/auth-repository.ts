
import { AxiosClient } from "@/client";
import { type API_LIST_RESPONSE } from "@/types/api";


export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createAt: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  enabled: boolean;
  jobTitle: string;
  permissionId: number;
  tenant: string;
  tenantLanguages: string[];
  attributes: {
    jobTitle: string[];
    permissionId: string[];
    local?: string[];
    profilePic?: string[];
    initials: string[];
  }
}

export type UserPayload = Partial<Omit<User, 'id'>>

export type Permission = {
  id: string;
  name: string;
  permissions: string;
  enabled: boolean;
};

export type PasswordChangePayload = {
  oldPassword: string;
  newPassword: string;
};
export type PasswordResetPayload = {
  email: string;
};

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  access_token_expiration: number;
  refresh_token_expiration: number;
  user: User;
}

export type AuthPayload = {
  username: string;
  password: string;
  tenant: string;
};

export default class AuthRepository {
  /**
   * AuthRepository constructor, Takes in an Axios client instance
   * @param client Axios client instance
   */
  constructor(private client: AxiosClient) { }
  async login(payload: AuthPayload) {
    const res = await this.client.post<AuthResponse>("/login", payload);
    return res;
  }
  async logout() {
    const res = await this.client.post<AuthResponse>("/logout");
    return res;
  }

  async verifyUser(tenant: string) {
    const res = await this.client.get<User>(`/verify-user?tenant=${tenant}`);
    return res;
  }

  async changePassword(payload: PasswordChangePayload) {
    const res = await this.client.post<User>(`/change-password`, payload);
    return res;
  }

  async resetPassword(payload: PasswordResetPayload, tenant: string) {
    const res = await this.client.post<User>(`/reset-password`, payload, {
      params: {
        tenant: tenant,
      },
    });
    return res;
  }

  async getPermissions(query: Record<string, string>) {
    const res = await this.client.get<API_LIST_RESPONSE<Permission>>(
      `/permission`,
      {
        params: {
          ...query,
        },
      }
    );
    return res;
  }
}
