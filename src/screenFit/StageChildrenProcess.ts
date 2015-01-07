/**
 * Created by Saco on 2015/1/4.
 */
class StageChildrenProcess
{
    public constructor()
    {

    }

    public processChildren(child:egret.DisplayObject):void{
        if(child instanceof egret.DisplayObjectContainer){
            this.processContainer(<egret.DisplayObjectContainer>child);
        }else{
            this.processChild(child);
        }
    }

    private processContainer(cantainer:egret.DisplayObjectContainer):void{
        var len:number = cantainer.numChildren;
        var child;
        for(var i = 0;i < len;i++){
            child = cantainer.getChildAt(i);
            if(child instanceof egret.DisplayObjectContainer){
                this.processContainer(child);
            }else{
                this.processChild(child);
            }
        }
    }

    private processChild(child:any):void{
        var tChild:IAdaptableDisplayObject = child;
        if(tChild && tChild.setX){
            tChild.setX(tChild.getOriginX());

            if(GameStage.i().fitMode == GameStage.FIT_MODE_SCALE_ALL){
                tChild.setY(tChild.getOriginY());
                return;
            }

            var tarY = tChild.getOriginY()*GameStage.i().stageScale;
            tarY += tChild.getOriginY()/(GameStage.DESIGN_HEIGHT-tChild.height)*tChild.height*(GameStage.i().stageScale - 1);
            tChild.setY(tarY);
        }
    }
}