import { ApiRequest, RequestMethod } from "../../request";

export async function removeEquipment(
  fighterId: number,
  equipmentId: number,
  refundMode: number
): Promise<boolean> {
    
  const URL = `/api/fighter/${fighterId}/remove-equipment`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.DELETE);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    equipmentId: equipmentId,
    refundMode: refundMode,
  });

  return (await apiRequest.send()).status === 200;
}
