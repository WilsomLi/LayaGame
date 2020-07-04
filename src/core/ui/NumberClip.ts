import Clip = Laya.Clip;

export default class NumberClip {

    private _clips:Array<Clip>;
    private _val:number = 0;
    private _skin:string;
    private _clipX:number;
    private _clipY:number;
    private _initX:number;
    private _initY:number;
    private _width:number;
    private _height:number;

    private _parent:Laya.Node;

    constructor(clip:Clip) {
        this._clips = new Array<Clip>();
        this._val = 0;
        this._skin = clip.skin;
        this._clipX = clip.clipX;
        this._clipY = clip.clipY;
        this._initX = clip.x+clip.width*0.5;
        this._initY = clip.y;
        this._width = clip.width;
        this._height = clip.height;
        this._parent = clip.parent;
        this._clips.push(clip);
    }

    setNumChange(val:number):void  {
        if(this._val == val) return;
        let delta = 1;
        if(val > 30*2){
            delta = Math.floor(val / (30*2));
        }
        Laya.timer.frameLoop(2,this,()=>{
            let tmp = this._val + delta;
            tmp = Math.min(tmp,val);
            this._val = tmp;
            this.setNum(this._val);
            if(this._val>=val){
                Laya.timer.clearAll(this);
            }
        })
    }

    setNum(val):void {
        let str:string = val.toString().trim();
        let offLen:number = str.length - this._clips.length;
        if(offLen != 0) {
            this.resetClip(offLen);
        }
        let len:number = this._clips.length;
        for(let i=0;i<len;i++){
            let index = parseInt(str[i]);
            this._clips[i].index = index;
        }
        this.resetPos(str.length);

        this._val = val;
    }

    resetClip(offLen:number):void {
        if(offLen > 0) {
            for(let i=0;i<offLen;i++) {
                let clip = new Clip(this._skin,this._clipX,this._clipY);
                clip.height = this._height;
                this._parent.addChild(clip);
                this._clips.push(clip);
            }
        }        
    }

    resetPos(len:number):void {
        let initX = this._initX-len*this._width*0.5;
        for(let i=0;i<len;i++){
            let x = initX+this._width*i;
            this._clips[i].pos(x,this._initY);
        }
    }
}