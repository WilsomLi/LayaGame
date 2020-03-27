/**
 * 自动滚动，列表添加该脚本
 */
export default class AutoScroll extends Laya.Script {
    
    public owner: Laya.List;

    protected scrollBar: Laya.ScrollBar;

    /** @prop {name:speed, tips:"移动速度，一帧移动的像素值", type:Number, default:1.5}*/
    /** @prop {name:wait, tips:"滚动到边界停留时间，默认200毫秒", type:Number, default:200}*/
    
    /**
     * 滚动速度
     */
    private $speed: number;
    /**
     * 滚动中间停止时间
     */
    private $wait: number;
    /**
     * 方向，向max为1否之为-1
     */
    private $distance: number;

    /**
     * 重写
     */
    public onEnable(): void {
        var self = this, owner = self.owner;
        if (owner instanceof Laya.List) {
            let scroll = self.scrollBar = owner.scrollBar;
            if (scroll) {
                let min = scroll.min, max = scroll.max;
                if (max > min) {
                    let event = Laya.Event;
                    self.$distance = 1;
                    // 自动开始
                    self.start();
                    // 点击自动暂停
                    owner.on(event.MOUSE_DOWN, self, self.stop);
                    owner.on(event.MOUSE_OUT, self, self.toStart);
                    owner.on(event.MOUSE_OVER, self, self.toStart);
                }
            }
        }
    }

    /**
     * 重写
     */
    public onDisable(): void {
        var self = this;
        self.owner.offAllCaller(self);
        Laya.timer.clearAll(self);
    }

    /**
     * 定时器回调
     */
    protected onTimer(): void {
        var self = this;
        var scrollBar = self.scrollBar, dist = self.$distance, oDist = dist,
            value = scrollBar.value + dist * self.speed,
            max = scrollBar.max, min = scrollBar.min;
        if (value >= max) {
            dist = -1;
            value = max;
        }
        else if (value <= min) {
            dist = 1;
            value = min;
        }
        scrollBar.value = value;
        // 转换方向
        if (dist !== oDist) {
            self.$distance = dist;
            self.stop();
            Laya.timer.once(self.wait, self, self.start);
        }
    }

    /**
     * 等待开始
     */
    protected toStart(): void {
        var self = this;
        Laya.timer.once(3000, self, self.start);
    }

    /**
     * 速度
     */
    public set speed(value: number) {
        this.$speed = value;
    }

    /**
     * 速度
     */
    public get speed(): number {
        return this.$speed || 1.5;
    }

    /**
     * 等待时间
     */
    public set wait(value: number) {
        this.$wait = value;
    }

    /**
     * 等待时间
     */
    public get wait(): number {
        return this.$wait || 200;
    }

    /**
     * 停止移动
     */
    public stop(): void {
        Laya.timer.clearAll(this);
    }

    /**
     * 开始移动
     */
    public start(): void {
        var self = this;
        self.$distance && Laya.timer.frameLoop(1, self, self.onTimer);
    }
}