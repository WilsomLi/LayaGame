import Sprite3D = Laya.Sprite3D;
import Transform3D = Laya.Transform3D;
import Animator = Laya.Animator;
import EventMgr from "../mgr/EventMgr";
import EventType from "../const/EventType";
import ExUtils from "./ExUtils";

export default class ViewModel extends Laya.Script3D {

    public gameObject:Sprite3D;
    public transform:Transform3D;
    public camera:Laya.Camera;

    private _animator:Animator;
    private _aniName:string;
    private _url:string;

    onAwake(){
        this.gameObject = this.owner as Sprite3D;
        this.transform = this.gameObject.transform;

        EventMgr.on(EventType.ChangeRoleModel,this,this.changeModel);
    }

    onDestroy(){
        super.onDestroy();
        EventMgr.off(EventType.ChangeRoleModel,this,this.changeModel);
    }

    play(aniName:string) {
        this._aniName = aniName;
        if(this._animator && this._aniName) {
            this._animator.play(this._aniName);
        }
    }

    changeModel(url:string) {
        if(url == null || url == this._url) return;
        this._url = url;
        ExUtils.instanceSprite3D(url,null,Laya.Handler.create(this,(model:Laya.Sprite3D)=>{
            if(this.destroyed) return;            
            
            let oldModel:Sprite3D = this.gameObject.getChildAt(0) as Sprite3D;
            if(oldModel) {
                oldModel.destroy();
            }
            this.gameObject.addChild(model);
            this._animator = ExUtils.getComponentInChild(model,Animator) as Animator;
            if(this._animator && this._aniName) {
                this._animator.play(this._aniName);
            }
        }));
    }
}