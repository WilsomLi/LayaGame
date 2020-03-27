

 /**
 * 数学工具类
 */
export default class MathUtils {
    
    /**
     * 正态分布随机速度（Box-Muller算法） 应用示例：火山喷发
     * @param vec 速度
     * @param randMax 最大随机值
     * @param velWidth 水平方向单位速度（标准差）
     * @param velHeight 垂直方向单位速度（标准差）
     * @param baseVel 基础速度
     */
    static RandomVelocity(vec:Laya.Vector2,randMax:number,velWidth:number,velHeight:number,baseVel:number):void {
        let fRand_r:number = Math.sqrt(-2*Math.log((Math.random()+1)/(randMax+1)));//// √-2ln(a)
        let fRand_t:number = 2*Math.PI*Math.random()/randMax;//2πb
        vec.x = fRand_r*Math.cos(fRand_t)*velWidth;// 随机设置Vx的初始值
        vec.y = fRand_r*Math.sin(fRand_t)*velHeight-baseVel;// 随机设置Vy的初始值
    }

    /**
     * 获取正态分布随机数
     * @param centerVal 中间值
     * @param offsetVal 偏差值
     */
    static GetNumberInNormalDistribution(centerVal:number,offsetVal:number):number {
        return centerVal+(MathUtils.RandomNormalDistribution()*offsetVal);
    }

    static RandomNormalDistribution():number {
        var u=0.0, v=0.0, w=0.0, c=0.0;
        do{
            //获得两个（-1,1）的独立随机变量
            u=Math.random()*2-1.0;
            v=Math.random()*2-1.0;
            w=u*u+v*v;
        }while(w==0.0||w>=1.0)
        //这里就是 Box-Muller转换
        c=Math.sqrt((-2*Math.log(w))/w);
        return u*c;
    }

    /**
     * Calculates the Lerp parameter between of two values.
     * @param from 
     * @param to 
     * @param value 
     */
    public static InverseLerp(from:number,to:number,value:number):number {
        if(from < to) {
            if(value < from) return 0;
            else if(value > to) return 1;
            else {
                value -= from;
                value /= (to - from);
                return value;
            }
        }
        else if(from > to) {
            if(value < to) return 1;
            else if(value > from) return 0;
            else {
                return 1-((value-to)/(from-to));
            }
        }
        return 0;
    }

    /**
     * Interpolates between /min/ and /max/ with smoothing at the limits.
     * @param from 
     * @param to 
     * @param t 
     */
    static SmoothStep(from:number,to:number,t:number):number {
        t = MathUtils.Clamp01(t);
        t = -2*t*t*t+3*t*t;
        return to*t+from*(1-t);
    }

    /**
     * 取两值范围内的值
     */
    static Clamp(value:number,min:number,max:number):number {
        if(value < min)
            return min;
        if(value > max)
            return max;
        return value;
    }

    static Clamp01(value:number):number {
        if(value < 0) return 0;
        if(value > 1) return 1;
        return value;
    }
}