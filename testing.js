"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bin_methods_1 = require("./Bin-methods");
function PrintDimensionalPositionInLayer(surface, position) {
    for (var i = position.anchor.x; i < position.anchor.x + position.length; i++) {
        for (var j = position.anchor.y; j < position.anchor.y + position.width; j++) {
            surface[i][j] = true;
        }
    }
    console.log(surface);
}
var testObject1 = {
    length: 1,
    width: 2,
    height: 2,
    weight: 3,
};
var dimensionalPositionTest = {
    anchor: { x: 0, y: 0 },
    length: 2,
    width: 3,
    height: 2,
};
var testLayer = {
    surface: Bin_methods_1.BinMethods.createBoolMatrix(3, 3, false),
    heigth: 2,
};
var testLayer2 = {
    surface: Bin_methods_1.BinMethods.createBoolMatrix(3, 3, false),
    heigth: 2,
};
var testLayer3 = {
    surface: Bin_methods_1.BinMethods.createBoolMatrix(3, 3, false),
    heigth: 3,
};
for (var i = 0; i < 1; i++) {
    for (var j = 0; j < 2; j++) {
        testLayer.surface[i][j] = true;
    }
}
for (var i = 2; i < 3; i++) {
    for (var j = 1; j < 3; j++) {
        testLayer2.surface[i][j] = true;
    }
}
var array = Bin_methods_1.BinMethods.allPosiblePositions(testObject1, testLayer, 5, true);
var layers = [testLayer2, testLayer3];
Bin_methods_1.BinMethods.addLayers(testLayer, layers);
layers.forEach(function (value) {
    console.log(value);
});
