/**
 * 排序工具
 */
export default class SortTools {

    /**
     * 获取子项比较的数值
     */
    public static getCompareNum(value: any, key: string): number {
        var v = value[key];
        // 如果是数组，则返回其长度
        if (v instanceof Array)
            v = v.length;
        // 字符串有其自己的比较方式
        else if (typeof v !== 'string')
            v = Number(v);
        return v;
    }

    /**
     * 单项排序
     * @param arr 要排序的数组
     * @param key 排序的字段
     * @param asc 是否升序，默认true
     */
    public static sortMap<T>(arr: T[], key: string, asc: boolean = true): T[] {
        return arr.sort(function (a, b) {
            let comp = a[key] - b[key];
            !asc && (comp *= -1);
            return comp;
        });
    }

    /**
     * 多项排序
     * @param array 待排序数组
     * @param keys 排序字段
     * @param argType 对应字段的排序类型，true为升序，false为降序，默认都是升序
     */
    public static sortMaps<T>(array: T[], keys: string[], argType: boolean[] = []): T[] {
        return array.sort(function (a, b) {
            let comp = -1;  // 默认不用交换
            let index = 0;
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                let aValue = a[key], bValue = b[key];
                // 数字型采取比较
                if (aValue == bValue || (isNaN(aValue) && isNaN(bValue)))
                    continue;
                if (aValue > bValue)
                    comp = 1;
                if (argType[i] == false)
                    comp *= -1;
                break;
            }
            return comp;
        });
    }

    /**
     * 多项排序，不规则数组
     * @param array 待排序数组
     * @param keys 排序字段
     * @param argType 对应字段的排序类型，true为升序，false为降序，默认升序
     * @param getNum 根据keys子对象获取数组子对象的值的比较值方法
     */
    public static sortMaps2<T>(array: T[], keys: string[], argType: boolean[] = [],
        getNum: (v: T, key: string) => number = SortTools.getCompareNum): void {
        array.sort(function (a, b) {
            let comp = -1;  // 默认不用交换
            let index = 0;
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                let aValue = getNum(a, key), bValue = getNum(b, key);
                // 数字型采取比较
                if (aValue == bValue || (isNaN(aValue) && isNaN(bValue)))
                    continue;
                if (aValue > bValue)
                    comp = 1;
                if (argType[i] == false)
                    comp *= -1;
                break;
            }
            return comp;
        });
    }
}