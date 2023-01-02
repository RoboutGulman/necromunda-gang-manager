import {getCookie} from "../utils/getCookie";

export const AuthTokenCookie = "X-Auth-Token";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

export class ApiRequest {
  _method: RequestMethod = RequestMethod.GET;
  _url: string = "";
  _body: string = "";
  _headers: any = {};
  _authToken: string|null;

  constructor() {
    this._authToken = getCookie(AuthTokenCookie)
    if (this._authToken !== null) {
      this._headers[AuthTokenCookie] = this._authToken;
    }
  }

  setMethod(method: RequestMethod) {
    this._method = method;
  }

  setUrl(url: string) {
    this._url = url;
  }

  setJsonBody(data: any) {
    this._body = JSON.stringify(data);
  }

  async send(): Promise<any> {
    if (this._url !== "") {
      return await this._fetch();
    } else {
      console.warn("Request url not specified");
      return null;
    }
  }

  async _fetch(): Promise<any> {
    let response = await fetch(this._url, {
      method: this._method,
      headers: {
        ...this._headers,
        "Content-Type": "application/json"
      },
      body: this._body,
    });

    return response.json();
  }
}
