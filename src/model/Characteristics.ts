export class Characteristics {
  public m: number = 0;
  public ws: number = 0;
  public bs: number = 0;
  public s: number = 0;
  public t: number = 0;
  public w: number = 0;
  public i: number = 0;
  public a: number = 0;
  public ld: number = 0;
  public cl: number = 0;
  public wp: number = 0;
  public int: number = 0;

  public constructor(init?: Partial<Characteristics>) {
    Object.assign(this, init);
  }

  add(value: Characteristics): void {
    if (value.m !== undefined) this.m += value.m;
    if (value.ws !== undefined) this.ws += value.ws;
    if (value.bs !== undefined) this.bs += value.bs;
    if (value.s !== undefined) this.s += value.s;
    if (value.t !== undefined) this.t += value.t;
    if (value.w !== undefined) this.w += value.w;
    if (value.i !== undefined) this.i += value.i;
    if (value.a !== undefined) this.a += value.a;
    if (value.ld !== undefined) this.ld += value.ld;
    if (value.cl !== undefined) this.cl += value.cl;
    if (value.wp !== undefined) this.wp += value.wp;
    if (value.int !== undefined) this.int += value.int;
  }
}

export const CharacteristicsNames: string[] = [
  "M",
  "WS",
  "BS",
  "S",
  "T",
  "W",
  "I",
  "A",
  "Ld",
  "Cl",
  "Wp",
  "Int",
  "Exp",
  "Lvl",
];
