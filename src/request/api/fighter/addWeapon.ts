import { ApiRequest, RequestMethod } from "../../request";

export async function addWeapon(
  fighterId: number,
  weaponId: number,
  purchaseWithCredits: boolean
): Promise<boolean> {
  const apiRequest = new ApiRequest();

  const URL = `/api/fighter/${fighterId}/add-weapon`;

  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    weaponId: weaponId,
    purchaseWithCredits: purchaseWithCredits,
  });

  const response: any = await apiRequest.send();

  return response.status === 200;
}
