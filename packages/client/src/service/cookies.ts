export enum COOKIES {
  ACCEPT,
  DECLINE,
}

type InternalCookiePermission = {
  permission: boolean;
};

export type CookiePermission = {
  permission: COOKIES.ACCEPT | COOKIES.DECLINE;
};

export class CookieService {
  private path = '/api/cookies';
  constructor() {}
  getPermission(): Promise<CookiePermission> {
    return fetch(this.path, {
      method: 'GET',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return {
            permission: false,
          };
        }
      })
      .then((res: InternalCookiePermission) => this.processPermission(res));
  }
  processPermission(model: InternalCookiePermission): CookiePermission {
    return {
      permission: model.permission ? COOKIES.ACCEPT : COOKIES.DECLINE,
    };
  }
}
