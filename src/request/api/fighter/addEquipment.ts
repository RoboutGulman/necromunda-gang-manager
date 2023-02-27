import { ApiRequest, RequestMethod } from "../../request";

export async function addEquipment(
  fighterId: number,
  equipmentId: number,
  purchaseWithCredits: boolean
): Promise<boolean> {
  const apiRequest = new ApiRequest();

  const URL = `/api/fighter/${fighterId}/add-equipment`;

  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    equipmentId: equipmentId,
    purchaseWithCredits: purchaseWithCredits,
  });

  const response: any = await apiRequest.send();

  return response.status === 200;
}
