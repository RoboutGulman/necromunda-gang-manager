import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/fighter-weapon/add-profile";

export async function addProfile(
  fighterWeaponId: number,
  profileId: number,
  purchaseWithCredits: boolean
): Promise<boolean> {
  const apiRequest = new ApiRequest();

  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    fighterWeaponId: fighterWeaponId,
    profileId: profileId,
    purchaseWithCredits: purchaseWithCredits,
  });

  const response: any = await apiRequest.send();

  return response.status === 200;
}
