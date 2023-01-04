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
  id!: string;
  name!: string;
  rang!: string;
  description!: string;
  baseCharacteristics!: Characteristics;
  totalCharacteristics!: Characteristics;
  totalInjuriesCharacteristics!: Characteristics;
  totalAdvancesCharacteristics!: Characteristics;
  userCharacteristicsModificators!: Characteristics;
  injuries!: Injury[];
  advances!: Advance[];
  weapons!: Weapon[];
  equipment!: Equipment[];
  skills!: Skill[];
  specialRules!: SpecialRule[];
  status!: Status | null;
  xp!: number;
  lvl!: number;
  totalCost!: number;
}
