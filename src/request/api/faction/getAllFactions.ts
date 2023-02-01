import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/faction/all";

export type GetAllFactionsResult = {
  id: number;
  name: string;
  imageUrl: string;
}[];

export async function getAllFactions(): Promise<GetAllFactionsResult> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return response.data.map((faction: any) => ({
    id: faction["id"],
    name: faction["name"],
    imageUrl: faction["image_url"],
  }));
}
