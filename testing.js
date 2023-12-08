"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bin_methods_1 = require("./Bin-methods");
var dimensionalPositionTest = {
    anchor: { x: 0, y: 1 },
    length: 2,
    width: 3,
    height: 2,
};
var testLayer = {
    surface: Bin_methods_1.BinMethods.createBoolMatrix(3, 3, true),
    heigth: 2,
};
console.log(Bin_methods_1.BinMethods.freeOrAllocSpace(testLayer, dimensionalPositionTest, "alloc"));
