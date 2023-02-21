import { plainToClass } from "class-transformer";
import { FighterType } from "../../../model/Dto/FighterType";
import { ApiRequest, RequestMethod } from "../../request";

export async function getFighterTypes(id?: number): Promise<FighterType[]> {
  const URL = id
    ? `/api/fighter-type/all?factionId=${id}`
    : "/api/fighter-type/all";
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();
  return plainToClass(FighterType, response.data as Object[]);
}
