import { Characteristics } from "../Characteristics";
import {
  Advance,
  Equipment,
  Injury,
  Skill,
  SpecialRule,
  Status,
  Weapon,
} from "../Types";

export class Fighter {
  id!: number;
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
  weapons!: Weapon[];
  equipment!: Equipment[];
  skills!: Skill[];
  //specialRules!: SpecialRule[];
}
