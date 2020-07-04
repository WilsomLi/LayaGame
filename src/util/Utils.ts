import Vector3 = Laya.Vector3;
import UserData from "../mgr/UserData";
import GameConst from "../const/GameConst";
import TimeUtils from "./TimeUtils";
import SoundMgr from "../mgr/SoundMgr";
import StrategyMgr from "../mgr/StrategyMgr";
import Tween from "../util/Tween";

/**
 * 工具类
 */
export default class Utils {

    constructor() { };

    static cloneArray(source: Array<any>): Array<any> {
        let result = [];
        for (let i = 0; i < source.length; i++) {
            result.push(source[i]);
        }
        return result;
    }

    static DistanceSquared(x1: number, y1: number, x2: number, y2: number): number {
        let offx = x1 - x2;
        let offy = y1 - y2;
        return offx * offx + offy * offy;
    }

    static MapDistanceSquared(pos1: Vector3, pos2: Vector3): number {
        let offx = pos1.x - pos2.x;
        let offz = pos1.z - pos2.z;
        let dist = offx * offx + offz * offz;
        return dist;
    }

    static GetAngle(dx: number, dy: number): number {
        if (dy == 0) {
            return dx > 0 ? 0 : 180;
        }

        let angle = Math.atan(dx / dy) * 180 / Math.PI;
        if (dy < 0) {
            if (dx < 0)
                angle = 180 + Math.abs(angle);
            else
                angle = 180 - Math.abs(angle);
        }
        angle = 90 - angle; //物体初始是水平摆放

        return angle;
    }

    //字符串转整形
    static parseInt(_strNum: string): number {
        if (_strNum == null || _strNum == "undefined") {
            return 0;
        }
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    }

    static isEmpty(obj): boolean {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    }

    static isEqual(a: number, b: number): boolean {
        let offVal: number = a - b;
        return Utils.nearZero(offVal);
    }

    static nearZero(val: number): boolean {
        return val >= -0.001 && val <= 0.001;
    }

    static equalVec(vecA: Vector3, vecB: Vector3): boolean {
        return this.isEqual(vecA.x, vecB.x) && this.isEqual(vecA.y, vecB.y) && this.isEqual(vecA.z, vecB.z);
    }

    static vec3NearZero(vec: Vector3): boolean {
        return this.nearZero(vec.x) && this.nearZero(vec.y) && this.nearZero(vec.z);
    }

    /**
     * 平滑过渡，比Lerp平滑
     * @param current 当前位置
     * @param target 目标位置
     * @param currentVelocity 当前速度
     * @param smoothTime 平滑时间
     * @param maxSpeed 最大速度
     * @param deltaTime 时间间隔
     * @param output 输出位置
     */
    static SmoothDamp(current: Vector3, target: Vector3, currentVelocity: Vector3, smoothTime: number, maxSpeed: number = -1, deltaTime: number, output: Vector3) {
        if (maxSpeed == -1) {
            maxSpeed = Number.MAX_VALUE;
        }
        // Based on Game Programming Gems 4 Chapter 1.10
        smoothTime = Math.max(0.0001, smoothTime);
        let omega = 2.0 / smoothTime;

        let x = omega * deltaTime;
        let exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);
        Vector3.subtract(current, target, Utils._changeVec);
        target.cloneTo(Utils._originalTo);

        //Clamp maximum speed
        let maxChange = maxSpeed * smoothTime;
        Utils.ClampMagnitude(Utils._changeVec, maxChange);
        Vector3.subtract(current, Utils._changeVec, target);

        Vector3.scale(Utils._changeVec, omega, Utils._tmpVec);
        Vector3.add(currentVelocity, Utils._tmpVec, Utils._tmpVec);
        Vector3.scale(Utils._tmpVec, deltaTime, Utils._tmpVec);

        Vector3.scale(Utils._tmpVec, omega, Utils._tmpVec2);
        Vector3.subtract(currentVelocity, Utils._tmpVec2, Utils._tmpVec2);
        Vector3.scale(Utils._tmpVec2, exp, currentVelocity);

