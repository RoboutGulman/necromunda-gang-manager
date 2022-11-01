import background1 from "./bw_underhive1.jpg";
import background2 from "./bw_underhive2.jpg";
import background3 from "./underhive_bridge.jpg";
import background4 from "./underhive_dark.jpg";
import background5 from "./underhive1.jpg";
import background6 from "./underhive2.jpg";
import background7 from "./underhive3.jpg";

const Backgrounds = [
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7
];

const randomInt = (min : number, max : number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomBackground = (): string => Backgrounds[randomInt(0, Backgrounds.length - 1)];
