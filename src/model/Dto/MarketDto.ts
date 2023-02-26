export class Market {
  weapons!: {
    name: string;
    items: WeaponMarketItem[];
  }[];
  equipment!: {
    name: string;
    items: EquipmentMarketItem[];
  }[];
}

export type WeaponMarketItem = {
  id: number;
  name: string;
  cost: number;
  rarity: number;
  isFactionWeapon: boolean;
};

export type EquipmentMarketItem = {
  id: number;
  name: string;
  cost: number;
  rarity: number;
  isFactionEquipment: boolean;
};
