import Timer from "./Timer"

/**
 * 缓间步骤
 */
interface ITween {
    type: number;		// 缓间类型：0：to，1：set，2：wait，3：call
    startTime: number;	// 开始时间
    endTime: number;	// 结束时间
    param?: any;		// 其他参数：根据类型进行区分
}

/**
 * Get方法参数
 */
interface IGetProp {
    frame?: boolean
    loop?: boolean;
    once?: boolean;
    frameCall?: Function;
    frameObj?: any;
}

interface IFormProp {}

/**
  * 缓间算法
  * 公式：r = F(t)，含义：根据经过时间的比例t[0,1]，获取实际时间的比例r。需保证F(0)=0，F(1)=1
  */
export type TEaseFunc = (t: number) => number;
/**
  * to的参数类型
  */
type TToParam = [TEaseFunc, any, any];	// 缓间算法、目标属性、属性增量
/**
 * form函数的属性格式
 */
type TFormProp = { [key: string]: (t: number) => number };

var sign = 'LTween', cache = '$' + sign;// 缓存标志

/**
 * 从数组里移除子项
 */
var removeAt = function <T>(array: T[], item: T): void {
    var index = array.indexOf(item);
    index > -1 && array.splice(index, 1);
};

/**
  * 缓间动画
  */
export default class Tween {

    private $timer: Timer;
    private $target: Object;
    private $frame: boolean;
    private $loop: boolean;
    private $once: boolean;
    private $steps: ITween[];		// 缓间步骤，存放执行顺序
    private $cSteps: ITween[];		// 缓间步骤，存放完整的执行顺序
    private $needCopy: boolean;		// 是否需要复制顺序
    private $curTime: number;		// 当前时间
    private $frameCall: Function;	// 帧回调
    private $frameObj: any;			// 回调所属对象

    /**
     * 初始化基础属性
     */
    private $init(target: Object, props: IGetProp): void {
        var self = this;
        // 存放标识
        var tweens = target[cache] || (target[cache] = []);
        tweens.push(self);
        // 属性初始
        self.$target = target;
        self.$frame = props.frame;
        self.$loop = props.loop;
        self.$once = props.once !== false;
        self.$frameCall = props.frameCall;
        self.$frameObj = props.frameObj;
        // 数据初始化
        self.$curTime = 0;
        self.$needCopy = true;
        self.$steps = [];
        self.$cSteps = [];
        // 启动定时器，默认不运行
        self.$timer = new Timer(self.$update, self, 1, false, true);
    }

    /**
     * 获取当前运行时间
     */
    private get $runTime(): number {
        var timer = this.$timer;
        return this.$frame ? timer.runCount : timer.runTime;
    }

    /**
     * 定时器回调
     */
    private $update(): void {
        var self = this;
        var steps = self.$steps, cSteps = self.$cSteps;
        // 检测复制执行顺序
        if (self.$needCopy) {
            self.$needCopy = false;
            cSteps.push.apply(cSteps, steps);
        }
        // 执行
        var runTime = self.$runTime, remove = 0;
        for (let i = 0, len = steps.length; i < len; i++) {
            let step = steps[i];
            if (step.startTime > runTime)
                break;
            self.$runStep(step);
            // 运行结束
            if (step.endTime <= runTime)
                remove++;
        }
        // 移除执行完毕
        remove > 0 && steps.splice(0, remove);
        // 执行帧回调
        var call = self.$frameCall;
        call && call.call(self.$frameObj);
        // 执行结束：注意需要用self.$steps来判断，因为$runStep(call)可能将Tween给变质了，导致steps不等于self.$step
        steps = self.$steps;
        if (steps && steps.length == 0) {
            if (self.$loop) {
                self.$timer.reset();
                self.$steps = cSteps.concat();
            }
            else {
                self.$once ? self.clear() : self.$pause();
            }
        }
    }

    /**
     * 静止，时间归0
     */
    private $pause(): void {
        var self = this;
        var timer = self.$timer;
        self.$needCopy = true;
        self.$curTime = 0;
        self.$steps = [];
        timer.stop();
        timer.reset();
    }

