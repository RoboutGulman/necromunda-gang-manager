import {ApiRequest, RequestMethod} from "../../request";

export namespace ApiMethods {
  const URL = "/api/user/authorize";

  export async function authorize(): Promise<object> {
    const apiRequest = new ApiRequest();
    apiRequest.setMethod(RequestMethod.POST);
    apiRequest.setUrl(URL);

    const response: object = await apiRequest.send();

    return {
      authorized: !!response["found"],
      user: !!response["found"] ? {
        id: response["id"],
        name: response["username"],
      } : null,
    };
  }
}