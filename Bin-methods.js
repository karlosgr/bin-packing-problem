"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinMethods = void 0;
var BinMethods = /** @class */ (function () {
    function BinMethods() {
    }
    BinMethods.rotateInXY = function (object) {
        var rotateObject = {
            length: object.width,
            width: object.length,
            height: object.height,
            weight: object.weight,
        };
        return rotateObject;
    };
    BinMethods.validFitPositionByArea = function (layer, position, maxHeight) {
        for (var i = position.anchor.x; i < position.length; i++) {
            for (var j = position.anchor.y; j < position.width; j++) {
                if (!layer[i][j])
                    return false;
            }
        }
        return position.height <= maxHeight;
    };
    BinMethods.createBoolMatrix = function (length, width, fill) {
        return new Array(length)
            .fill([])
            .map(function (values) { return new Array(width).fill(fill); });
    };
    //check this method because his implementation is diferent from de original
    BinMethods.freeOrAllocSpace = function (layer, position, options) {
        var newLayer = {
            surface: new Array(layer.surface.length)
                .fill([])
                .map(function (values) { return new Array(layer.surface[0].length).fill(false); }),
            heigth: options === "alloc"
                ? layer.heigth + position.height
                : layer.heigth - position.height,
        };
        for (var i = position.anchor.x; i < position.length; i++) {
            for (var j = position.anchor.y; j < position.width; j++) {
                newLayer[i][j] = true;
                layer[i][j] = false;
            }
        }
        return newLayer;
    };
    BinMethods.validateFitPosition = function (layer, position, fitStrategy, maxHeight) {
        switch (fitStrategy) {
            case "area":
                return this.validFitPositionByArea(layer, position, maxHeight);
            case "perimeter":
                return false;
            default:
                throw new Error("no one valid strategy was provided");
        }
    };
    BinMethods.allPosiblePositions = function (object, layer, maxHeight, withRotationXY) {
        var allPositions = [];
        for (var i = 0; i < layer.surface.length - object.length; i++) {
            for (var j = 0; j < layer.surface[0].length - object.width; j++) {
                var position = {
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
            allPositions.push.apply(allPositions, this.allPosiblePositions(this.rotateInXY(object), layer, maxHeight, false));
        }
        return allPositions;
    };
    BinMethods.layerUnion = function (layer1, layer2) {
        var unionLayer = {
            surface: this.createBoolMatrix(layer1.surface.length, layer1.surface[0].length, false),
            heigth: layer1.heigth,
        };
        for (var i = 0; i < layer1.surface.length; i++) {
            for (var j = 0; j < layer1.surface[0].length; j++) {
                unionLayer.surface[i][j] = layer1.surface[i][j] || layer2.surface[i][j];
            }
        }
        return unionLayer;
    };
    BinMethods.addLayers = function (layer, layers) {
        for (var index = 0; index < layers.length; index++) {
            if (layers[index].heigth == layer.heigth) {
                layers[index] = this.layerUnion(layers[index], layer);
                return;
            }
        }
    };
    return BinMethods;
}());
exports.BinMethods = BinMethods;
