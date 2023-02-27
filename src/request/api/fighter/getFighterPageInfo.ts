import { plainToClass } from "class-transformer";
import { Fighter } from "../../../model/Dto/Fighter";
import { FighterPageInfo } from "../../../model/Dto/FighterPageInfo";
import { ApiRequest, RequestMethod } from "../../request";
import fighterPageInfoExampleJson from "../../../model/FakeData/FighterPageInfoExample.json";

export type GetFighterPageInfoResponse = {
  success: boolean;
  fighterPageInfo: FighterPageInfo | undefined;
};

export async function getFighterPageInfo(
  id: number
): Promise<GetFighterPageInfoResponse> {
  const URL = `/api/fighter/${id}`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    fighterPageInfo:
      response.status === 200
        ? {
            navigationInfo: plainToClass(
              FighterPageInfo,
              fighterPageInfoExampleJson
            ).navigationInfo,
            fighter: plainToClass(Fighter, response.data.fighter),
          }
        : undefined,
  };
}
