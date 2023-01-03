import { Characteristics } from "../Characteristics";
import {
  Equipment,
  MyTeamPreview,
  TeamPreview,
  Trait,
  User,
  Weapon,
} from "../Types";

export const TeamPreviewExamples: TeamPreview[] = [
  {
    id: "",
    name: "Windraiders",
    faction: "Ash Waste Nomads",
    rating: 0,
    creatorNickname: "serrath",
    time: "2 seconds",
  },
  {
    id: "",
    name: "Belowed of the 4-armed Emperor",
    faction: "Genestealer Cult",
    rating: 145,
    creatorNickname: "Antihero",
    time: "3 minutes",
  },
  {
    id: "",
    name: "HPED-v2",
    faction: "Enforcers",
    rating: 710,
    creatorNickname: "Omenos",
    time: "6 minutes",
  },
];

export const MyTeamPreviewExample: MyTeamPreview[] = [
  {
    name: "my roster 1",
    faction: "ash nomads",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
  {
    name: " my roster 2",
    faction: "orlocks",
  },
];

const RapidFire: Trait = {
  id: "",
  name: "Rapid Fire",
};

const Backstab: Trait = {
  id: "",
  name: "Backstab",
};

/*const Autogun: Weapon = {
  id: "",
  name: "Autogun",
  profiles: [
    {
      name: "Autogun",
      isMelee: false,
      sr: 8,
      lr: 24,
      sm: 1,
      lm: null,
      s: 3,
      ap: null,
      d: 1,
      am: 4,
      traits: [RapidFire]
    }
  ],
  upgrades: [],
  cost: 25,
  rarity: null,
  availibleOnTraidingPost: true
};

const FightingKnife: Weapon = {
  id: "",
  name: "Fighting Knife",
  profiles: [
    {
      name: null,
      isMelee: true,
      sr: null,
      lr: null,
      sm: null,
      lm: null,
      s: null,
      ap: -1,
      d: 1,
      am: null,
      traits: [Backstab]
    }
  ],
  upgrades: [],
  cost: 25,
  rarity: null,
  availibleOnTraidingPost: true
};*/

const FlackArmour: Equipment = {
  id: "",
  name: "Flack armour",
  rarity: 0,
  cost: 15,
};

/*export const Bob: Fighter = {
  id: "",
  name: "Bob",
  rang: "Ganger",
  description: "Just example of fighter",
  characteristics: DefaultGangerCharacteristics,
  injuries: [],
  advances: [],
  weapons: [
    Autogun, FightingKnife
  ],
  equipment: [FlackArmour],
  skills: [],
  status: Status.ACTIVE,
  xp: 0,
  lvl: 1,
  totalCost: 120
};*/

const Vasia: User = {
  id: "",
  name: "Vasia",
};

//export const TeamExample = ()

/*export const TeamExample: TeamView = {
  id: "",
  name: "Raiders",
  fighters: [
    FighterToFighterView(Bob), FighterToFighterView(Bob)
  ],
  faction: "Ash Waste Nomads",
  creator: Vasia
};*/
