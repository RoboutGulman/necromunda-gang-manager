import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/fighter/create";

export type CreateFighterRequest = {
  teamId: number;
  name: string;
  fighterTypeId: number;
  purchaseWithCredits: boolean;
};

export async function createFighter({
  teamId,
  name,
  fighterTypeId,
  purchaseWithCredits,
}: CreateFighterRequest): Promise<boolean> {
  const apiRequest = new ApiRequest();

  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    teamId: teamId,
    name: name,
    fighterTypeId: fighterTypeId,
    purchaseWithCredits: purchaseWithCredits,
  });

  const response: any = await apiRequest.send();

  return response.status === 200;
}
