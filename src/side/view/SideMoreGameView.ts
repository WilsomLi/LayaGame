import { ui } from "../../ui/layaMaxUI";
import GameConst from "../../const/GameConst";
import Utils from "../../util/Utils";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";
import AutoScroll from "../../util/AutoScroll";
import YLSDK, { EYLCustomSwitch, IBtnMisTouch } from "../../platform/YLSDK";
import UIUtils from "../../util/UIUtils";


/**
 * 更多卖量
 */
export default class SideMoreGameView extends ui.view.side.SideMoreGameViewUI {
    private _firstClick:number = 0;

    /**
     * 重写
     */
    // protected isBoard: boolean = true;
    onAwake() {

    }
    /**
     * 重写
     */
    protected initView(datas: IYDHW.GameBase.ISideBoxResult[]): void {
        var self = this, addClick = UIUtils.addClick, imgBack = self.imgBack;
        self.initList(0, datas);
        self.initList(1, datas);
        // 适配
        var point = platform.getMenuButtonBoundingClientRect();
        if (point) {
            self.boxTop.y = Utils.screenToStage(point.top);
        }
        addClick(imgBack, self.onBack, self);
        addClick(self.imgKeep, self.onKeep, self);
        self.setAldEvent('积分墙卖量');
        // 延迟显示
        imgBack.visible = false;
        Laya.timer.once(2000, self, function () {
            imgBack.visible = true;
        });
    }


    private onBack(){
        UIMgr.openUI(EUI.SideBoxView, ()=>{
            (this.dataSource && typeof this.dataSource  === "function") && (this.dataSource());
        })

        UIMgr.closeUI(EUI.SideMoreGameView);
    }

    /**
     * 重写
     */
    protected onClose(): void {
        (this.dataSource && typeof this.dataSource  === "function") && (this.dataSource());
        UIMgr.closeUI(EUI.SideMoreGameView);
    }

    /**
     * 点击继续游戏 todo 
     */
    protected onKeep(): void {
        var list = this.list0;

        // let swit = Number(YLSDK.getCustomSwitch(EYLCustomSwitch.ContinueGameSwitch));
        // if(!!swit)
        // {
            if(this._firstClick <= 0)
            {
                list.selectedIndex = Math.random() * list.array.length | 0;   // 随机选中
                this._firstClick++;
            }
            else
            {
                this.onClose();
            }
        // }
        // else
        // {
        //     this.onClose();
        // }
    }

    /**
     * 重写
     */
    protected onRemoved(data: IYDHW.GameBase.ISideBoxResult): void {
        var self = this;
        let check = function (type: number) {
            let list = <Laya.List>self['list' + type];
            let array = list.array;
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] == data) {
                    self.changeItem(list, i, data);
                    array.splice(i, 1);
                    break;
                }
            }
            list.array = array;
        };
        check(0);
        check(1);
    }

    /**
     * 初始化列表
     */
    protected initList(type: number, datas: IYDHW.GameBase.ISideBoxResult[]): void {
        var self = this;
        var list = <Laya.List>self['list' + type];
        var scrollBar = list.scrollBar;
        console.log("big box", datas);
        list.array = datas.concat();
        list.selectEnable = true;
        list.selectHandler = Laya.Handler.create(self, self.onSelect, [list], false);
        list.addComponent(AutoScroll);
        (list.getComponent(AutoScroll) as AutoScroll).speed = 0.5;
    }

    /**
     * 点击子项 
     */
    protected onSelect(list: Laya.List, index: number): void {
        var data = list.selectedItem;
        if (data) {
            // let self = this, rand = Utils.randomInArray(SideMgr.getSides(), data);
            list.selectedIndex = -1;
            // self.changeItem(list, index, data);
            super.onClick(data);
        }
    }

    /**
     * 切换子项数据 
     */
    protected changeItem(list: Laya.List, index: number, data: IYDHW.GameBase.ISideBoxResult): void {
        // var rand = Utils.randomInArray(SideMgr.getSides(), data);
        list.setItem(index, data);
    }

    // /**
    //  * 跳转成功
    //  */
    // protected onSuccess(data: IYDHW.GameBase.ISideBoxResult): void {
    //     super.onSuccess(data);
    //     data.isAwarded || (GameConst.sideInfo = [Date.now(), data.sideboxId]);
    // }
}