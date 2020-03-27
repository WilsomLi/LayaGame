
/**
 * 文本样式，外部使用
 */
interface IStyle {
    text: string;   // 文本内容
    size?: number;  // 文字尺寸，默认富文本的尺寸
    font?: string;  // 字体名称，默认富文本的字体
    color?: string; // 文字颜色，默认富文本的颜色
    bold?: boolean; // 是否加粗
    italic?: boolean;// 是否斜体
}

/**
 * 文本样式2，内部使用（字段非空，且整合字体大小和字体名）
 */
interface IStyle2 {
    text: string;       // 文本内容
    size: number;       // 文字尺寸
    font: string;       // 字体名称
    color: string;      // 文字颜色
    bold: boolean;      // 是否加粗
    italic: boolean;    // 是否斜体
    rich: number;       // 富文本样式状态，二进制数，2^0表示字体尺寸，2^1表示字体名称，2^2表示字体颜色
}

/**
 * 转换成内部类型
 * @param style 
 */
const getStyle = function (style: IStyle, label: RichLabel): IStyle2 {
    var text = style.text;
    if (text) {
        let ret = <IStyle2>{}, rich = 0;
        let size = style.size, color = style.color, font = style.font;
        ret.text = text;
        ret.size = size > 0 ? size : (rich += 1, label.size);
        ret.font = font ? font : (rich += 2, label.font);
        ret.color = color ? color : (rich += 4, label.color);
        ret.rich = rich;
        return ret;
    }
}

/**
 * 返回字体描述
 * @param style 
 */
const fontDesc = function (style: IStyle2): string {
    var font = '';
    if (style.italic)
        font += "italic ";
    if (style.bold)
        font += "bold ";
    font += style.size + 'px ';
    font += style.font;
    return font;
}

/**
 * 测量文本宽度
 * @param text 要测量的文本内容。
 * @param style 格式
 */
const measureText = function (text: string, style: IStyle2): number {
    return Laya.Browser.measureText(text, fontDesc(style)).width;
}

/**
 * 格式化类型
 */
const formatStyle = function (str: string): IStyle {
    var attrs = ['size', 'font', 'color', 'bold', 'italic'], style = <IStyle>{};
    for (let i = 0, len = attrs.length; i < len; i++) {
        let attr = attrs[i];
        let reg = new RegExp("\\s" + attr + "\\s?=\\s?([^\\s>]*)");  // example: /\ssize\s?=\s?([^\s>]*)/
        let mat = str.match(reg);
        if (mat) {
            let v: any = mat[1];
            // 数值类型
            if (i == 0)
                v = Number(v);
            // 布尔类型，除'true'外都是false
            else if (i == 3 || i == 4)
                v = v === 'true';
            style[attr] = v;
        }
    }
    return style;
}

/**
 * 富文本，文本规则："默认文字<font color=#fc34dc size=30 font=Arial>特殊文字</font>默认文字"
 * 实现原理：画布绘制文字，请注意勿对画布进行其他操作，以免异常
 */
export default class RichLabel extends Laya.Script {

    /** @prop {name:text,tips:"带格式文本",type:string}*/
    /** @prop {name:size,tips:"字体大小",type:int}*/
    /** @prop {name:font,tips:"字体名称",type:string}*/
    /** @prop {name:color,tips:"字体颜色",type:string}*/
    /** @prop {name:bold,tips:"是否加粗",type:boolean,default:false}*/
    /** @prop {name:italic,tips:"是否斜体",type:boolean,default:false}*/
    /** @prop {name:leading,tips:"行间距（大于等于0）",type:int,default:0}*/

    public owner: Laya.Sprite;
    private $caches: any[] = [];        // 缓存
    private $styles: IStyle2[];         // 样式
    private $graphics: Laya.Graphics;   // 画布
    private $hasCahnged: boolean;       // 是否发生属性变化
    private $width: number = 0;         // 绘画的宽度
    private $height: number = 0;        // 绘画的高度

    /**
     * 重写
     */
    public onEnable(): void {
        var self = this, owner = self.owner;
        if (!(owner instanceof Laya.Sprite))
            throw "Owner is not instanceof Sprite";
        // UI相关重置宽度计算方法
        if (owner instanceof Laya.UIComponent) {
            let attr0 = 'measureWidth';
            let func0 = owner[attr0];
            let attr1 = 'measureHeight';
            let func1 = owner[attr1];
            owner[attr0] = function () {
                return Math.max(self.$width, func0.call(owner));
            };
            owner[attr1] = function () {
                return Math.max(self.$height, func1.call(owner));
            };
        }
        self.$graphics = owner.graphics;
        self.laterRefresh();
    }

    /**
     * 重写
     */
    public onDisable(): void {
        var self = this;
        self.$caches = self.$styles = self.$graphics = null;
    }

    /**
     * 修改缓存
     * @param index 缓存下标
     * @param value 缓存值
     */
    private setCache(index: number, value: any): void {
        var self = this, caches = self.$caches;
        if (caches[index] !== value) {
            caches[index] = value;
            self.updateStyle();
        }
    }

