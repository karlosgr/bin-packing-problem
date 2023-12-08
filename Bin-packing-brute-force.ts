import { BinMethods } from "./Bin-methods";
import {
  DimensionalPosition,
  Layer,
  ThreeDimensionalObject,
} from "./Interfaces";

export function BinPackingBruteForce(
  layers: Array<Layer>,
  objects: Array<ThreeDimensionalObject>,
  withRotationXY: boolean,
  maxHeight: number
): boolean {
  for (const object of objects) {
    let allPositions: Array<{
      layer: Layer;
      positions: DimensionalPosition[];
    }> = [];
    for (const layer of layers) {
      let objectPositions = BinMethods.allPosiblePositions(
        object,
        layer,
        maxHeight,
        withRotationXY
      );
      if (objectPositions.length > 0) {
        allPositions.push({ layer: layer, positions: objectPositions });
      }
    }
    if (allPositions.length == 0) continue;

    objects.splice(objects.indexOf(object), 1);

    if (objects.length == 0) return true;

    for (const layerPositions of allPositions) {
      for (const position of layerPositions.positions) {
        let newLayer = BinMethods.freeOrAllocSpace(
          layerPositions.layer,
          position,
          "alloc"
        );
        BinMethods.addLayers(newLayer, layers);
        if (BinPackingBruteForce(layers, objects, withRotationXY, maxHeight))
          return true;

        BinMethods.freeOrAllocSpace(
          layers[layers.indexOf(newLayer)],
          position,
          "free"
        );
      }
    }
    objects.push(object);
  }

  return false;
}
