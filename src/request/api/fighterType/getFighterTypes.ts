import { plainToClass } from "class-transformer";
import { FighterType } from "../../../model/Dto/FighterType";
import { ApiRequest, RequestMethod } from "../../request";

export async function getFighterTypes(id?: number): Promise<FighterType[]> {
  //TODO: понять, почему при относительном пути он подставляет туда roster
  const URL = id
    ? `https://www.ngm.local/api/fighter-type/all?factionId=${id}`
    : "https://www.ngm.local/api/fighter-type/all";
  // ? `api/fighter-type/all?factionId=${id}`
  // : "api/fighter-type/all";
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();
  console.log(response.data);
  return plainToClass(FighterType, response.data as Object[]);
}
