import Utils from "./Utils";

type IKey = string | number;

/**
 * 加载工具，设置时注意进度丢失问题
 */
export default class LoadUtils {

    private keys: IKey[];       // 类型
    private ratios: number[];   // 占比
    private values: number[];   // 数值

    protected constructor(keys: IKey[], ratios: number[]) {
        this.keys = keys;
        this.ratios = ratios;
        this.values = Utils.memset(keys.length, 0);
    }

    /**
     * 设置类型的进度，并返回当前总进度
     * @param key 类型
     * @param value 进度，0~1
     */
    public setValue(key: IKey, value: number): void {
        var self = this;
        var index = self.keys.indexOf(key);
        // 这里就不检测value的数值，使用时注意即可
        if (index > -1) {
            self.values[index] = value;
        }
    }

    /**
     * 获取类型的进度
     * @param key 
     */
    public getValue(key: IKey): number {
        var self = this;
        return self.values[self.keys.indexOf(key)];
    }

    /**
     * 获取总进度0~1
     */
    public get value(): number {
        var self = this, sum = 0, values = self.values, ratios = self.ratios;
        for (let i in values) {
            sum += values[i] * ratios[i];
        }
        // 防精度丢失
        return Math.floor(sum * 100 + 0.5) / 100;
    }

    /**
     * 清理
     */
    public clear(): void {
        var self = this;
        self.keys = self.values = self.ratios = null;
    }

    /**
     * 创建一个加载工具
     * @param keys 类型标识
     * @param ratios 每个类型的占比，长度必须等于keys的长度
     */
    public static create(keys: IKey[], ratios: number[]): LoadUtils {
        var len = keys.length;
        if (len > 0 && len == ratios.length) {
            let sum = 0;
            for (let i = 0; i < len; i++)
                sum += ratios[i];
            if (sum !== 1) {
                let sum1 = 0;
                len -= 1;
                for (let i = 0; i < len; i++) {
                    sum1 += ratios[i] /= sum;
                }
                ratios[len] = 1 - sum1;
            }
            return new LoadUtils(keys, ratios);
        }
    }
}