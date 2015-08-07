# ScreenFit
Egret开发游戏屏幕适配解决方案，适配不同分辨率，两种适配模式。

适配库是基于Egret的屏幕适配策StageScaleMode.NO_BORDER开发，采用NO_BORDER是因为他没有黑边，而且游戏内容是等比例拉伸。可以把NO_BORDER理解为按宽度适配，也就是宽度填满屏幕，长度上“多退少补”。下面用一个简单游戏场景示例：

![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/1.jpg?raw=true)
设计分辨率

![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/2.jpg?raw=true)
高度溢出分辨率表现（下方有黑边框）

![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/3.jpg?raw=true)
高度不够时游戏表现（下方内容显示不全）

##介绍：
    适配库的原理是在NO_BORDER的基础上，重新排列舞台上的对象（或者缩放，在后文有说明），达到在各种分辨率下都能有良好的显示效果；
    并且内建游戏场景层管理，更加方便游戏制作；
    单例对象，调用更加方便；
    两种适配模式，总有一种适合你的游戏。
##使用方法：
1.把launcher文件夹下egret_loader.js中的适配策略修改为egret.StageScaleMode.NO_BORDER；
2.初始化游戏场景：
```javascript
slib.GameStage.i().initGameStage();
```

3.设置适配模式，取值为slib.GameStage.FIT_MODE_REPOSITION和GameStage.FIT_MODE_SCALE_ALL，如不设置则默认为GameStage.FIT_MODE_REPOSITION：
```
slib.GameStage.i().setFitMode(slib.GameStage.FIT_MODE_SCALE_ALL);
```
4.获取场景层，并把他添加到舞台：
```
this._gameLayer = slib.GameStage.i().getLayer(slib.GameLayer.LAYER_GAME);
slib.GameStage.i().addChild(this._gameLayer);
```
               
##备注：
    游戏中的显示对象最终都要被添加到GameStage中，包括添加到GameStage的子对象；
    显示对象要使用库里对应的对象，如egret.DisplayObjectContainer对应SDisplayObjectContainer，同理Shape、Bitmap、Sprite，否则将不会对其进行重新布局，当然也可以利用这个特性保护游戏内某些不想被重定位的对象；

##两种布局方式解释：
    GameStage.FIT_MODE_SCALE_ALL：简单缩放舞台并居中显示，但是背景层依然会填充整个屏幕，可以理解为一个不带黑边的SHOW_ALL；
    GameStage.FIT_MODE_REPOSITION：重新按比例对舞台上对象进行排版，体验会更好，大部分情况适用，建议使用此方式。
    两种方式对比，FIT_MODE_SCALE_ALL下高度溢出和高度不足两种情况下的表现：

![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/11.jpg?raw=true)
高度溢出
    
![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/22.jpg?raw=true)
高度不足

FIT_MODE_REPOSITION两种情况下的对比图：
![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/33.jpg?raw=true)
高度溢出
    
![](https://github.com/eperfect/ScreenFit/blob/master/doc/img/44.jpg?raw=true)
高度不足

欢迎交流讨论，QQ#286844968
