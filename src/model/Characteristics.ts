export class Characteristics {
  m !: number;
  ws !: number;
  bs !: number;
  s !: number;
  t !: number;
  w !: number;
  i !: number;
  a !: number;
  ld !: number;
  cl !: number;
  wp !: number;
  int !: number;
  constructor(m : number, ws : number, bs : number, s : number, t : number, w : number, i : number, a : number, ld : number, cl : number, wp : number, int : number) {
    this.m = m;
    this.ws = ws;
    this.bs = bs;
    this.s = s;
    this.t = t;
    this.w = w;
    this.i = i;
    this.a = a;
    this.ld = ld;
    this.cl = cl;
    this.wp = wp;
    this.int = int;
  }
  add(value : Characteristics): void {
    this.m += value.m;
    this.ws += value.ws;
    this.bs += value.bs;
    this.s += value.s;
    this.t += value.t;
    this.w += value.w;
    this.i += value.i;
    this.a += value.a;
    this.ld += value.ld;
    this.cl += value.cl;
    this.wp += value.wp;
    this.int += value.int;
  }
}
