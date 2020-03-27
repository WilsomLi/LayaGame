import { ESound } from "../const/ERes";

/**
 * 声音管理
 */
export default class SoundMgr {

    private static $openMusic: boolean;                        // 是否开启音乐
    private static $openSound: boolean;                        // 是否关闭音效
    private static $openVibrate: boolean;                      // 是否开启震动
    private static $cacheMusic: string = 'cacheMusic';         // 音乐缓存
    private static $cacheSound: string = "cacheSound";         // 音效缓存
    private static $cacheVibrate: string = 'cacheVibrate';     // 震动缓存
    private static $channel: Laya.SoundChannel;                // 音乐控件

    /**
     * 初始化
     */
    public static init(): void {
        var self = this;
        var getItem = Laya.LocalStorage.getItem;
        self.$openMusic = getItem(self.$cacheMusic) !== '0';
        self.$openSound = getItem(self.$cacheSound) !== '0';
        self.$openVibrate = getItem(self.$cacheVibrate) !== '0';
        Laya.SoundManager.autoStopMusic = true;
    }

    /**
     * 获取音乐开关
     */
    public static get openMusic(): boolean {
        return this.$openMusic;
    }

    /**
     * 设置音乐开关
     */
    public static set openMusic(open: boolean) {
        var self = this;
        if (self.$openMusic != open) {
            self.$openMusic = open;
            if (open)
                self.playBGM();
            else
                self.stopBGM();
            Laya.LocalStorage.setItem(self.$cacheMusic, Number(open) + '');
        }
    }

    /**
     * 获取音效开关
     */
    public static get openSound(): boolean {
        return this.$openSound;
    }

    /**
     * 设置音效开关
     */
    public static set openSound(open: boolean) {
        var self = this;
        if (self.$openSound != open) {
            self.$openSound = open;
            Laya.LocalStorage.setItem(self.$cacheSound, Number(open) + '');
        }
    }

    /**
     * 获取震动开关
     */
    public static get openVibrate(): boolean {
        return this.$openVibrate;
    }

    /**
     * 设置震动开关
     */
    public static set openVibrate(open: boolean) {
        var self = this;
        if (self.$openVibrate != open) {
            self.$openVibrate = open;
            Laya.LocalStorage.setItem(self.$cacheVibrate, Number(open) + '');
        }
    }

    /**
     * 播放背景音乐
     */
    public static playBGM(): void {
        var self = this;
        if (self.openMusic) {
            if (!self.$channel) {
                self.$channel = Laya.SoundManager.playMusic(ESound.Bgm);
            }
            self.setMusicVolume(0.2);
        }
    }

    /**
     * 停止播放音乐
     */
    public static stopBGM() {
        // Laya.SoundManager.stopMusic(); 不要调用，会导致部分android机多重音乐
        this.setMusicVolume(0);
    }

    /**
     * 播放点击音效
     */
    public static playBtnClick(): void {
        this.playSound(ESound.BtnClick);
    }

    // /**
    //  * 播放获得金币
    //  */
    // public static playCoin(): void {
    //     this.playSound(ESound.Coin);
    // }

    /**
     * 播放音效
     * @param url 
     * @param loops 循环次数，0表示无限循环
     */
    public static playSound(url: string, loops?: number): void {
        if (this.openSound) {
            Laya.SoundManager.playSound(url, loops);
        }
    }

    /**
     * 设置音乐音量
     * @param val 
     */
    public static setMusicVolume(val: number): void {
        Laya.SoundManager.setMusicVolume(val);
    }

    /**
     * 设置音效音量
     * @param val 
     */
    public static setSoundVolume(val: number): void {
        Laya.SoundManager.setSoundVolume(val);
    }

    /**
     * 震动
     * @param isLong 
     */
    public static playVibrate(isLong?: boolean): void {
        if (this.openVibrate) {
            if (isLong) {
                platform.vibrateLong();
            } else {
                platform.vibrateShort();
            }
        }
    }
}