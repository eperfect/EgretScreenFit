/**
 * Created by Saco on 2015/1/4.
 */
module slib
{
    export class Sprite extends egret.Sprite implements IAdaptableDisplayObject
    {
        public originX:number = 0;
        public originY:number = 0;

        public constructor()
        {
            super();
        }

        public get x():number
        {
            return this.originX;
        }

        public set x(value:number)
        {
            this.originX = value;
            EventCenter.dispatchEvent(new GameEvent(GameEvent.SET_ASSET_POSITION, this));
        }

        public get y():number
        {
            return this.originY;
        }

        public set y(value:number)
        {
            this.originY = value;
            EventCenter.dispatchEvent(new GameEvent(GameEvent.SET_ASSET_POSITION, this));
        }

        public setX(value:number):void
        {
            this._DO_Props_._x = value;
        }

        public setY(value:number):void
        {
            this._DO_Props_._y = value;
        }

        public getOriginX():number
        {
            return this.originX;
        }

        public getOriginY():number
        {
            return this.originY;
        }

        public addChild(child:egret.DisplayObject):egret.DisplayObject
        {
            EventCenter.dispatchEvent(new GameEvent(GameEvent.SET_ASSET_POSITION, child));
            return super.addChild(child);
        }

        public addChildAt(child:egret.DisplayObject, index:number):egret.DisplayObject
        {
            EventCenter.dispatchEvent(new GameEvent(GameEvent.SET_ASSET_POSITION, child));
            return super.addChildAt(child, index);
        }
    }
}
