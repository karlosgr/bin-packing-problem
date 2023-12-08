import {
  DimensionalPosition,
  FitValidationStrategy,
  FreeOrAlloc,
  Layer,
  ThreeDimensionalObject,
} from "./Interfaces";

export class BinMethods {
  private static rotateInXY(object: ThreeDimensionalObject) {
    let rotateObject: ThreeDimensionalObject = {
      length: object.width,
      width: object.length,
      height: object.height,
      weight: object.weight,
    };

    return rotateObject;
  }

  private static validFitPositionByArea(
    layer: Layer,
    position: DimensionalPosition,
    maxHeight: number
  ): boolean {
    for (let i = position.anchor.x; i < position.length; i++) {
      for (let j = position.anchor.y; j < position.width; j++) {
        if (!layer[i][j]) return false;
      }
    }
    return position.height <= maxHeight;
  }

  public static createBoolMatrix(length: number, width: number, fill: boolean) {
    return new Array<Array<boolean>>(length)
      .fill([])
      .map((values) => new Array<boolean>(width).fill(fill));
  }

  //check this method because his implementation is diferent from de original
  public static freeOrAllocSpace(
    layer: Layer,
    position: DimensionalPosition,
    options: FreeOrAlloc
  ): Layer {
    let newLayer: Layer = {
      surface: new Array<Array<boolean>>(layer.surface.length)
        .fill([])
        .map((values) => new Array(layer.surface[0].length).fill(false)),
      heigth:
        options === "alloc"
          ? layer.heigth + position.height
          : layer.heigth - position.height,
    };

    for (let i = position.anchor.x; i < position.length; i++) {
      for (let j = position.anchor.y; j < position.width; j++) {
        newLayer[i][j] = true;
        layer[i][j] = false;
      }
    }

    return newLayer;
  }

  public static validateFitPosition(
    layer: Layer,
    position: DimensionalPosition,
    fitStrategy: FitValidationStrategy,
    maxHeight: number
  ): boolean {
    switch (fitStrategy) {
      case "area":
        return this.validFitPositionByArea(layer, position, maxHeight);

      case "perimeter":
        return false;

      default:
        throw new Error("no one valid strategy was provided");
    }
  }

  public static allPosiblePositions(
    object: ThreeDimensionalObject,
    layer: Layer,
    maxHeight: number,
    withRotationXY: boolean
  ): Array<DimensionalPosition> {
    let allPositions: Array<DimensionalPosition> = [];

    for (let i = 0; i < layer.surface.length - object.length; i++) {
      for (let j = 0; j < layer.surface[0].length - object.width; j++) {
        let position: DimensionalPosition = {
          anchor: { x: i, y: j },
          length: object.length,
          width: object.width,
          height: object.height,
        };

        if (this.validateFitPosition(layer, position, "area", maxHeight)) {
          allPositions.push(position);
        }
      }
    }
    if (withRotationXY) {
      allPositions.push(
        ...this.allPosiblePositions(
          this.rotateInXY(object),
          layer,
          maxHeight,
          false
        )
      );
    }
    return allPositions;
  }

  public static layerUnion(layer1: Layer, layer2: Layer): Layer {
    let unionLayer: Layer = {
      surface: this.createBoolMatrix(
        layer1.surface.length,
        layer1.surface[0].length,
        false
      ),
      heigth: layer1.heigth,
    };
    for (let i = 0; i < layer1.surface.length; i++) {
      for (let j = 0; j < layer1.surface[0].length; j++) {
        unionLayer.surface[i][j] = layer1.surface[i][j] || layer2.surface[i][j];
      }
    }
    return unionLayer;
  }

  public static addLayers(layer: Layer, layers: Array<Layer>): void {
    for (let index = 0; index < layers.length; index++) {
      if (layers[index].heigth == layer.heigth) {
        layers[index] = this.layerUnion(layers[index], layer);
        return;
      }
    }
  }
}
