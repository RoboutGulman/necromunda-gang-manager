export class Market {
  withRarity!: boolean;
  categories!: Category[];
}

export type Category = {
  name: string;
  isEquipment: boolean;
  items: {
    id: number;
    name: string;
    cost: string;
    rarity?: number;
  }[];
};
