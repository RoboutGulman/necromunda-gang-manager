import { ApiRequest, RequestMethod } from "../../request";

export async function removeWeapon(
  fighterId: number,
  weaponId: number,
  refundMode: number
): Promise<boolean> {
    
  const URL = `/api/fighter/${fighterId}/remove-weapon`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.DELETE);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    fighterWeaponId: weaponId,
    refundMode: refundMode,
  });

  return (await apiRequest.send()).status === 200;
}
