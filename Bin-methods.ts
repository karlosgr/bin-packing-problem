import { DimensionalPosition, FitValidationStrategy, FreeOrAlloc, Layer, ThreeDimensionalObject } from "./Interfaces";

export class BinMethods
{
    //check this method because his implementation is diferent from de original
    public static freeOrAllocSpace(layer:Layer,position:DimensionalPosition,options:FreeOrAlloc):Layer{
        let newLayer:Layer = {
            surface: new Array<Array<boolean>>(layer.surface.length).fill([]).map((values)=> new Array(layer.surface[0].length).fill(false)),
            heigth: options==='alloc'? layer.heigth+position.height:layer.heigth - position.height,   
        }

        for (let i = position.anchor.x; i < position.length  ; i++) {
            for (let j = position.anchor.y; j < position.width ; j++) {
                newLayer[i][j]= true;
                layer[i][j]=false;
            }
            
        }

        return newLayer;
    } 

    private static validFitPositionByArea(layer:Layer,position:DimensionalPosition,maxHeight:number):boolean {
        
        for (let i = position.anchor.x; i < position.length; i++) {
            for(let j = position.anchor.y; j < position.width; j++){
                if(!layer[i][j])
                    return false;
            }
        }
        return position.height<=maxHeight;
    }

    public static validateFitPosition(layer:Layer,position:DimensionalPosition,fitStrategy:FitValidationStrategy,maxHeight:number):boolean{

        switch (fitStrategy) {
            case 'area':
                return this.validFitPositionByArea(layer,position,maxHeight);
            default:
                throw new Error("no one valid strategy was provided");
        }
    }

    public static allPosiblePositions(object:ThreeDimensionalObject,layer:Layer,withRotationXY:boolean):Array<DimensionalPosition>{
        let allPositions:Array<DimensionalPosition>= [];

        return allPositions;
    }
}