    /**
     * 延迟刷新，当属性频繁变动时，保证只刷新一次即可
     */
    private laterRefresh(): void {
        var self = this, timer = Laya.timer;
        timer.clear(self, self.refresh);
        timer.frameOnce(2, self, self.refresh);
    }

    //// UI相关功能 ////

    /**
     * 设置文本
     */
    public set text(text: string) {
        var self = this, caches = self.$caches;
        if (caches[0] !== text) {
            caches[0] = text;
            self.parseText();
        }
    }

    /**
     * 获取文本
     */
    public get text(): string {
        return this.$caches[0] || '';
    }

    /**
     * 设置字体大小
     */
    public set size(size: number) {
        this.setCache(1, size);
    }

    /**
     * 获取字体大小
     */
    public get size(): number {
        return this.$caches[1] || Laya.Text.defaultFontSize;
    }

    /**
     * 设置字体名称
     */
    public set font(font: string) {
        this.setCache(2, font);
    }

    /**
     * 获取字体名称
     */
    public get font(): string {
        return this.$caches[2] || Laya.Text.defaultFont;
    }

    /**
     * 设置字体颜色
     */
    public set color(color: string) {
        this.setCache(3, color);
    }

    /**
     * 获取字体颜色
     */
    public get color(): string {
        return this.$caches[3] || '#0';
    }

    /**
     * 是否加粗
     */
    public set bold(bold: boolean) {
        this.setCache(4, bold);
    }

    /**
     * 是否加粗
     */
    public get bold(): boolean {
        return !!this.$caches[4];
    }

    /**
     * 是否斜体
     */
    public set italic(italic: boolean) {
        this.setCache(5, italic);
    }

    /**
     * 是否斜体
     */
    public get italic(): boolean {
        return !!this.$caches[5];
    }

    /**
     * 设置行间距
     */
    public set leading(leading: number) {
        var self = this;
        var caches = self.$caches;
        if (caches[6] !== leading) {
            let sub = leading - self.leading;
            caches[6] = leading;
            self.refreshH(sub);
        }
    }

    /**
     * 设置行间距
     */
    public get leading(): number {
        var leading = this.$caches[6];
        return leading > 0 ? leading : 0;
    }

    /**
     * 返回宽度
     */
    public get width(): number {
        return this.$width;
    }

    /**
     * 返回高度
     */
    public get height(): number {
        return this.$height;
    }

    //// 绘画相关 ////

    /**
     * 尺寸重置
     */
    protected onResize(): void {
        var owner = this.owner;
        var getw = owner['_getWidget'];
        if (typeof getw === 'function')
            (<Laya.Widget>getw.call(owner)).resetLayout();
    }

    /**
     * 更新样式，自身非text的UI属性变化时，需要修改伴随富文本样式的样式
     */
    protected updateStyle(): void {
        var self = this, styles = self.$styles;
        if (styles) {
            let bool = false, size = self.size, font = self.font,
                color = self.color, bold = self.bold, italic = self.italic;
            for (let i = 0, len = styles.length; i < len; i++) {
                let style = styles[i], rich = style.rich;
                if (rich > 0) {
                    // 2的幂次方比较
                    // 尺寸
                    if ((rich & 1) == 1) {
                        if (style.size != size) {
                            style.size = size;
                            bool = true;
                        }
                    }
                    // 字体
                    if ((rich & 2) == 2) {
                        if (style.font != font) {
                            style.font = font;
                            bool = true;
                        }
                    }
                    // 颜色
                    if ((rich & 4) == 4) {
                        if (style.color != color) {
                            style.color = color;
                            bool = true;
                        }
                    }
                    // 加粗
                    if ((rich & 8) == 8) {
                        if (style.bold != bold) {
                            style.bold = bold;
                            bool = true;
                        }
                    }
                    // 斜体
                    if ((rich & 16) == 16) {
                        if (style.italic != italic) {
                            style.italic = italic;
                            bool = true;
                        }
                    }
                }
            }
            self.$hasCahnged = bool;
            self.laterRefresh();
        }
    }

    /**
     * 刷新垂直高度
     */
    protected refreshH(sub: number): void {
        var self = this, graphics = self.$graphics;
        if (graphics) {
            let cmds = <Laya.FillTextCmd[]>(<any>graphics)._cmds;
            if (cmds) {
                let height = 0, call = self.$caches[7];
                for (let i = 0, len = cmds.length; i < len; i++) {
                    let cmd = cmds[i];
                    if (cmd.y > 0) {
                        let nextY = cmd.y + sub;
                        let nextH = nextY + parseInt(cmd.font);
                        cmd.y = nextY;
                        if (nextH > height)
                            height = nextH;    
                    }
                }
                self.$height = height;
                self.onResize();
                // 执行回调
                call && call.call(caches[8]);
            }
        }
    }

