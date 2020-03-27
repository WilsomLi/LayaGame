/**
 * 时间轴动画
 */
export default class TimeLineUtils {
    constructor(){}

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
}