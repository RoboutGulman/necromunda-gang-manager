import {Characteristics} from "./Characteristics";
import {FighterToFighterView} from "./FighterToFighterView";
import {
  Equipment,
  Fighter,
  Status,
  TeamView,
  TeamPreview,
  Trait,
  User,
  Weapon
} from "./Types";

export const TeamPreviewExamples: TeamPreview[] = [
  {
    id: "",
    name: "Windraiders",
    faction: "Ash Waste Nomads",
    rating: 0,
    creatorNickname: "serrath",
    time: "2 seconds"
  }, {
    id: "",
    name: "Belowed of the 4-armed Emperor",
    faction: "Genestealer Cult",
    rating: 145,
    creatorNickname: "Antihero",
    time: "3 minutes"
  }, {
    id: "",
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
  id: "",
  name: "Rapid Fire"
};

const Backstab: Trait = {
  id: "",
  name: "Backstab"
};

const Autogun: Weapon = {
  id: "",
  name: "Autogun",
  profiles: [
    {
      name: null,
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
};

const FlackArmour: Equipment = {
  id: "",
  name: "Flack armour",
  rarity: 0,
  cost: 15
};

export const Bob: Fighter = {
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
};

const Vasia: User = {
  id: "",
  name: "Vasia"
};

export const TeamExample: TeamView = {
  id: "",
  name: "Raiders",
  fighters: [
    FighterToFighterView(Bob), FighterToFighterView(Bob)
  ],
  faction: "Ash Waste Nomads",
  creator: Vasia
};
