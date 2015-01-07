/**
 * Created by Saco on 2015/1/4.
 */
interface IAdaptableDisplayObject
{
    x:number;
    y:number;
    width:number;
    height:number;
    originX:number;
    originY:number;
    setX(value:number):void;
    setY(value:number):void;
    getOriginX():number;
    getOriginY():number;
}
