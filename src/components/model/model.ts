import type { ISetting, ITransaction, IUser, IUserData, IUserReq, PostJsonResponse } from './types';

const baseUrl = 'https://thankful-triangular-acapella.glitch.me';
const basePath = {
  register: '/register',
  login: '/login',
  settings: '/settings',
  transactions: '/transactions',
  users: '/users',
};

export class Model {
  async registerUser<T, D = object>(data: D): Promise<PostJsonResponse<T>> {
    try {
      const response = await fetch(`${baseUrl}${basePath.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const out = await this.checkResponse<T>(response);

      localStorage.userdata = JSON.stringify(out.data);

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async loginUser<T, D>(data: D): Promise<PostJsonResponse<T>> {
    try {
      const response = await fetch(`${baseUrl}${basePath.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const out = await this.checkResponse<T>(response);

      // localStorage.setItem('userdata', JSON.stringify(out.data));
      localStorage.userdata = JSON.stringify(out.data);

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  getStorage(): IUserData {
    const str = localStorage.getItem('userdata') ?? '';
    const storage: IUserReq = JSON.parse(str) as IUserReq;

    return {
      id: storage.user.id,
      token: storage.accessToken,
    };
  }

  async getUser<T>(): Promise<PostJsonResponse<T>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return await this.checkResponse<T>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async checkResponse<T>(response: Response): Promise<PostJsonResponse<T>> {
    const output: PostJsonResponse<T> = {
      status: response.status,
      message: response.statusText,
    };

    if (response.status === 200 || response.status === 201) {
      const json = (await response.json()) as Awaited<Promise<T>>;

      output.data = json;
    } else {
      output.message = String(await response.json());
    }

    return output;
  }

  async updateUser<T>(dataU: IUser): Promise<PostJsonResponse<T>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(dataU),
      });

      return await this.checkResponse<T>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async deleteUser<T>(): Promise<PostJsonResponse<T>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return await this.checkResponse<T>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async setSettings<ISettingReq>(dataU: ISetting): Promise<PostJsonResponse<ISettingReq>> {
    try {
      const data: IUserData = this.getStorage();

      dataU.userId = data.id;
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(dataU),
      });

      return await this.checkResponse<ISettingReq>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async getSettings<ISettingReq>(): Promise<PostJsonResponse<ISettingReq[]>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}/settings`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return await this.checkResponse<ISettingReq[]>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async updateSettings<ISettingReq>(
    dataU: ISetting,
    id: number,
  ): Promise<PostJsonResponse<ISettingReq>> {
    try {
      const data: IUserData = this.getStorage();

      dataU.userId = data.id;
      const response = await fetch(`${baseUrl}${basePath.settings}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(dataU),
      });

      return await this.checkResponse<ISettingReq>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async deleteSettings<ISettingReq>(id: number): Promise<PostJsonResponse<ISettingReq>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.settings}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return await this.checkResponse<ISettingReq>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async setTransactions<ITransactionReq>(
    dataU: ITransaction,
  ): Promise<PostJsonResponse<ITransactionReq>> {
    try {
      const data: IUserData = this.getStorage();

      dataU.userId = data.id;
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(dataU),
      });

      return await this.checkResponse<ITransactionReq>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async getTransactions<ITransactionReq>(): Promise<PostJsonResponse<ITransactionReq[]>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}/transactions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return await this.checkResponse<ITransactionReq[]>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async updateTransactions<ITransactionReq>(
    dataU: ITransaction,
    id: number,
  ): Promise<PostJsonResponse<ITransactionReq>> {
    try {
      const data: IUserData = this.getStorage();

      dataU.userId = data.id;
      const response = await fetch(`${baseUrl}${basePath.transactions}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(dataU),
      });

      return await this.checkResponse<ITransactionReq>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async deleteTransactions<ITransactionReq>(
    id: number,
  ): Promise<PostJsonResponse<ITransactionReq>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.transactions}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      return await this.checkResponse<ITransactionReq>(response);
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  checkError(error: unknown): string {
    const err = error instanceof Error ? JSON.stringify(error) : '';

    return err;
  }
}
