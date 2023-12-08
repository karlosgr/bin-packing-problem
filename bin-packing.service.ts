import { BinMethods } from "./Bin-methods";
import { BinPackingBruteForce } from "./Bin-packing-brute-force";
import {
  BinPackingMethod,
  Container,
  ThreeDimensionalObject,
} from "./Interfaces";

export class BinPackingService {
  public BinPacking(
    container: Container,
    objects: Array<ThreeDimensionalObject>,
    method: BinPackingMethod
  ): boolean {
    switch (method) {
      case "bruteForce":
        return BinPackingBruteForce(
          [
            {
              surface: BinMethods.createBoolMatrix(
                container.length,
                container.width,
                true
              ),
              heigth: 0,
            },
          ],
          objects,
          false,
          container.height
        );
      case "FFDA":
        return true;
    }
  }
}