        Vector3.add(Utils._changeVec, Utils._tmpVec, Utils._tmpVec);
        Vector3.scale(Utils._tmpVec, exp, Utils._tmpVec);
        Vector3.add(target, Utils._tmpVec, output);

        // Prevent overshooting
        Vector3.subtract(Utils._originalTo, current, Utils._tmpVec);
        Vector3.subtract(output, Utils._originalTo, Utils._tmpVec2);
        if (Vector3.dot(Utils._tmpVec, Utils._tmpVec2) > 0) {
            Utils._originalTo.cloneTo(output);
            Vector3.subtract(output, Utils._originalTo, Utils._tmpVec);
            Vector3.scale(Utils._tmpVec, 1 / deltaTime, currentVelocity);
        }

    }
    static _originalTo = new Vector3();
    static _changeVec = new Vector3();
    static _tmpVec = new Vector3();
    static _tmpVec2 = new Vector3();

    static ClampMagnitude(vec: Vector3, maxLength: number) {
        if (Vector3.scalarLengthSquared(vec) > maxLength * maxLength) {
            Vector3.normalize(vec, vec);
            Vector3.scale(vec, maxLength, vec);
        }
    }

    /**
     * 随机生成范围中小数数值,大于等于min 且小于max 
     * @param min 
     * @param max 
     */
    static Range(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

    static IntRange(min: number, max: number): number {
        return Math.round(Utils.Range(min, max))
    }

    static DegToRad(deg: number): number {
        return deg * Math.PI / 180;
    }

    static RadToDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

    /**
     * 求重力加速度
     * @param height 高度（米）
     * @param time 下落时间（秒）
     */
    static getGravity(height: number, time: number): number {
        let gravity: number = 2 * height / (time * time);
        return gravity;
    }

    /**
     * 求一个点绕另一个点旋转后位置
     * @param pos 需要旋转的点
     * @param centerPos 中心点
     * @param eulerY 欧拉角Y值
     * @param outPos 位置
     */
    static RotatePos(pos: Vector3, centerPos: Vector3, eulerY: number, outPos: Vector3): void {
        let rad: number = Utils.DegToRad(eulerY - 180);
        let cos: number = Math.cos(rad);
        let sin: number = Math.sin(rad);
        let x: number = (pos.x - centerPos.x) * cos + (pos.z - centerPos.z) * sin + centerPos.x;
        let z: number = -(pos.x - centerPos.x) * sin + (pos.z - centerPos.z) * cos + centerPos.z;
        outPos.setValue(x, 0, z);
    }

    static formatTimestamp(time: number): string {
        let str: string;
        let hour: number;
        let min: number;
        let sec: number;
        let hourStr: string;
        let minStr: string;
        let secStr: string;

        hour = Math.floor(time / 3600);
        min = Math.floor((time % 3600) / 60);
        sec = Math.floor((time % 3600) % 60);
        hourStr = (hour >= 10) ? hour.toString() : ('0' + hour);
        minStr = (min >= 10) ? min.toString() : ('0' + min);
        secStr = (sec >= 10) ? sec.toString() : ("0" + sec);
        str = hourStr + ":" + minStr + ":" + secStr;
        return str;
    }

    static formatTime(time: number): string {
        let str: string;
        let min: number;
        let sec: number;
        let secStr: string;

        min = Math.floor(time / 60);
        sec = Math.floor(time % 60);
        secStr = (sec >= 10) ? sec.toString() : ("0" + sec);
        str = min + ":" + secStr;

        return str;
    }

    static formatNum(num: number): string {
        let str: string = num.toString();
        if (str.length == 1) {
            str = "00" + num;
        }
        else if (str.length == 2) {
            str = "0" + num;
        }
        return str;
    }

    static log(...params): void {
        let str = Utils.formatDate(new Date(), "[hh:mm:ss.S]");
        params.forEach(element => {
            str += " " + JSON.stringify(element);
        });
        console.log(str);
    }

    static formatDate(date: Date, fmt: string): string {
        let o = {
            "Y+": date.getFullYear(),                  //年份
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //检测是不是刘海屏
    static checkPhoneIsBangs(): boolean {
        var systemInfo = platform.getSystemInfoSync();
        return systemInfo ? systemInfo.windowHeight / systemInfo.windowWidth >= 2.1 : false;
    }

    static addRedPoint(btn: any, isRed, top: number = 8, right: number = 1): void {
        let _redPoint: Laya.Image = btn.getChildByName("redPoint") as Laya.Image;
        if (_redPoint) {
            _redPoint.visible = isRed;
        } else if (isRed) {
            _redPoint = new Laya.Image("game/game_redPoint.png");
            _redPoint.name = "redPoint";
            btn.addChild(_redPoint);
            _redPoint.top = top;
            _redPoint.right = right;
        }
    }

    //洗牌算法
    static shuffle(arr: Array<any>): Array<any> {
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            var index = Math.floor(Math.random() * (len - i));
            var temp = arr[index];
            arr[index] = arr[len - i - 1];
            arr[len - i - 1] = temp;
        }
        return arr;
    }

    // 获取今日日期
    static getTodayDate(): string {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let today = '' + year + '_' + month + '_' + date;
        return today;
    }

    /**
     * 数学sin cos
     */
    private static mathSinCos(attr, angle: number): number {
        return Math[attr](angle * Math.PI / 180);
    }

    /**
     * sin
     * @param angle 角度，0~360
     */
    public static sin(angle: number): number {
        return Utils.mathSinCos('sin', angle);
    }

    /**
     * cos
     * @param angle 角度，0~360
     */
    public static cos(angle: number): number {
        return angle % 180 == 90 ? 0 : Utils.mathSinCos('cos', angle);
    }

    /**
     * 初始化本地文件列表，通laya原生方法，与initCDNFiles相对
     * @param path cdn地址
     * @param files 本地文件夹列表，除此之外皆从cdn下载
     */
    public static initNativeFiles(path: string, files: string[]): void {
        var adpters = [Laya.MiniAdpter, Laya.VVMiniAdapter];   // oppo暂时不加
        var hasChange = false;
        for (let i in adpters) {
            let adpter = adpters[i];
            if (adpter) {
                adpter.AutoCacheDownFile = true;
                adpter.nativefiles = files;
                hasChange = true;
            }
        }
        if (hasChange) {
            let fileMgr = Laya['MiniFileMgr'];
            if (fileMgr) {
                let pLen = path.length, fLen = files.length, i, file, sIdx;
                // 本地目录检测规则重写，路径规则bin：/xxxx/，避免/xxxxY/也被识别成本低目录
                fileMgr.isLocalNativeFile = function (url: string): boolean {
                    // 设置了basePath之后，所有url都会带上cdn地址（除了合图），所以要过滤掉
                    sIdx = url.indexOf(path) == 0 ? pLen : 0;
                    // 开头不为下划线、HTTP:/HTTPS:、data:
                    if (url[0] !== '/') {
                        for (i = 0; i < fLen; i++) {
                            file = files[i];
                            // 即为file为xxxx时，过滤掉xxxxY之类目录
                            if (url.indexOf(file, sIdx) == sIdx && url[sIdx + file.length] == '/') {
                                return true;
                            }
                        }
                    }
                    return false;
                };
            }
            Laya.URL.basePath = Laya.URL['_basePath'] = path;   // 兼容2.1
        }
    }

    /**
     * 初始化CDN文件夹，与initNativeFiles相对
     * @param path 
     * @param files 
     */
    public static initCDNFiles(path: string, files: string[]): void {
        var adpters = [Laya.MiniAdpter, Laya.VVMiniAdapter];
        var hasChange = false;
        for (let i in adpters) {
            if (adpters[i]) {
                hasChange = true;
            }
        }
        if (hasChange) {
            let url = Laya.URL;
            let fuc = url.customFormat;
            let format, index;
            url.customFormat = function (url: string): string {
                url = fuc(url);     // 携带版本号保留
                index = url.indexOf('/');
                // 不以/开头
                if (index > 0) {
                    format = url.substr(0, index);
                    for (let i in files) {
                        if (files[i] === format) {
                            url = path + url;
                            break;
                        }
                    }
                }
                return url;
            };
        }
    }

    //// 数组相关 ////

    /**
     * 初始化长度为length值全为value的数组，适合基础类型数组
     * @param length
     * @param value
     */
    public static memset<T>(length: number, value: T): T[] {
        return Array.apply(null, Array(length)).map(function (v, i) { return value; });
    }

    /**
     * 初始化长度为length值通过create函数创建而来，适合对象型数组
     * @param length
     * @param create
     */
    public static memset2<T>(length: number, create: (index: number) => T): T[] {
        return Array.apply(null, Array(length)).map(function (v, i) {
            return create(i);
        });
    }

    /**
     * 取数组的随机值
     * @param array 数组
     * @param item 子项，存在时则随机出来的值不为item的值，若长度小于等于1，则无效
     */
    public static randomInArray<T>(array: T[], item?: T): T {
        var length = array.length, splice = length;
        if (length > 1 && item != void 0) {
            let index = array.indexOf(item);
            if (index > -1) {
                length--;
                splice = index;
            }
        }
        var rndIdx = Math.random() * length | 0;
        if (rndIdx >= splice)
            rndIdx++;
        return array[rndIdx];
    }

    /**
     * 数组随机排序
     * @param array
     */
    public static randomSort<T>(array: T[]): T[] {
        return array.sort(function (a, b) {
            return Math.random() - 0.5;
        });
    }

    /**
     * 随机移除数组内的一个元素
     * @param array 数组
     */
    public static rmSplice<T>(array: T[]): T {
        var len = array.length;
        var index = Math.random() * len | 0;
        return array.splice(index, 1)[0];
    }

    /**
     * 移除数组里面的子项
     * @param array 数组
     * @param rmFun 满足一定条件时删除，参数：数据，注意请勿在此函数内乱改下标，只要返回数据是否满足删除条件即可
     */
    public static removeItem<T>(array: T[], rmFun: (item: T) => boolean): void {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                if (rmFun(array[i])) {
                    array.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    }

    //// 字符串相关 ////

    /**
     * 自定义格式化字符串
     * @param reg 正则
     * @param str 字符串
     * @param args 填充参数
     */
    public static formatStringReg(reg: RegExp, str: string, args: any[]): string {
        for (let i in args) {
            let arg = args[i];
            if (reg.test(str))
                str = str.replace(reg, args[i]);
            else
                break;
        }
        return str;
    }

    /**
     * 格式化字符串，格式类C语言，不区分%d和%s
     */
    public static formatString(str: string, ...args: any[]): string {
        str = str.replace(/%%/g, '%');  // 有些识别问题出现两个%号
        return Utils.formatStringReg(/%d|%s/i, str, args);  // 忽略大小写
    }

    //// 界面相关 ////

    /**
     * 画上圆角矩形
     * @param sprite 
     * @param width 矩形宽
     * @param height 矩形高
     * @param round 圆角半径
     */
    public static drawRoundRect(graphics: Laya.Graphics, width: number, height: number, round: number): void {
        var paths = [
            ['moveTo', round, 0],
            ['lineTo', width - round, 0],
            ['arcTo', width, 0, width, round, round],
            ['lineTo', width, height - round],
            ['arcTo', width, height, width - round, height, round],
            ['lineTo', round, height],
            ['arcTo', 0, height, 0, height - round, round],
            ['lineTo', 0, round],
            ['arcTo', 0, 0, round, 0, round]
        ];
        graphics.drawPath(0, 0, paths, { fillStyle: "#0" });
    }

    /**
     * 屏幕像素转游戏场景像素
     * @param pixel 
     */
    public static screenToStage(pixel: number): number {
        var info = platform.getSystemInfoSync();
        var scale = Laya.stage.height / info.screenHeight;
        return pixel * scale;
    }

    /**
     * 界面唤醒回调（onEnable之后）
     * @param call 
     * @param thisObj 
     */
    public static uiEnableCall(view: Laya.Sprite, call: Function, thisObj?: any, ...params: any[]): void {
        if (view['_getBit'](Laya.Const.AWAKED)) {
            call.apply(thisObj, params);
        }
        else {
            let func = view.onEnable;
            view.onEnable = function () {
                func.call(view);
                view.onEnable = func;
                call.apply(thisObj, params);
            };
        }
    }

    //// 其它 ////

    /**
     * 异步获取资源
     * @param url 路径
     * @param type 类型
     */
    public static getRes(url: string, type?: string): Promise<any> {
        return new Promise<any>(function (resolve) {
            let loader = Laya.loader;
            let res = loader.getRes(url);
            if (res)
                resolve(res);
            else
                loader.load(url, Laya.Handler.create(null, resolve), null, type);
        })
    }

    /**
     * 是否是IPhone手机
     */
    public static isIPhone(): boolean {
        var systemInfo = platform.getSystemInfoSync();
        if (systemInfo != null) {
            let system = systemInfo.system.toLowerCase();
            return system.indexOf('ios') > -1;
        }
        return false;
    }

    /**
     * 多次点击
     * @param view 事件绑定者
     * @param multiple 点击次数上限
     * @param distance 时间间隔
     */
    public static multipleClick(view: Laya.Sprite, multiple: number, distance: number, call: Function, thisObj?: any): void {
        var count = 0, lastTime, curTime, timeout;
        view.on(Laya.Event.CLICK, this, function () {
            // 间隔检测
            curTime = Date.now();
            if (curTime - lastTime > distance)
                count = 0;
            lastTime = curTime;
            // 触发回调
            if (++count >= multiple) {
                count = 0;
                call && call.call(thisObj);
            }
            // 定时器刷新
            TimeUtils.clearTimeout(timeout);
            timeout = TimeUtils.setTimeout(function () {
                count = 0;
            }, null, distance);
        });
    }

    /**
     * 加载任务
     * @param task Promise任务
     * @param call 成功回调
     */
    public static loadingTask<T>(task: Promise<T>, call?: (param: T) => void): void {
        var timeout = TimeUtils.setTimeout(platform.showLoading, platform, 1000);
        var clear = function () {
            platform.hideLoading();
            TimeUtils.clearTimeout(timeout);
            TimeUtils.clearTimeout(timeout1);
        };
        var timeout1 = TimeUtils.setTimeout(clear, null, 5000);
        task.then(function (res) {
            clear();
            call && call(res);
        }).catch(function () {
            clear();
        });
    }

    /**
     * 深度拷贝一个对象
     * @param obj 
     */
    public static copy<T>(obj: T): T {
        var ret: T;
        if (typeof obj === 'object') {
            ret = obj instanceof Array ? [] : Object.create(null);
            for (let i in obj) {
                ret[i] = Utils.copy(obj[i]);
            }
        }
        else
            ret = obj;
        return ret;
    }

    /**
     * 复制属性
     * @param attrs 属性列表
     * @param target 目标
     * @param source 属性来源
     */
    public static copyAttrs(attrs: string[], target: any, source: any): void {
        for (let i = 0, len = attrs.length; i < len; i++) {
            let attr = attrs[i];
            target[attr] = source[attr];
        }
    }

    /**
     * 舞台转本地
     */
    public static globalToLocal(sprite: Laya.Sprite, x: number, y: number): Laya.Point {
        var temp = Laya.Point.TEMP;
        temp.setTo(x, y);
        sprite.globalToLocal(temp);
        return temp;
    }
}