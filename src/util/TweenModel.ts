import Tween from "./Tween";

/**
 * 动画模板
 */
export default class TweenModel {

    /**
     * 上下摇晃动画，注意锚点需要在中心点。
     * @param wait 隔多久晃动一次
     * @param time 单次摇晃时间
     * 注：清理动画使用Tween的clear方法
     */
    public static swingTween(sprite: Laya.Sprite, wait: number = 2000, time: number = 100): void {
        Tween.get(sprite, { loop: true }).wait(wait).to({
            rotation: 14
        }, time).to({
            rotation: -14
        }, time * 1.6).to({
            rotation: 7
        }, time * 1.2).to({
            rotation: -7
        }, time * .8).to({
            rotation: 0
        }, time * .6);
    }

    /**
     * 呼吸动画-循环，注意锚点需要在中心点。
     * 注：清理动画使用Tween的clear方法
     */
    public static breatheTween(sprite: Laya.Sprite, wait: number = 2000, time: number = 200): Tween {
        var size = Math.max(sprite.width, sprite.height);
        var base = sprite.scaleX;
        var next0 = base + 20 / size;
        // var next1 = 1 - 20 / size;
        // var next2 = 1 + 10 / size;
        return Tween.get(sprite, { loop: true }).to({
            scaleX: next0,
            scaleY: next0
        }, time).to({
            scaleX: base,
            scaleY: base
        }, time).repeat(1, 2).wait(wait);
    }

    /**
     * 炫光特效，注意炫光特效是采用遮罩的形式的，
     * 注：若本身有遮罩需要先设置好遮罩再调用该方法
     * @param view 播放炫光对象
     * @param dazW 炫光的宽度，默认30
     * @param wait 动画间隔
     * @returns 光对象，需要就播，播放结束会自动隐藏
     */
    public static dazzleTween(view: Laya.Sprite, dazW: number = 30, wait: number = 2000): Laya.Sprite {
        var sprite = new Laya.Sprite, dist = -10;
        var width = view.width, height = view.height;
        sprite.alpha = .3;
        sprite.graphics.drawPoly(0, 0, [dist, dist, dazW + dist, dist, height - dist,
            height - dist, height - dazW - dist, height - dist], '#ffffff');
        sprite.x = -width;
        view.addChild(sprite);
        // 不存在遮罩则手动添加一个
        if (!view.mask) {
            let mask = view.mask = new Laya.Sprite;
            mask.graphics.drawRect(0, 0, width, height, '#0');
        }
        Tween.get(sprite, { loop: true }).wait(wait).to({ x: width }, width * 4);
        return sprite;
    }
}