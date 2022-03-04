export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  status: number;
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
  processLoginResponse(res: LoginResponse): LoginResponse {
    return {
      status: res.status,
    };
  }
}