    /**
     * 添加步骤
     * @param type 类型
     * @param duration 持续时间
     */
    private $addStep(type: number, duration: number, param?: any): void {
        var self = this;
        var startTime = self.$curTime;
        var endTime = self.$curTime = startTime + duration;
        self.$steps.push({ type, startTime, endTime, param });
        self.$timer.start();	// 自动启动
    }

    /**
     * 获取属性增量，若起始属性没有结束属性的值，则忽略该属性
     * @param start 起始属性
     * @param end 结束属性
     */
    private $getIncrement(start: any, end: any): any {
        var copy = {};
        var keys = Object.keys(end);
        var hasv = function (obj) {
            return !!obj || (obj != null && obj != void 0);
        };
        for (let i in keys) {
            let key = keys[i];
            let value = start[key];
            if (hasv(value))
                copy[key] = end[key] - value;
        }
        return copy;
    }

    /**
     * 运行步骤
     */
    private $runStep(step: ITween): void {
        var self = this;
        var type = step.type;
        switch (type) {
            // to
            case 0:
                self.$to(step);
                break;
            // set
            case 1:
                self.$set(step.param);
                break;
            // wait
            case 2:
                break;
            // call
            case 3:
                self.$call(step.param);
                break;
            // form
            case 4:
                self.$form(step);
                break;
        }
    }

    /**
     * 属性渐变
     */
    private $to(step: ITween): void {
        var self = this;
        // 实际经过时间比例
        var start = step.startTime;
        var ratio = Math.min((self.$runTime - start) / (step.endTime - start), 1);
        // 修改比例
        var param = <TToParam>step.param;
        var ease = param[0];
        ease && (ratio = ease(ratio));
        // 初始化属性
        var target = self.$target, endp = param[1], dstp = param[2] || (
            param[2] = self.$getIncrement(target, endp));
        // 修改属性
        for (let i in dstp) {
            target[i] = endp[i] - dstp[i] * (1 - ratio);
        }
    }

    /**
     * 复制属性
     */
    private $set(props: any): void {
        var self = this;
        var target = self.$target;
        for (let i in props)
            target[i] = props[i];
    }

    /**
     * 执行回调
     */
    private $call(param: [Function, any, any[]]): void {
        param[0].apply(param[1], param[2]);
    }

    /**
     * 属性公式型变化
     */
    private $form(step: ITween): void {
        var self = this, props = <TFormProp>step.param, target = self.$target, start = step.startTime,
            // 当前比例    
            ratio = Math.min((self.$runTime - start) / (step.endTime - start), 1);
        // 修改属性
        for (let i in props) {
            target[i] = props[i](ratio);
        }
    }

    //// 供使用方法 ////

    /**
     * 执行到对应的属性
     * @param props 对象属性集合，一般都是属性值都是数字
     * @param duration 持续时间，非负数，建议时间不低于一帧
     * @param ease 缓动算法
     */
    public to(props: any, duration?: number, ease?: TEaseFunc): Tween {
        var self = this;
        if (isNaN(duration) || duration <= 0) {
            self.set(props);
        }
        else {
            self.$addStep(0, duration, [ease, props]);
        }
        return self;
    }

    /**
     * 直接修改对象属性
     * @param props 对象属性集合
     */
    public set(props: any): Tween {
        var self = this;
        self.$addStep(1, 0, props);
        return self;
    }

    /**
     * 等待
     * @param delay 毫秒数，大于0才有效
     */
    public wait(delay: number): Tween {
        var self = this;
        delay > 0 && self.$addStep(2, delay);
        return self;
    }

    /**
     * 执行回调
     * 注：尽量避免在回调里对自身进行有持续性的操作to/wait等，会出现异常现象
     */
    public call(call: Function, thisObj?: any, params?: any[]): Tween {
        var self = this;
        call && self.$addStep(3, 0, [call, thisObj, params]);
        return self;
    }

    /**
     * 用公式的形式来执行属性变化
     * @param props 对象属性集合，key值为属性，value值为公式函数（参数是时间比例0~1，返回当前时间比例的属性值）
     * @example 
     * var sp = new Laya.Sprite;
     * sp.graphics.drawCircle(0, 0, 10, '#ff00ff');
     * Laya.stage.addChild(sp);
     * Tween.get(sp).set({x: 100, y: 100}).form({x:function(t) {return 100 * t + 100}})
     */
    public form(props: TFormProp, duration?: number): Tween {
        var self = this;
        if (isNaN(duration) || duration <= 0) {
            let obj = {};
            for (let i in props) {
                obj[i] = props[i](1);
            }
            self.set(obj);
        }
        else {
            self.$addStep(4, duration, props);
        }
        return self;
    }

