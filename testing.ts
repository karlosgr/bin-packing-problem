import { BinMethods } from "./Bin-methods";
import {
  DimensionalPosition,
  Layer,
  ThreeDimensionalObject,
} from "./Interfaces";

function PrintDimensionalPositionInLayer(
  surface: Array<Array<boolean>>,
  position: DimensionalPosition
) {
  for (
    let i = position.anchor.x;
    i < position.anchor.x + position.length;
    i++
  ) {
    for (
      let j = position.anchor.y;
      j < position.anchor.y + position.width;
      j++
    ) {
      surface[i][j] = true;
    }
  }
  console.log(surface);
}

let testObject1: ThreeDimensionalObject = {
  length: 1,
  width: 2,
  height: 2,
  weight: 3,
};

let dimensionalPositionTest: DimensionalPosition = {
  anchor: { x: 0, y: 0 },
  length: 2,
  width: 3,
  height: 2,
};

let testLayer: Layer = {
  surface: BinMethods.createBoolMatrix(3, 3, false),
  heigth: 2,
};

let testLayer2: Layer = {
  surface: BinMethods.createBoolMatrix(3, 3, false),
  heigth: 2,
};

let testLayer3: Layer = {
  surface: BinMethods.createBoolMatrix(3, 3, false),
  heigth: 3,
};

for (let i = 0; i < 1; i++) {
  for (let j = 0; j < 2; j++) {
    testLayer.surface[i][j] = true;
  }
}

for (let i = 2; i < 3; i++) {
  for (let j = 1; j < 3; j++) {
    testLayer2.surface[i][j] = true;
  }
}

let array: DimensionalPosition[] = BinMethods.allPosiblePositions(
  testObject1,
  testLayer,
  5,
  true
);
let layers = [testLayer2, testLayer3];
BinMethods.addLayers(testLayer, layers);
layers.forEach((value) => {
  console.log(value);
});
