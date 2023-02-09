import { plainToClass } from "class-transformer";
import { RecentTeams } from "../../../model/Dto/ResentTeams";
import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/team/recent";

export async function getResentTeams(): Promise<RecentTeams> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return plainToClass(RecentTeams, response.data);
}
