import { ui } from "../../ui/layaMaxUI";
import Utils from "../../util/Utils";
import UIMgr from "../../mgr/UIMgr";

import GameConst from "../../const/GameConst";
import AutoScroll from "../../util/AutoScroll";
import UIUtils from "../../util/UIUtils";
import EUI from "../../const/EUI";


/**
 * 更多卖量
 */
export default class BigBoxView extends ui.view.side.BigBoxViewUI {

    /**
     * 重写
     */
    // protected isBoard: boolean = true;
    onAwake() {

        this.showWcbanner();
    }
    private showWcbanner() {
        let self = this;
        let isWc = GameConst.MisTouchSwitch;
        if (isWc) {
            self.imgKeep.bottom = 100;
            // YLSDK.ylBannerAdCreate(false, () => {
            //     if (isWc) {
            //         self.timer.once(GameConst.BannerShowTime, self, () => {
            //             console.log('----------卖量延时显示banner')
            //             YLSDK.ylBannerAdShow();
            //         });

            //         self.timer.once(GameConst.BtnReSize, self, () => {
            //             self.imgKeep.bottom = 300;
            //         })
            //     }
            //     else {
            //         YLSDK.ylBannerAdShow();
            //     }

            // }, () => { }, isWc);
        }
    }
    /**
     * 重写
     */
    protected initView(datas: ISideboxData[]): void {
        var self = this, addClick = UIUtils.addClick, imgBack = self.imgBack;
        self.initList(0, datas);
        self.initList(1, datas);
        // 适配
        var point = platform.getMenuButtonBoundingClientRect();
        if (point) {
            self.boxTop.y = Utils.screenToStage(point.top);
        }
        addClick(imgBack, self.onClose, self);
        addClick(self.imgKeep, self.onKeep, self);
        self.setAldEvent('积分墙卖量');
        // 延迟显示
        imgBack.visible = false;
        self.timer.once(2000, self, function () {
            imgBack.visible = true;
        });

    }

    /**
     * 重写
     */
    protected onClose(): void {
        UIMgr.closeUI(EUI.BigBoxView);
    }

    /**
     * 点击继续游戏 todo 
     */
    protected onKeep(): void {
        var list = this.list0;
        list.selectedIndex = Math.random() * list.array.length | 0;   // 随机选中

        // this.onClose();
    }

    /**
     * 重写
     */
    protected onRemoved(data: ISideboxData): void {
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
    protected initList(type: number, datas: ISideboxData[]): void {
        var self = this;
        var list = <Laya.List>self['list' + type];
        var scrollBar = list.scrollBar;
        console.log("big box", datas);
        list.array = datas.concat();
        list.selectEnable = true;
        list.selectHandler = Laya.Handler.create(self, self.onSelect, [list], false);
        list.addComponent(AutoScroll);
        (list.getComponent(AutoScroll) as AutoScroll).speed=0.5;
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
    protected changeItem(list: Laya.List, index: number, data: ISideboxData): void {
        // var rand = Utils.randomInArray(SideMgr.getSides(), data);
        list.setItem(index, data);
    }

    // /**
    //  * 跳转成功
    //  */
    // protected onSuccess(data: ISideboxData): void {
    //     super.onSuccess(data);
    //     data.isAwarded || (GameConst.sideInfo = [Date.now(), data.sideboxId]);
    // }
}