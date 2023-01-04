export enum RequestMethod {
  GET = "GET",
  POST = "POST",
}

export class ApiRequest {
  _method: RequestMethod = RequestMethod.GET;
  _url: string = "";
  _body: string = "";

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
        "Content-Type": "application/json",
      },
      body: this._method === RequestMethod.POST ? this._body : undefined,
    });

    return response.json();
  }
}