    /**
     * 解析文本
     */
    protected parseText(): void {
        var reg = /(<font.*?>)(.*?)<\/font>/g, array: RegExpExecArray, text: string = this.$caches[0];
        var styles = [], startI = 0;
        // array的格式说明：0解析出来的带格式文本，1样式，2文本，index匹配内容位于text的坐标
        while (array = reg.exec(text)) {
            let index = array.index;
            // 存放非格式文本
            if (index > 0) {
                styles.push({ text: text.substring(startI, index) });
            }
            // 存放格式文本
            let texti = array[2];
            if (texti) {
                let style = formatStyle(array[1]);
                style.text = texti;
                styles.push(style);
            }
            // 更新下个匹配的起点
            startI = index + array[0].length;
        }
        // 剩余非格式文本
        text = text.substr(startI);
        text && styles.push({ text });
        this.setStyle(styles);
    }

    /**
     * 设置文本样式
     * @param styles 
     */
    public setStyle(styles: IStyle[]): void {
        var self = this, styles2 = self.$styles = [];
        for (let i = 0, len = styles.length; i < len; i++) {
            let style = getStyle(styles[i], self);
            style && styles2.push(style);
        }
        self.$hasCahnged = true;
        self.laterRefresh();
    }

    /**
    * 刷新界面
    */
    public refresh(): void {
        var self = this, graphics = self.$graphics;
        if (graphics && self.$hasCahnged) {
            let styles = self.$styles;
            if (styles) {
                // let width = self.owner._width, leading = self.leading, //TER-v2.2.0
                let width = self.owner.width, leading = self.leading,
                    caches = self.$caches, call = caches[7],
                    x = 0, y = 0,           // 绘制坐标
                    w = 0, wi = 0, hi = 0;  // 实际宽度，单行的宽度，单行的高度
                /**
                 * 设置单行宽度，同时修改实际宽度
                 * @param v 
                 */
                let setWi = function (v) {
                    v > wi && (wi = v, v > w && (w = v));
                };
                self.$hasCahnged = false;
                graphics.clear(true);
                for (let i = 0, len = styles.length; i < len; i++) {
                    let style = styles[i];
                    let text = style.text;
                    let size = style.size;
                    let color = style.color;
                    /**
                     * 绘画文字，并返回宽度
                     * @param cont 绘画内容
                     */
                    let fillText = function (cont: string): number {
                        graphics.fillText(cont, x, y, fontDesc(style), color, 'left');
                        return mesure(cont);
                    };
                    /**
                     * 测量文字
                     * @param cont 绘画内容
                     */
                    let mesure = function (cont: string) {
                        return measureText(cont, style);
                    };
                    size > hi && (hi = size);
                    // 当owner限制宽度时需要自动换行
                    if (width) {
                        let txtI = 0;   // txet裁剪位置
                        for (let i = txtI, len = text.length; i < len; i++) {
                            let isNext = text[i] == '\n';
                            if (isNext || mesure(text.substring(txtI, i + 1)) + x > width) {
                                if (!isNext && x + i == 0)
                                    throw 'Excessive Font Szie ' + size;    // 字体宽度大于容器宽度
                                let cont = text.substring(txtI, i - Number(isNext));
                                if (cont) {
                                    setWi(fillText(cont));
                                }
                                // 进入下一行
                                x = 0;
                                y += hi + leading;
                                txtI = i;
                                isNext || i--;  // 换行不减
                                // 宽高修改
                                wi > w && (w = wi);
                                wi = 0;     // 宽度重新计算
                                hi = size;  // 高度等于当前尺寸
                            }
                            else if (i == len - 1) {
                                let cont = text.substring(txtI);
                                if (cont) {
                                    x += fillText(cont);
                                    setWi(x);
                                }
                            }
                        }
                    }
                    else {
                        let idx;
                        while ((idx = text.indexOf('\n')) > -1) {
                            let cont = text.substr(0, idx);
                            setWi(x + fillText(cont));
                            text = text.substr(idx + 1);
                            // 进入下一行
                            x = 0;
                            y += hi + leading;
                        }
                        // 剩余部分继续绘制
                        if (text) {
                            x += fillText(text);
                            setWi(x);
                        }
                    }
                }
                self.$width = w;
                self.$height = y + hi;
                self.onResize();
                // 执行回调
                call && call.call(caches[8]);
            }
        }
    }

    /**
     * 设置改变回调
     * @param call 回调，参数是新的宽度
     * @param thisObj 回调所属对象
     */
    public setChange(call: (width: number) => void, thisObj?: any): void {
        var caches = this.$caches;
        caches[7] = call;
        caches[8] = thisObj;
    }

    /**
     * 转化为格式化富文本
     * @param style 
     */
    public static rich(style: IStyle): string {
        var text = style.text;
        if (text) {
            let str = '<font';
            let attrs = Object.keys(style)
            for (let i in attrs) {
                let attr = attrs[i];
                if (attr != 'text') {
                    str += ' ' + attr + '=' + style[attr];
                }
            }
            return str + '>' + text + '</font>';
        }
    }
}