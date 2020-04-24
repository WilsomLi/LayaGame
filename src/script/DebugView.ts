import { ui } from "../ui/layaMaxUI";
import UserData from "../mgr/UserData";
import SceneMgr from "../mgr/SceneMgr";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";

export default class DebugView extends ui.view.DebugViewUI {
   
    constructor() {
        super(); 
    }

    onAwake(){
        this.regClick(this.btnClear,this.onClear);
        this.regClick(this.btnClose,this.onClose);
        this.regClick(this.btn_makeSure,this.onMakeSure);
        this.refreshView();
    }

    private refreshView():void {
        // let role:RolePlayer = GameMgr.instance.role;
        let datas:Array<any> = [
        //     {name:"灵敏度",val:RoleCtrl.RATE,slide:{min:0,max:3,tick:0.1}},
        //     {name:"起飞速度",val:MoveCtrl.UP_SPEED,slide:{min:1,max:3,tick:0.1}},
        //     {name:"最大速度",val:MoveCtrl.MAX_SPEED,slide:{min:0,max:3,tick:0.1}},
        //     {name:"加速度",val:MoveCtrl.ACC_SPEED,slide:{min:0,max:20,tick:1}},
        ]

        this.list.array = datas;
        this.list.height = 51 * datas.length;
        
        this.list.renderHandler = new Laya.Handler(this,this.renderItem);
        this.btnBox.y = this.list.y + this.list.height + 20;
    }

    private renderItem(item:Laya.Node):void {
        let slide:Laya.Slider = item.getChildByName("slide") as Laya.Slider;
        let lblName:Laya.Label = item.getChildByName("name") as Laya.Label;
        let lblVal:Laya.Label = item.getChildByName("val") as Laya.Label;
        slide.value = parseFloat(lblVal.text);
        slide.on(Laya.Event.CHANGED,this,this.onSlideChange,[lblName,lblVal,slide]);
    }

    private onSlideChange(lblName:Laya.Label,lblVal:Laya.Label,slide:Laya.Slider):void {
        let val:number = slide.value;
        lblVal.text = val+"";
        // let role:RolePlayer = GameMgr.instance.role;
        
        // switch(lblName.text) {
        //     case "灵敏度":
        //         RoleCtrl.RATE = val;
        //         break;
        //     case "起飞速度":
        //         MoveCtrl.UP_SPEED = val;
        //         break;
        //     case "最大速度":
        //         MoveCtrl.MAX_SPEED = val;
        //         break;
        //     case "加速度":
        //         MoveCtrl.ACC_SPEED = val;
        //         break;
        // }
    }
    
    private onClear():void {
        UserData.instance.clearData();
    }

    private onClose():void {
        UIMgr.closeUI(EUI.DebugView);
    }

    private onMakeSure():void{
        let level = parseInt(this.imput_Num.text);
        if(isNaN(level)) {
            SceneMgr.instance.loadSceneData(level);
        }

        let gold = parseInt(this.input_money.text);
        if(isNaN(gold)){
            UserData.instance.gold += gold;
        }
    }
}