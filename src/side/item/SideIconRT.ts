import { ui } from "../../ui/layaMaxUI";
import TweenModel from "../../util/TweenModel";
import Tween from "../../util/Tween";
import SideMgr from "../mgr/SideMgr";
import SideUtils from "../mgr/SideUtils";

/**
 * 右上角卖量
 */
export default class SideIconRT extends ui.view.side.SideIconRTUI {

    /**
     * 是否只存在右上角
     */
    private $isRT: boolean;

    /**
     * 重写
     */
    public onEnable(): void {
        super.onEnable();
        var self = this;
        self.$isRT = self.x == 0 && self.y == 0;     // todo
        self.callLater(self.updatePoint);
    }

    /**
     * 刷新坐标
     */
    protected updatePoint(): void {
        var self = this;
        if (self.$isRT) {
            let parent = <Laya.Sprite>self.parent;
            if (parent) {
                self.anchorX = self.anchorY = 0.5;
                let temp = Laya.Point.TEMP;
                let platform = SideMgr.platform;
                let info = platform.getSystemInfoSync();
                let point = platform.getMenuButtonBoundingClientRect();
                temp.x = 666;
                if (point) {
                    let scale = Laya.stage.height / info.screenHeight;
                    temp.y = point.bottom * scale + self.height / 2 + 6;
                }
                else {
                    temp.y = 92 + (info.windowHeight / info.windowWidth > 2.1 ? 82 : 0);
                }
                parent.globalToLocal(temp);
                self.pos(temp.x, temp.y);
            }
        }
    }

    /**
     * 重写
     */
    protected initView(datas: ISideboxData[]): void {
        var self = this;
        if (self.$isRT) {
            TweenModel.swingTween(self, 500);
        }
        else {
            TweenModel.breatheTween(self);
        }
        self.bind(self.imgIcon, SideUtils.randomInArray(datas));
        self.restart();
    }

    /**
     * 重写
     */
    protected onClear(): void {
        super.onClear();
        var self = this;
        Tween.clear(self);
        Laya.timer.clear(self, self.refresh);
    }

    /**
     * 重写
     */
    protected onClick(data: ISideboxData): void {
        var self = this;
        super.onClick(data);
        self.restart();
        self.refresh();
    }

    /**
     * 重写
     */
    protected onCancel(): void {
        SideMgr.showMore();
    }

    /**
     * 重写
     */
    protected onRemoved(data: ISideboxData): void {
        var self = this;
        var curd = <ISideboxData>self.imgIcon.dataSource;
        if (curd == data)
            self.refresh();
    }

    /**
     * 重启定时器
     */
    protected restart(): void {
        var self = this;
        Laya.timer.once(4000, self, self.refresh);
    }

    /**
     * 刷新图标
     */
    public refresh(): void {
        var self = this;
        var datas = SideMgr.getSides();
        if (datas.length == 0) {
            self.onClose();
        }
        else {
            let old = self.imgIcon.dataSource;
            self.bind(self.imgIcon, SideUtils.randomInArray(datas, old));
        }
    }
}