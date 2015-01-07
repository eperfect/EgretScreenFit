/**
 * Created by Saco on 2015/1/4.
 */
class SBitmap extends egret.Bitmap implements IAdaptableDisplayObject
{
    public originX:number = 0;
    public originY:number = 0;
    public constructor(texture?:egret.Texture)
    {
        super(texture);
    }

    public get x():number {
        return this._x;
    }

    public set x(value:number) {
        this.originX = value;
    }

    public get y():number {
        return this._y;
    }

    public set y(value:number) {
        this.originY = value;
    }

    public getOriginX():number{
        return this.originX;
    }

    public getOriginY():number{
        return this.originY;
    }

    public setX(value:number):void{
        this._x = value;
    }

    public setY(value:number):void{
        this._y = value;
    }
}
