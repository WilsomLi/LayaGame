// 新建自己的加载工具，只能重复1次
var $loader: Laya.LoaderManager;
/**
 * 获取加载工具
 */
var getLoader = function (): Laya.LoaderManager {
    return $loader || ($loader = new Laya.LoaderManager, $loader.retryNum = 1, $loader);
};

/**
 * 卖量工具类
 * 具备引擎的功能
 */
export default class SideUtils {

    /**
     * 获取资源
     * @param url 地址
     * @param type 资源类型
     */
    public static getRes(url: string, type?: string): Promise<any> {
        return new Promise<any>(function (resolve) {
            let loader = getLoader();
            let res = loader.getRes(url);
            if (res)
                resolve(res);
            else
                loader.load(url, Laya.Handler.create(null, resolve), null, type);
        });
    }

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
     * 数组随机排序
     * @param array
     */
    public static randomSort<T>(array: T[]): T[] {
        return array.sort(function (a, b) {
            return Math.random() - 0.5;
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
}