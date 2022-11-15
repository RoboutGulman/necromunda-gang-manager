import {Characteristics} from "./Characteristics";
import {Fighter, FighterView} from "./Types";

function GetTotalCharacteristics(base : Characteristics, modificators : Characteristics[]): Characteristics {
  let result = base;
  modificators.map((value : Characteristics) => {
    result.add(value);
  });
  return result;
}

export function FighterToFighterView(fighter : Fighter): FighterView {
  let totalModificators = fighter.advances.map((value) => value.characteristicsMods).concat(fighter.injuries.map((value) => value.characteristicsMods));
  return {
    name: fighter.name,
    rang: fighter.rang,
    totalCharacteristics: GetTotalCharacteristics(fighter.characteristics, totalModificators),
    weapons: fighter.weapons,
    equipment: fighter.equipment,
    skills: fighter.skills,
    status: fighter.status,
    totalCost: fighter.totalCost
  };
}
