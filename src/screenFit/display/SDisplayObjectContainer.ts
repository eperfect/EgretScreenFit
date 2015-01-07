/**
 * Created by Saco on 2015/1/6.
 */
class SDisplayObjectContainer extends egret.DisplayObjectContainer implements IAdaptableDisplayObject
{
    public originX:number = 0;
    public originY:number = 0;
    public constructor()
    {
        super();
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

    public addChild(child:egret.DisplayObject):egret.DisplayObject{
        this.dispatchEvent(new GameEvent("addChild", child));
        return super.addChild(child);
    }

    public addChildAt(child:egret.DisplayObject, index:number):egret.DisplayObject{
        this.dispatchEvent(new GameEvent("addChild", child));
        return super.addChildAt(child, index);
    }
}