    /**
     * 重复播放几次前面的几个步骤
     * @param repeat 重复的次数，大于0
     * @param step 前面的几次步骤，大于0则指定次数，否则是前面全部步骤
     */
    public repeat(repeat: number, step?: number): Tween {
        var self = this;
        if (repeat > 0 && self.$timer) {
            // steps为已运行记录拼上未运行记录而成
            let steps = self.$cSteps.concat().concat(self.$steps), len = steps.length;
            if (len > 0) {
                if (!(step > 0) || step > len)
                    step = len;
                let startI = len - step;    // 复制起点
                for (let i = 0; i < repeat; i++) {
                    for (let j = 0; j < step; j++) {
                        let step = steps[startI + j];
                        // 步骤的复制需要修改时间，因此需要每个步骤加进入，而不是直接复制一个对象存到数组里
                        self.$addStep(step.type, step.endTime - step.startTime, step.param);
                    }
                }
            }
        }
        return self;
    }

    //// 特殊方法，不进行拼接，一般用于循环动画或者长时间的动画调用 ////

    /**
     * 停止运行，不销毁
     */
    public stop(): void {
        var timer = this.$timer;
        timer && timer.stop();
    }

    /**
     * 恢复运行
     */
    public resume(): void {
        var timer = this.$timer;
        timer && timer.start();
    }

    /**
     * 清理
     */
    public clear(): void {
        var self = this;
        if (self.$timer) {
            // 清除标志
            let target = self.$target;
            let tweens = target[cache];
            if (tweens instanceof Array) {
                removeAt(tweens, self);
                tweens.length == 0 && (delete target[cache]);
            }
            self.$timer.clear();
            self.$timer = self.$steps = self.$cSteps = self.$target = self.$frameCall = self.$frameObj = null;
            Laya.Pool.recover(sign, self);
        }
    }

    /**
     * 获取一个（时间/帧）缓间动画对象，支持对同一对象同时执行多个Tween
     * 销毁条件：once为true且非循环调用时运行结束会自动销毁，否之请自行调用clear（两个任选一个都行）来清理
     * @param target 对象
     * @param props 动画属性：
     * 0.frame：是否是帧缓间动画，默认false，时间缓间动画-单位毫秒，帧缓间动画-单位1帧
     * 1.loop：是否循环执行，默认false；
     * 2.once：是否自动销毁，默认true，loop为true时该属性无效；
     * 3.frameCall：帧回调，属性变化后调用
     * 4.frameObj：帧回调所属对象
     */
    public static get(target: Object, props?: IGetProp): Tween {
        var tween = <Tween>Laya.Pool.getItemByClass(sign, Tween);
        tween.$init(target, props || {});
        return tween;
    }

    /**
     * 同get，调用前先清理掉之前的动画
     * @param target 
     * @param props 
     */
    public static once(target: Object, props?: IGetProp): Tween {
        Tween.clear(target);
        return Tween.get(target, props);
    }

    /**
     * 移除对象的动画
     * @param target 对象
     */
    public static clear(target: Object): void {
        if (target) {
            let tweens = target[cache];
            if (tweens instanceof Array) {
                for (let i = 0, len = tweens.length; i < len; i++) {
                    let tween = tweens[i];
                    tween instanceof Tween && tween.clear();
                }
            }
            delete target[cache];
        }
    }

    /**
     * 界面清除动画
     * @param root 根目录
     */
    public static clearAll(root: Laya.Sprite): void {
        Tween.clear(root);
        for (let i = 0, len = root.numChildren; i < len; i++) {
            Tween.clearAll(root.getChildAt(i) as Laya.Sprite);
        }
    }

    /**
     * Laya常规的Ease函数转Tween能识别的Ease函数
     * @example Tween.tuenEase(Laya.Ease.XXXX);
     */
    public static turnEase(ease: (...params: number[]) => number): TEaseFunc {
        return function (t: number): number {
            return ease(t, 0, 1, 1);
        };
    }
}