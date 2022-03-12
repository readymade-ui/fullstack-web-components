import { SESSION } from './session';

export type LoginRequest = {
  username: string;
  password: string;
};

export type InternalLoginResponse = {
  status: number;
};

export type LoginResponse = {
  session: SESSION.OPEN | SESSION.CLOSED;
};

export class LoginService {
  private path = '/api/auth';
  constructor() {}
  login(request: LoginRequest): Promise<LoginResponse> {
    return fetch(this.path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then((res) => {
      return this.processLoginResponse(res);
    });
  }
  processLoginResponse(res: InternalLoginResponse): LoginResponse {
    return {
      session: res.status === 200 ? SESSION.OPEN : SESSION.CLOSED,
    };
  }
}
