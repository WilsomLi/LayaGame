import Utils from "./Utils";
import Tween from "./Tween";


export default class ScaleAni extends Laya.Script {
    private _target:any;
    private _isStop:boolean=true;
    
    constructor() { super(); }
    onAwake(){
        this._target = this.owner;
        // EventMgr.instance.on(EventType.LotteryNumChange,this,this.onChange);
        // if(UserData.instance.lotteryNum>0){
            // this.start();
        // }

    }
    
    onEnable(): void {
        this.start();
    }

    onDisable(): void {
        this.destroy();
    }

    onChange(istop){
        if(istop){
            this.destroy();
        }else{
            if(this._isStop){
                this.start();
            }    
        }
    }

    start(){
        if(this._target){
            this._isStop = false;
            this.tweenSmall();
        }
    }

    private tweenBig(){
        // Laya.Tween.to(this._target,{scaleX:1.1,scaleY:1.1},500,null,Laya.Handler.create(this,this.tweenSmall));
    }

    private tweenSmall(){
        Tween.get(this._target).to({scaleX:1.2, scaleY:1.2}, 300).wait(1200).to({scaleX:1.0, scaleY:1.0}, 300).call(()=>{
            this.tweenSmall();
        }, this);
    }

    destroy(){
        this._isStop = true;
        if(this._target){
            // Laya.Tween.clearAll(this._target);

            Tween.clear(this._target);

        }
    }
}