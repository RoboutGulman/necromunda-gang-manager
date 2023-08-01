import { WeaponMarketItem, EquipmentMarketItem } from "./Dto/MarketDto";

export class MarketItem {
  public id: number = 0;
  public name: string = "";
  public cost: number = 0;
  public rarity: number = 0;
  public isFactionItem: boolean = false;

  public static fromWeapon(init: WeaponMarketItem): MarketItem {
    const item = new MarketItem();
    item.id = init.id;
    item.name = init.name;
    item.cost = init.cost;
    item.rarity = init.rarity;
    item.isFactionItem = init.isFactionWeapon;
    return item;
  }

  public static fromEquipment(init: EquipmentMarketItem): MarketItem {
    const item = new MarketItem();
    item.id = init.id;
    item.name = init.name;
    item.cost = init.cost;
    item.rarity = init.rarity;
    item.isFactionItem = init.isFactionEquipment;
    return item;
  }
}
