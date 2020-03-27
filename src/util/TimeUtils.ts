
// 缓存变量
var outCode = 0, valCode = 0, timeout = {}, interval = {};

/**
  * 清除
  * @param data 缓存数据
  * @param key 标志
  */
var clear = function (data: any, key: number) {
	var info = data[key];
	if (info) {
		delete data[key];
		Laya.timer.clear(null, info);
	}
};

/**
 * 时间工具类
 * @author Yin
 */
export default class TimeUtils {

	protected constructor() {

	}

    /**
     * 数字保持两位数
     */
	public static formatTen(num: number): string {
		return (num > 9 ? '' : '0') + num;
	}

    /**
     * 小时-分-秒
     */
	public static formatHour(second: number, sufix: string = ':'): string {
		var ten = TimeUtils.formatTen;
		var hour = second / 3600 | 0;
		var min = (second / 60 | 0) % 60;
		var sec = second % 60;
		return ten(hour) + sufix + ten(min) + sufix + ten(sec);
	}

    /**
     * 获取经过的天数
     * @param time 时间，单位毫秒
     */
	public static getDay(time: number): number {
		return (time / 3600000 + 8) / 24 | 0;   // 时间零点是从早上8点开始的，因此加上8
	}

    /**
     * 检测两个毫秒数是否同一天
     */
	public static isSameDay(time0: number, time1: number): boolean {
		var get = TimeUtils.getDay;
		return get(time0) == get(time1);
	}

    /**
     * 模仿setTimeout
     * @param call 
     * @param thisObj 
     * @param delay 
     */
	public static setTimeout(call: Function, thisObj?: any, delay?: number, ...param): number {
		var curc = ++outCode;
		var func = timeout[curc] = function () {
			call.apply(thisObj, param);
			delete timeout[curc];
		};
		Laya.timer.once(delay, null, func);
		return curc;
	}

    /**
      * 清除延迟回调
      * @param key 标志
      */
	public static clearTimeout(key: number) {
		clear(timeout, key);
	};

    /**
      * 设置间隔回调
      * @param call 回调函数
      * @param thisObj 回调所属对象
      * @param delay 回调间隔
      */
	public static setInterval(call: Function, thisObj?: any, delay?: number, ...param): number {
		var curc = ++valCode;
		var func = interval[curc] = function () {
			call.apply(thisObj, param);
		};
		Laya.timer.loop(delay, null, func);
		return curc;
	}

    /**
      * 清除间隔回调
      * @param key 
      */
	public static clearInterval(key: number) {
		clear(interval, key);
	};
}