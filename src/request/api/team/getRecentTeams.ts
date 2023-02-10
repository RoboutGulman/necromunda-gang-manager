import { plainToClass } from "class-transformer";
import { RecentTeamsDto } from "../../../model/Dto/ReсentTeamsDto";
import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/team/recent";

export async function getRecentTeams(): Promise<RecentTeamsDto> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return plainToClass(RecentTeamsDto, response.data);
}
