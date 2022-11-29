import {Characteristics} from "./Characteristics";

export class Trait {
  id !: string;
  name !: string;
}

export class Upgrade {
  id !: string;
  name !: string;
}

export class WeaponProfile {
  name !: string | null;
  isMelee !: boolean;
  sr !: number | null;
  lr !: number | null;
  sm !: number | null;
  lm !: number | null;
  s !: number | null;
  ap !: number | null;
  d !: number | null;
  am !: number | null;
  traits !: Trait[];
}

export class Weapon {
  id !: string;
  name !: string;
  profiles !: WeaponProfile[];
  upgrades !: Upgrade[];
  cost !: number;
  rarity !: number | null;
  availibleOnTraidingPost !: boolean;
}

export class Equipment {
  id !: string | null;
  name !: string;
  rarity !: number | null;
  cost !: number;
}

class Skill {
  id !: string;
  name !: string;
}

export enum Status {
  ACTIVE,
  DEAD,
  ON_RECOVERY
}

export class FighterView {
  id !: string;
  name !: string;
  rang !: string;
  totalCharacteristics !: Characteristics;
  weapons !: Weapon[];
  equipment !: Equipment[];
  skills !: Skill[];
  status !: Status;
  totalCost !: number;
  xp !: number;
}

export class User {
  id !: string;
  name !: string;
}

export class TeamView {
  id !: string;
  name !: string;
  fighters !: FighterView[];
  faction !: string;
  creator !: User;
}
