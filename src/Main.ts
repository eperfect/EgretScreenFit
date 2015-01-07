/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;
    private _bgLayer:SDisplayObjectContainer;
    private _gameLayer:SDisplayObjectContainer;
    private _uiLayer:SDisplayObjectContainer;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        //设置加载进度界面
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private textContainer:egret.Sprite;
    /**
     * 创建游戏场景
     */
    private createGameScene():void{
        //初始化游戏舞台
        GameStage.i().initGameStage();
//        GameStage.i().setFitMode(GameStage.FIT_MODE_SCALE_ALL);

        //创建游戏层
        this._bgLayer = GameStage.i().getLayer(GameLayer.LAYER_GAME);
        this._gameLayer = GameStage.i().getLayer(GameLayer.LAYER_GAME);
        this._uiLayer = GameStage.i().getLayer(GameLayer.LAYER_UI);
        GameStage.i().addChild(this._bgLayer );
        GameStage.i().addChild(this._gameLayer );
        GameStage.i().addChild(this._uiLayer );

        //设置游戏最底层可拉伸背景
        GameStage.i().setScalableBg(new egret.Bitmap(RES.getRes("bgImage")));

        this.addBg();
        this.addBitmap();
        this.addBtns();
    }

    /*添加游戏背景*/
    private addBg():void{
        var top:SBitmap = new SBitmap(RES.getRes("top"));
        top.width = GameStage.DESIGN_WIDTH;
        this._bgLayer.addChild(top);

        var bottom:SBitmap = new SBitmap(RES.getRes("bottom"));
        bottom.y = GameStage.DESIGN_HEIGHT - bottom.height;
        bottom.width = GameStage.DESIGN_WIDTH;
        this._bgLayer.addChild(bottom);
    }

    /*添加UI按钮*/
    private addBtns():void{
        var btn1:SBitmap = new SBitmap(RES.getRes("btn1"));
        btn1.anchorX = 0.5;
        btn1.anchorY = 0.5;
        btn1.x = GameStage.DESIGN_WIDTH/2;
        btn1.y = GameStage.DESIGN_HEIGHT/2;
        this._uiLayer.addChild(btn1);

        var btn2:SBitmap = new SBitmap(RES.getRes("btn2"));
        btn2.x = GameStage.DESIGN_WIDTH/2 - 30;
        btn2.anchorX = 0.5;
        btn2.y = 450;
        this._uiLayer.addChild(btn2);

        var btn3:SBitmap = new SBitmap(RES.getRes("btn3"));
        btn3.x = GameStage.DESIGN_WIDTH/2 + 30;
        btn3.anchorX = 0.5;
        btn3.y = 450;
        this._uiLayer.addChild(btn3);
    }

    /*添加场景元件*/
    private addBitmap():void{
        var bm1:SBitmap = new SBitmap(RES.getRes("topAsset"));
        bm1.x = 100;
        this._gameLayer.addChild(bm1);

        var bm2:SBitmap = new SBitmap(RES.getRes("topAsset2"));
        bm2.x = 300;
        this._gameLayer.addChild(bm2);

        var bm3:SBitmap = new SBitmap(RES.getRes("bottomAsset"));
        bm3.x = 100;
        bm3.y = GameStage.DESIGN_HEIGHT - bm3.height;
        this._gameLayer.addChild(bm3);

        var bm4:SBitmap = new SBitmap(RES.getRes("bottomAsset2"));
        bm4.x = 300;
        bm4.y = GameStage.DESIGN_HEIGHT - bm4.height;
        this._gameLayer.addChild(bm4);
    }
}


