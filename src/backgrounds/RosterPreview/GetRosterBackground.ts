import ashWasteNomads from "./ash-waste-nomads.jpg";
import cawdorGotu from "./cawdor-gotu.jpg";
import cawdorHof from "cawdor-hof.jpg";
import chaosCult from "./chaos-cult.jpg";
import corpseCrinderCult from "./corpse-grinder-cult.jpg";
import delaque from "./delaque-hos.jpg";
import enforcers from "./enforcers.jpg";
import escher from "./escher-gotu.jpg";
import genestealerCult from "./genestealer-cult.jpg";
import goliath from "./goliath-gotu.jpg";
import orlock from "./orlock-gotu.jpg";
import vanSaar from "./van-saar-gotu.jpg";
import slaveOgryn from "./slave-ogryn.jpg";
import venators from "./venators.jpg";

const Backgrounds = [
  ashWasteNomads,
  cawdorGotu,
  chaosCult,
  corpseCrinderCult,
  delaque,
  enforcers,
  escher,
  genestealerCult,
  goliath,
  orlock,
  vanSaar,
  slaveOgryn,
  venators
];

const randomInt = (min : number, max : number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRosterBackground = (gangName : string): string => Backgrounds[randomInt(0, Backgrounds.length - 1)];
