import { plainToClass } from "class-transformer";
import { Fighter } from "../../../model/Dto/Fighter";
import { ApiRequest, RequestMethod } from "../../request";

type GetFighterResponse = {
  success: boolean;
  fighter: Fighter | undefined;
};

export async function getFighter(id: number): Promise<GetFighterResponse> {
  const URL = `/api/fighter/${id}`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    fighter:
      response.status === 200
        ? plainToClass(Fighter, response.data.fighter)
        : undefined,
  };
}
