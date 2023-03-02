import { Characteristics } from "../Characteristics";
import {
  Advance,
  Equipment,
  Injury,
  Skill,
  SpecialRule,
  Status,
  Weapon,
  WeaponUpgrade,
} from "../Types";

export class Fighter {
  id!: number;
  teamId!: number;
  isDead!: boolean;
  name!: string;
  rang!: string;
  description!: string;
  totalCost!: number;
  userCostModifier!: number;
  xp!: number;
  lvl!: number;
  status!: Status | null;
  //baseCharacteristics!: Characteristics;
  totalCharacteristics!: Characteristics;
  totalInjuriesCharacteristics!: Characteristics;
  totalAdvancesCharacteristics!: Characteristics;
  userCharacteristicsModificators!: Characteristics;
  injuries!: Injury[];
  advances!: Advance[];
  weapons!: FighterWeapon[];
  equipment!: Equipment[];
  skills!: Skill[];
  //specialRules!: SpecialRule[];
}

export type FighterWeapon = {
  id: number;
  fighterWeaponId: number;
  description: string;
  name: string;
  cost: number;
  upgrades: WeaponUpgrade[];
};
