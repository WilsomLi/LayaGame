import Utils from "../../util/Utils";
import Tween from "../../util/Tween";

/**
 * 缓存标识
 */
const sign = '$LFlyGold';

/**
 * 金币飞回特效，默认隐藏，飞的时候显示，飞完隐藏，请勿随意修改visible
 */
export default class FlyGold extends Laya.Sprite {

    private $minR: number;
    private $maxR: number;
    private $skin: string;

    // /** @prop {name:number,tips:"播放的金币数量",type:int,default:0}*/
    // /** @prop {name:minR,tips:"最小扩散半径",type:int,default:0}*/
    // /** @prop {name:maxR,tips:"最大扩散半径",type:int,default:1}*/

    /**
     * @param skin 图片地址
     */
    public constructor(skin?: string) {
        super();
        this.mouseEnabled = this.visible = false;
        this.$skin = skin || 'game/img_gold.png';
    }

    /**
     * 重写
     */
    public onDestroy(): void {
        let clear = Tween.clear, recover = Laya.Pool.recover;
        for (let i = 0, len = this.numChildren; i < len; i++) {
            let gold = this.getChildAt(i);
            clear(gold);
            recover(sign, gold);
        }
    }

    /**
     * 创建图片
     */
    public create(): Laya.Image {
        return new Laya.Image(this.$skin);
    }

    /**
     * 设置金币数量
     */
    public set number(v: number) {
        let self = this, curL = self.numChildren;
        if (curL != v) {
            let create = Laya.Pool.getItemByCreateFun;
            // 删除多余的
            for (let i = v; i < curL; i++)
                self.removeChildAt(v);
            for (let i = curL; i < v; i++) {
                let gold = create(sign, self.create.bind(self));
                self.addChild(gold);
            }
        }
    }

    /**
     * 设置最小扩散半径，最小0
     */
    public set minR(v: number) {
        if (v >= 0)
            this.$minR = v;
    }

    /**
     * 设置最大扩散半径，最小1
     */
    public set maxR(v: number) {
        if (v >= 1)
            this.$maxR = v;
    }

    /**
     * 获取最小扩散半径，最小0
     */
    public get minR(): number {
        let r = this.$minR;
        return r < 0 ? 0 : r;
    }

    /**
     * 获取最大扩散半径，最小1
     */
    public get maxR(): number {
        let r = this.$maxR;
        return r < 1 ? 1 : r;
    }

    /**
     * 重置
     */
    public reset(): void {
        for (let i = 0, len = this.numChildren; i < len; i++) {
            let ci = <Laya.Image>this.getChildAt(i);
            ci.pos(0, 0);
            ci.visible = true;
        }
    }

    /**
     * 数据初始化
     * @param number 数量
     * @param minR 最小扩散半径
     * @param maxR 最大扩散半径
     */
    public init(number: number, minR: number, maxR: number): void {
        let self = this;
        self.number = number;
        self.minR = minR;
        self.maxR = maxR;
    }

    /**
     * 播放动画，动画过程不允许点击，未调用init的情况下，默认（22, 80, 160
     * @param point 终点坐标（注意是舞台坐标）
     * @param speed0 扩散速度（毫秒/像素）
     * @param speed1 飞回速度（毫秒/像素）
     */
    public play(point: Laya.Point, speed0: number = 1.5, speed1: number = 1): Promise<void> {
        let self = this;
        return new Promise<void>((resolve)=> {
            let cs = self['_children'], len = 0;
            if (cs) {
                len = cs.length;
                if (len == 0) {
                    self.init(len = 22, 80, 220);    // 默认
                    cs = self['_children'];
                }
            }
            if (len == 0) {
                resolve();
                return;
            }
            let minR = self.minR, maxR = self.maxR, mgr = Laya.MouseManager;
            // 随机半径
            let range = function () {
                return Math.random() * (maxR - minR) + minR;
            };
            let sin = Utils.sin, cos = Utils.cos;
            let count = 0, ex, ey, time = 0, end/* Tween结束回调 */ = function () {
                if (++count == len) {
                    self.visible = false;
                    mgr.enabled = true;
                    resolve();
                }
            }, hide/* 金币隐藏时回调 */ = function () {
                // if (count == 0) {
                //     SoundMgr.playCoin();
                // }
            };
            point = Laya.Point.TEMP.setTo(point.x, point.y);
            self.reset();
            self.visible = true;
            mgr.enabled = false;
            self.globalToLocal(point);
            ex = point.x;
            ey = point.y;
            for (let i = 0; i < len; i++) {
                let img = cs[i];
                let dist = range();                 // 扩散距离
                let angle = Math.random() * 360;    // 扩散角度
                let timei = speed0 * dist;
                // 扩散——飞到终点——等待
                let tween = Tween.get(img).to({
                    x: dist * cos(angle),
                    y: dist * sin(angle)
                }, timei);
                // 记录扩散最长时间
                if (timei > time) time = timei;
                // 扩散结束动画
                let dx = ex - img.x, dy = ey - img.y;
                let dist1 = Math.sqrt(dx * dx + dy * dy);
                tween.wait(timei * 1.5).to({
                    x: ex,
                    y: ey
                }, dist1 * speed1).call(hide).set({ visible: false }).wait(100).call(end);
            }
        });
    }
}