import { Characteristics } from "./Characteristics";
import {
  Equipment,
  Fighter,
  Status,
  Team,
  TeamPreview,
  Trait,
  User,
  Weapon
} from "./Types";

export const TeamPreviewExamples: TeamPreview[] = [
  {
    name: "Windraiders",
    faction: "Ash Waste Nomads",
    rating: 0,
    creatorNickname: "serrath",
    time: "2 seconds"
  }, {
    name: "Belowed of the 4-armed Emperor",
    faction: "Genestealer Cult",
    rating: 145,
    creatorNickname: "Antihero",
    time: "3 minutes"
  }, {
    name: "HPED-v2",
    faction: "Enforcers",
    rating: 710,
    creatorNickname: "Omenos",
    time: "6 minutes"
  }
];

const DefaultGangerCharacteristics = new Characteristics(5, 4, 4, 3, 3, 1, 4, 1, 7, 7, 7, 7);

const ChampionCharacteristicsExample = new Characteristics(5, 3, 4, 4, 3, 2, 3, 1, 5, 6, 7, 8);

const RapidFire: Trait = {
  name: "Rapid Fire"
};

const Autogun: Weapon = {
  name: "Autogun",
  sr: 8,
  lr: 24,
  sm: 1,
  lm: 0,
  s: 3,
  ap: 0,
  d: 1,
  am: 4,
  traits: [RapidFire],
  upgrades: [],
  cost: 25,
  rarity: 0,
  availibleOnTraidingPost: true
};

const FlackArmour: Equipment = {
  name: "Flack armour",
  rarity: 0,
  cost: 15
};

const Bob: Fighter = {
  name: "Bob",
  rang: "Ganger",
  description: "Just example of fighter",
  characteristics: DefaultGangerCharacteristics,
  injuries: [],
  advances: [],
  weapons: [Autogun],
  equipment: [FlackArmour],
  skills: [],
  status: Status.ACTIVE,
  xp: 0,
  lvl: 1,
  totalCost: 120
};

const Vasia: User = {
  name: "Vasia"
};

export const TeamExample: Team = {
  name: "Raiders",
  fighters: [Bob],
  faction: "Ash Waste Nomads",
  creator: Vasia
};
