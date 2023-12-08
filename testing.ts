import { BinMethods } from "./Bin-methods";
import { DimensionalPosition, Layer } from "./Interfaces";

let dimensionalPositionTest: DimensionalPosition = {
  anchor: { x: 0, y: 1 },
  length: 2,
  width: 3,
  height: 2,
};

let testLayer: Layer = {
  surface: BinMethods.createBoolMatrix(3, 3, true),
  heigth: 2,
};

console.log(
  BinMethods.freeOrAllocSpace(testLayer, dimensionalPositionTest, "alloc")
);
