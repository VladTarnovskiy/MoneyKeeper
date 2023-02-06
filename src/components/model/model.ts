import type { IRes, IUser, IUserData } from '@/components/model/types';

const baseUrl = 'http://localhost:3000';
const basePath = {
  register: '/register',
  login: '/login',
  settings: '/settings',
  transactions: '/transactions',
  users: '/users',
};

export class Model {
  async registerUser(user: IUser): Promise<IRes> {
    const out: { data: IUserData; status: number } = {
      data: {
        accessToken: '',
        user: {
          email: '',
          id: 0,
        },
      },
      status: 0,
    };

    try {
      const response: Response = await fetch(`${baseUrl}${basePath.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      out.status = response.status;
      out.data = (await response.json()) as Awaited<Promise<IUserData>>;

      return out;
    } catch (error) {
      return out;
    }
  }

  async loginUser(user: IUser): Promise<IRes> {
    const out: { data: IUserData; status: number } = {
      data: {
        accessToken: '',
        user: {
          email: '',
          id: 0,
        },
      },
      status: 0,
    };

    try {
      const response: Response = await fetch(`${baseUrl}${basePath.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      out.status = response.status;
      out.data = (await response.json()) as Awaited<Promise<IUserData>>;

      return out;
    } catch (error) {
      return out;
    }
  }

  async getUser(user: IUserData): Promise<{
    data: IUser;
    status: number;
  }> {
    const out: { data: IUser; status: number } = {
      data: {
        email: '',
        password: '',
        id: 0,
      },
      status: 0,
    };

    try {
      const response: Response = await fetch(`${baseUrl}${basePath.users}/${user.user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      out.status = response.status;
      out.data = (await response.json()) as Awaited<Promise<IUser>>;

      return out;
    } catch (error) {
      return out;
    }
  }

  async updateUser(user: IUserData): Promise<{
    data: IUser;
    status: number;
  }> {
    const out: { data: IUser; status: number } = {
      data: {
        email: '',
        password: '',
        id: 0,
      },
      status: 0,
    };

    try {
      const response: Response = await fetch(`${baseUrl}${basePath.users}/${user.user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      out.status = response.status;
      out.data = (await response.json()) as Awaited<Promise<IUser>>;

      return out;
    } catch (error: unknown) {
      new Error(this.checkError(error));

      return out;
    }
  }

  checkError(error: unknown): string {
    const err = error instanceof Error ? JSON.stringify(error) : '';

    return err;
  }
}
