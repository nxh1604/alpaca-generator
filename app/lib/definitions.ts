export interface Alpaca {
  leg: string[];
  ears: string[];
  hair: string[];
  eyes: string[];
  mouth: string[];
  nose: string[];
  neck: string[];
  accessories: string[];
}

export interface AlpacaPart {
  key: keyof Alpaca;
  value: string;
}

export interface Backgrounds {
  blue: number[];
  darkblue: number[];
  green: number[];
  grey: number[];
  red: number[];
  yellow: number[];
}

export interface Background {
  color: keyof Backgrounds;
  value: number;
}
