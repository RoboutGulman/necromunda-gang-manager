import { Characteristics } from "../model/Characteristics";

export function GetCharacteristicView(
  chars: Characteristics,
  xp?: number,
  lvl?: number
): string[] {
  let result = [
    chars.m + '"',
    chars.ws + "+",
    chars.bs + "+",
    chars.s + "",
    chars.t + "",
    chars.w + "",
    chars.i + "+",
    chars.a + "",
    chars.ld + "+",
    chars.cl + "+",
    chars.wp + "+",
    chars.int + "+",
  ];
  if (xp != undefined) result.push(xp + "");
  if (lvl != undefined) result.push(lvl + "");
  return result;
}
