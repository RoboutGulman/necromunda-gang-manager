import {Characteristics} from "./Characteristics";

export function GetTotalCharacteristics(base : Characteristics, modificators : Characteristics[]): Characteristics {
  let result = base;
  modificators.forEach((value : Characteristics) => {
    result.add(value);
  });
  return result;
}
