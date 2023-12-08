export type FreeOrAlloc = "alloc" | "free";
export type FitValidationStrategy = "area" | "perimeter";
export type BinPackingMethod = "bruteForce" | "FFDA";

export interface Anchor {
  x: number;
  y: number;
}

export interface Layer {
  surface: Array<Array<boolean>>;
  heigth: number;
}

export interface ThreeDimensionalObjectProps {
  length: number;
  width: number;
  height: number;
}

export interface ThreeDimensionalObject extends ThreeDimensionalObjectProps {
  weight: number;
}

export interface DimensionalPosition extends ThreeDimensionalObjectProps {
  anchor: Anchor;
}

export interface Container extends ThreeDimensionalObjectProps {
  maxWeight: number;
}
