import type {
  ISetting,
  ISettingReq,
  ITransaction,
  ITransactionReq,
  IUser,
  IUserData,
  IUserReq,
  PostJsonResponse,
} from './types';

const baseUrl = 'https://thankful-triangular-acapella.glitch.me';
const basePath = {
  register: '/register',
  login: '/login',
  settings: '/settings',
  transactions: '/transactions',
  users: '/users',
};

export class Model {
  #setting: ISettingReq[];
  #transaction: ITransactionReq[];
  #access: boolean;
  userData: IUserReq;
  currencySign: string;

  constructor() {
    this.#setting = [];
    this.#transaction = [];
    this.#access = false;
    this.userData = this.getStorageData();
    this.currencySign = '$';
  }

  get transaction(): ITransactionReq[] {
    return this.#transaction;
  }

  set transaction(trans: ITransactionReq[]) {
    this.#transaction = trans;
  }

  get setting(): ISettingReq[] {
    return this.#setting;
  }

  set setting(set: ISettingReq[]) {
    this.#setting = set;
  }

  setCurrency(valueName: string): void {
    const currencyData = { USD: '$', EUR: '€', RUB: '₽', YEN: '¥' };

    this.currencySign = String(currencyData[valueName]);
  }

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

      localStorage.userdata = JSON.stringify(out.data ?? '');
      this.userData = this.getStorageData();

      if (out.status === 200 || out.status === 201) {
        this.#access = true;
        const arr1 = await this.getSettings();
        const arr2 = await this.getTransactions();

        arr1.data === undefined ? (this.setting = []) : (this.setting = arr1.data);
        arr2.data === undefined ? (this.transaction = []) : (this.transaction = arr2.data);
      } else {
        this.#access = false;
      }

      // localStorage.userdata = JSON.stringify(out.data);

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

      localStorage.userdata = JSON.stringify(out.data ?? '');
      this.userData = this.getStorageData();

      if (out.status === 200 || out.status === 201) {
        // localStorage.userdata = JSON.stringify(out.data);
        this.#access = true;
        const arr1 = await this.getSettings();
        const arr2 = await this.getTransactions();

        arr1.data === undefined ? (this.setting = []) : (this.setting = arr1.data);
        arr2.data === undefined ? (this.transaction = []) : (this.transaction = arr2.data);
      } else {
        this.#access = false;
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  getStorage(): IUserData {
    const str = localStorage.getItem('userdata') === null ? '' : String(localStorage.userdata);

    const str2 = str.length < 3 ? '{"accessToken": "","user": {"email": "","id": 0}}' : str;
    const storage: IUserReq = JSON.parse(str2) as IUserReq;

    return {
      id: storage.user.id,
      token: storage.accessToken,
    };
  }
  getStorageData(): IUserReq {
    const str = localStorage.getItem('userdata') === null ? '' : String(localStorage.userdata);

    const str2 = str.length < 3 ? '{"accessToken": "","user": {"email": "","id": 0}}' : str;
    const storage: IUserReq = JSON.parse(str2) as IUserReq;

    return storage;
  }

  async getUser<T>(): Promise<PostJsonResponse<T> | undefined> {
    try {
      const data: IUserData = this.getStorage();

      if (data.token.length > 3) {
        const response = await fetch(`${baseUrl}${basePath.users}/${data.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const out = await this.checkResponse<T>(response);

        if (out.status === 200 || out.status === 201) {
          const arr1 = await this.getSettings();
          const arr2 = await this.getTransactions();

          arr1.data === undefined ? (this.setting = []) : (this.setting = arr1.data);
          arr2.data === undefined ? (this.transaction = []) : (this.transaction = arr2.data);
          this.#access = true;

          if (this.setting[0] !== undefined) {
            this.setCurrency(this.setting[0].currency);
          }
        } else {
          this.#access = false;
          localStorage.removeItem('userdata');

          return out;
        }
      }

      return;
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

      this.#access = true;
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

  async setSettings<T>(dataU: ISetting): Promise<PostJsonResponse<T>> {
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
      const out = await this.checkResponse<T>(response);

      if (out.status === 200 || out.status === 201) {
        const arr = await this.getSettings();

        arr.data === undefined ? (this.setting = []) : (this.setting = arr.data);
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async getSettings<T extends ISettingReq>(): Promise<PostJsonResponse<T[]>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}/settings`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      const out = await this.checkResponse<T[]>(response);

      out.data === undefined ? (this.setting = []) : (this.setting = out.data);

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async updateSettings<T>(dataU: ISetting, id: number): Promise<PostJsonResponse<T>> {
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

      const out = await this.checkResponse<T>(response);

      if (out.status === 200 || out.status === 201) {
        const arr = await this.getSettings();

        arr.data === undefined ? (this.setting = []) : (this.setting = arr.data);
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async deleteSettings<T>(id: number): Promise<PostJsonResponse<T>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.settings}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const out = await this.checkResponse<T>(response);

      if (out.status === 200 || out.status === 201) {
        const arr = await this.getSettings();

        arr.data === undefined ? (this.setting = []) : (this.setting = arr.data);
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async setTransactions<T>(dataU: ITransaction): Promise<PostJsonResponse<T>> {
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

      const out = await this.checkResponse<T>(response);

      if (out.status === 200 || out.status === 201) {
        const arr = await this.getTransactions();

        arr.data === undefined ? (this.transaction = []) : (this.transaction = arr.data);
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async getTransactions<T extends ITransactionReq>(): Promise<PostJsonResponse<T[]>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.users}/${data.id}/transactions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const out = await this.checkResponse<T[]>(response);

      out.data === undefined ? (this.transaction = []) : (this.transaction = out.data);

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async updateTransactions<T>(dataU: ITransaction, id: number): Promise<PostJsonResponse<T>> {
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

      const out = await this.checkResponse<T>(response);

      if (out.status === 200 || out.status === 201) {
        const arr = await this.getTransactions();

        arr.data === undefined ? (this.transaction = []) : (this.transaction = arr.data);
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  async deleteTransactions<T>(id: number): Promise<PostJsonResponse<T>> {
    try {
      const data: IUserData = this.getStorage();
      const response = await fetch(`${baseUrl}${basePath.transactions}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const out = await this.checkResponse<T>(response);

      if (out.status === 200 || out.status === 201) {
        const arr = await this.getTransactions();

        arr.data === undefined ? (this.transaction = []) : (this.transaction = arr.data);
      }

      return out;
    } catch (error) {
      throw new Error(this.checkError(error));
    }
  }

  checkError(error: unknown): string {
    const err = error instanceof Error ? JSON.stringify(error) : '';

    return err;
  }

  async deleteAccount(): Promise<PostJsonResponse<IUser>> {
    const arr1: Array<Promise<PostJsonResponse<ISettingReq>>> = [];
    const setting: ISettingReq[] = this.setting.slice();

    for await (const res of setting) {
      arr1.push(this.deleteSettings<ISettingReq>(res.id));
    }

    const arr2: Array<Promise<PostJsonResponse<ITransactionReq>>> = [];

    const transaction: ITransactionReq[] = this.transaction.slice();

    for await (const res of transaction) {
      arr2.push(this.deleteTransactions<ITransactionReq>(res.id));
    }

    const response = await this.deleteUser<IUser>();

    this.#access = false;

    return response;
  }
  checkAccess(): boolean {
    return this.#access;
  }
}
