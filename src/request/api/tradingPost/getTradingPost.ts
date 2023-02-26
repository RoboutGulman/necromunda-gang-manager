import { plainToClass } from "class-transformer";
import { Market } from "../../../model/Dto/MarketDto";
import { ApiRequest, RequestMethod } from "../../request";

export type GetTradingPostResponse = {
  success: boolean;
  market: Market | undefined;
};

export async function getTradingPost(
  factionId: number,
  maxRarity: number
): Promise<GetTradingPostResponse> {
  const URL = `/api/trading-post?factionId=${factionId}&maxRarity=${maxRarity}`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    market:
      response.status === 200 ? plainToClass(Market, response.data) : undefined,
  };
}
