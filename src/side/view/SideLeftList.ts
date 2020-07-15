import AutoScroll from "../../util/AutoScroll";
import { ui } from "../../ui/layaMaxUI";
import Utils from "../../util/Utils";
import SideMgr from "../mgr/SideMgr";
import Tween from "../../util/Tween";
import SideNewMgr from "../mgr/SideNewMgr";
import UIMgr from "../../mgr/UIMgr";
import EUI from "../../const/EUI";
import UIUtils from "../../util/UIUtils";

let FirstFlag:boolean = true;


/**
 * 左侧卖量
 */
export default class SideLeftList extends ui.view.side.SideLeftListUI {

    /**
     * 是否显示着
     */
    private $isShow: boolean;
    /**
     * 自动滚动脚本
     */
    private $scroll: AutoScroll;

    /**
     * 重写
     */
    protected platType: number = 4001;

    onEnable(){
        super.onEnable()
        console.log('SideLeftList onEnable ')
    }

    /**
     * 重写
     */
    public onDisable(): void {
        this.$scroll = null;
    }

    /**
     * 重写
     */
    protected initView(datas: IYDHW.GameBase.ISideBoxResult[]): void {
        var self = this, addc = UIUtils.addClick2, list = self.list,
            scrollBar = list.scrollBar;
        list.dataSource = Utils.randomSort(datas);
        self.imgBg.visible = false;
        self.zOrder = 10000;    // 保证置顶即可

        this.mouseThrough = true;
    
        // 点击相关
        addc(self.imgSlide, self.onSlide, self);
        addc(self, self.onSelf, self);
        list.selectEnable = true;
        list.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
        // 动画相关
        (self.$scroll = list.addComponent(AutoScroll)).stop();  // 先不开始

        if(FirstFlag){
            self.onSlide();
            FirstFlag = false;
        }
    }

    /**
     * 重写
     */
    protected onSelect(index: number): void {
        var ltCont = this.list;
        var data = ltCont.selectedItem;
        if (data) {
            let rand = Utils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
            super.onClick(ltCont.selectedItem);
            ltCont.selectedIndex = -1;
            ltCont.setItem(index, rand);
        }
    }

    /**
     * 点击滑块
     */
    protected onSlide(isShowAd: boolean = true): void {

        console.log('onSlide  1111111111111111111111111111111')

        var self = this;
        var imgBg = self.imgBg;
        var isShow = self.$isShow, next = !isShow, time = 160;
        Laya.timer.clear(self, self.showInsert);
        self.mouseEnabled = self.mouseThrough = false;
        imgBg.visible = true;
        Tween.get(imgBg).to({ x: next ? -2 : -752 }, time);
        Tween.get(self.boxMain).to({ x: next ? 0 : -615 }, time).call(function () {
            let scroll = self.$scroll;
            self.mouseEnabled = true;
            imgBg.visible = self.$isShow = next;
            self.mouseThrough = isShow;
            self.changeState();
            next ? scroll.start() : scroll.stop();
        });

        // isShowAd && Platform.createInsertAd(this, "wg_chaping");     
    }

    /**
     * 点击界面
     */
    protected onSelf(e: Laya.Event): void {
        var self = this;
        if (self.$isShow) {
            let target = e.target;
            if (target == self || target == self.boxMain)
                self.onSlide(false);
        }
    }

    /**
     * 界面状态变化
     */
    protected changeState(): void {
        var self = this;
        // 插屏
        // if (self.$isShow && ServerAgency.getDefValue('wg_chaping')) {
        //     Laya.timer.once(1000, self, self.showInsert);
        // }
    }

    /**
     * 显示
     */
    protected showInsert(): void {
        // Platform.createInsertAd();
    }
    
    protected onCancel(data: IYDHW.GameBase.ISideBoxResult):void
    {
        UIMgr.openUI(EUI.MorePeopleView);
    }
}