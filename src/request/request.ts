import {getCookie} from "../utils/getCookie";

type RequestParams = {
  method: string;
  url: string;
  body: object;
  responseType?: string;
};

export async function request({
  method,
  url,
  body,
  responseType = "json"
} : RequestParams): Promise<any> {
  const authToken: string | null = getCookie("X_AUTH_TOKEN");
  const authTokenHeader = {
    X_AUTH_TOKEN: authToken ?? ""
  };

  let response = await fetch(url, {
    method: method,
    headers: {
      ...authTokenHeader,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  let data;
  switch (responseType) {
    case "json":
      data = response.json();
      break;
    default:
      data = response.text();
  }

  return data;
}
