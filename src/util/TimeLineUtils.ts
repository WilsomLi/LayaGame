/**
 * 时间轴动画
 */
export default class TimeLineUtils {

    static tweenScale(node:Laya.Node,to:number,durationIn:number,keepTime:number,durationOut,endCallback:Laya.Handler=null):Laya.TimeLine {
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(node, {scaleX:to, scaleY:to, alpha:1}, durationIn, Laya.Ease.linearNone)
            .addLabel("tl2",0).to(node,{},keepTime)
            .addLabel("tl2", 0).to(node, {scaleX:0, scaleY:0, alpha:0}, durationOut, Laya.Ease.linearNone);
        timeLine.on(Laya.Event.COMPLETE, node, ()=>{
            // timeLine.destroy();
            if(endCallback) {
                endCallback.run();
            }
        });
        timeLine.play(0, false);
        return timeLine;
    }

    static tweenScaleCircle(node:Laya.UIComponent,scale:number,time:number):Laya.TimeLine {
        let timeLine = new Laya.TimeLine();
        let initScale = node.scaleX;
        timeLine.addLabel("tl1", 0).to(node, {scaleX:scale,scaleY:scale}, time, Laya.Ease.linearNone)
            .addLabel("tl2",0).to(node,{scaleX:initScale,scaleY:initScale},time,Laya.Ease.linearNone)
        // timeLine.on(Laya.Event.COMPLETE, node, ()=>{
        //     // timeLine.destroy();
        // });
        return timeLine;
    }

    static tweenUpdown(node:Laya.UIComponent,offX:number,offY:number,time:number):Laya.TimeLine {
        let timeLine = new Laya.TimeLine();
        let initX = node.x, initY = node.y;
        timeLine.addLabel("tl1", 0).to(node, {x:offX+initX,y:offY+initY}, time, Laya.Ease.linearNone)
            .addLabel("tl2",0).to(node,{x:initX,y:initY},time,Laya.Ease.linearNone)
        // timeLine.on(Laya.Event.COMPLETE, node, ()=>{
        //     // timeLine.destroy();
        // });
        return timeLine;
    }
}