export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export class ApiRequest {
  _method: RequestMethod = RequestMethod.GET;
  _url: string = "";
  _body: string | undefined = undefined;

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
    let response = await fetch(window.location.origin + this._url, {
      method: this._method,
      headers: {
        "Content-Type": "application/json",
      },
      body: this._body,
    });

    let responseJson: any | undefined = undefined;

    try {
      responseJson = await response.json();
    } catch {}

    return {
      status: response.status,
      data: responseJson,
    };
  }
}
