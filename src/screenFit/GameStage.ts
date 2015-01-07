/**
 * Created by Saco on 2015/1/4.
 *
 *
 */
class GameStage extends egret.DisplayObjectContainer
{
    /*缩放适配模式*/
    public static FIT_MODE_SCALE_ALL:string = "scale_all";
    /*重新布局适配模式*/
    public static FIT_MODE_REPOSITION:string = "reposition";
    /*舞台实际宽高*/
    public static STAGE_WIDTH:number;
    public static STAGE_HEIGHT:number;
    /*舞台设计宽高*/
    public static DESIGN_WIDTH:number;
    public static DESIGN_HEIGHT:number;
    /*舞台缩放比*/
    public stageScale:number;
    /*当前采用的适配模式*/
    public fitMode:string = GameStage.FIT_MODE_REPOSITION;
    private static _instance:GameStage;
    private _childrenProcess:StageChildrenProcess;
    private _stageBg:egret.DisplayObject;
    private _gameLayers:GameLayer;
    private _isStageScaled:boolean;
    private _isResizing:boolean;

    public constructor()
    {
        super();
        if(GameStage._instance){
            throw new Error("GameStage is a Singleton");
        }
        this.init();
    }

    public static i():GameStage{
        if(!this._instance)
            this._instance = new GameStage();
        return this._instance;
    }

    /*初始化舞台属性*/
    private init():void{
        this._childrenProcess = new StageChildrenProcess();
        this._gameLayers = new GameLayer();
        this.setStageSize();
        this.listenResize();
    }

    /*监听resize事件*/
    private listenResize():void{
        window.onresize = ()=>{
            if(!this._isResizing){
                egret.setTimeout(this.onStageResize, this, 300);
                this._isResizing = true;
            }
        };
    }

    /*处理stage尺寸改变事件*/
    private onStageResize():void{
        egret.MainContext.instance.stage.changeSize();
        this.setStageSize();
        this.resetStageChildren();
        this.resizeBg();
        this._isResizing = false;
    }

    /*缩放游戏背景*/
    private resizeBg():void{
        if(this._stageBg){
            this._stageBg.width = GameStage.STAGE_WIDTH;
            this._stageBg.height = GameStage.STAGE_HEIGHT;
        }
    }

    /*游戏中初始化舞台*/
    public initGameStage():void{
        egret.MainContext.instance.stage.addChild(this);
        this.setFitMode(GameStage.FIT_MODE_REPOSITION);
    }

    /*
    * 设置舞台适配方式
    * 取值：GameStage.FIT_MODE_REPOSITION,GameStage.FIT_MODE_SCALE_ALL
    * GameStage.FIT_MODE_REPOSITION:会对游戏组件重新布局，建议此种方式
    * GameStage.FIT_MODE_SCALE_ALL:整体缩放游戏舞台
    * */
    public setFitMode(mode:string){
        this.fitMode = mode;
        this.resetStageChildren();
    }

    /*
    * 重新设置子对象的坐标
    * */
    private resetStageChildren():void{
        if(this.fitMode == GameStage.FIT_MODE_SCALE_ALL){
            this.scaleStage();
        }else if(this.fitMode == GameStage.FIT_MODE_REPOSITION){
            this.resetStageScale();
        }
        this.processChildren(this);
    }

    /*重置舞台缩放*/
    private resetStageScale():void{
        if(this._isStageScaled){
            this.anchorX = this.anchorY = 0;
            this.scaleX = this.scaleY = 1;
            this.x = this.y = 0;
            this._isStageScaled = false;
        }

    }

    /*设置舞台的缩放，并居中*/
    private scaleStage():void{
        this.anchorX = this.anchorY = 0.5;
        this.x = GameStage.STAGE_WIDTH/2;
        this.y = GameStage.STAGE_HEIGHT/2;
        var scale:number = this.stageScale > 1 ? 1 : this.stageScale;
        this.scaleX = this.scaleY = scale;
        this._isStageScaled = true;
    }

    /*获取舞台尺寸*/
    private setStageSize():void{
        GameStage.DESIGN_WIDTH = egret.StageDelegate.getInstance()["_designWidth"];
        GameStage.DESIGN_HEIGHT = egret.StageDelegate.getInstance()["_designHeight"];
        GameStage.STAGE_WIDTH = egret.MainContext.instance.stage.stageWidth;
        GameStage.STAGE_HEIGHT = egret.MainContext.instance.stage.stageHeight;
        this.stageScale = GameStage.STAGE_HEIGHT/GameStage.DESIGN_HEIGHT;
    }

    public addChild(child:egret.DisplayObject):egret.DisplayObject{
        this.processChildren(child);
        return super.addChild(child);
    }

    public addChildAt(child:egret.DisplayObject, index:number):egret.DisplayObject{
        this.processChildren(child);
        return super.addChildAt(child, index);
    }

    public processChildren(child:egret.DisplayObject):void{
        this._childrenProcess.processChildren(child);
    }

    /*设置一个可拉伸的游戏背景图*/
    public setScalableBg(bg:egret.DisplayObject):void{
        this._stageBg = bg;
        this.resizeBg();
        egret.MainContext.instance.stage.addChildAt(this._stageBg, 0);
    }

    /*获取游戏场景层
    * type取值：GameLayer.LAYER_BG,GameLayer.LAYER_GAME,GameLayer.LAYER_UI,GameLayer.LAYER_PANEL,GameLayer.LAYER_TIPS
    * type可以自定义，同一个type获取的为同一个对象
    * */
    public getLayer(type:string):SDisplayObjectContainer{
        return this._gameLayers.getLayer(type);
    }
}
