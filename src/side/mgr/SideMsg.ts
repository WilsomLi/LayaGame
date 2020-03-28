
/**
 * 卖量消息类型
 * 注：业务层操作
 * 1.C2S为业务层响应数据到卖量层，S2C为卖量层响应数据到业务层，S2S为卖量层自身逻辑处理，业务层勿用；
 * 2.也就是说业务层需要：响应C2S的消息（notice），注册S2C的消息（register）；
 * 3.消息的参数格式，即响应数据类型和接受数据类型请详细看卖量层对应的应用；
 * 4.若还是不清楚如何使用消息可查看LayaGame的默认相对应的使用；
 */
export enum ESMessage {
    C2S_SWITCH,                     // 卖量开关，参数：布尔值（是否开启卖量）
	C2S_RM_SIDES,                   // 卖量屏蔽列表，参数：整型数组或字符串数组（卖量的ID数组）
	C2S_RM_BOARDS,					// 积分墙已领取列表，参数：整型数组或字符串数组（卖量的ID数组）
    C2S_REMOVE,                     // 移除卖量数据，参数：ISideboxData（需要移除的卖量）
	C2S_RESET,                      // 重置卖量数据，参数：无
	// 以下为继承基类才需要的消息，若有自己的一套卖量界面处理逻辑，无需添加
    S2C_REMOVE,                     // 卖量数据可被移除，参数：ISideboxData（可被移除的卖量）
	S2C_CLICK_BTN,                  // 卖量被点击，参数：无
	S2C_CANCEL,						// 卖量取消跳转，参数：无
    S2C_DOT_SERVER,                 // 服务器卖量打点，参数：字符串（卖量界面的标识）、ISideboxDat、布尔值（是否跳转成功）
    S2C_DOT_ALD,                    // 阿拉丁卖量打点，参数：字符串（卖量界面的标识）、额外参数（卖量ID）
    S2C_DOT_EVENT,                  // 后台事件打点，参数：字符串（卖量界面的标识）、字符串（事件打点的paramId）
    // 卖量层自身使用的消息，业务层勿用
	S2S_REMOVE,                     // 移除卖量数据，参数：ISideboxData（需要移除的卖量）
	S2S_REMOVE1,					// 移除积分墙数据，参数：IScoreBoard（需要移除的积分墙）
    S2S_COMPLETE,                   // 配置文件加载完成，参数：IAdConfig（文件内容）
    S2S_COMPLETE1,                  // 积分墙加载完成，参数：积分墙列表
}

/**
 * 事件缓存对象
 */
type TTargetObj = { [key: string]: [Function, any, boolean][] };

/**
 * 卖量消息管理类，该类用于跟外界交互
 */
export default class SideMsg {

    private static $targets: TTargetObj = {};	// 存放所有回调函数
	private static $laters: any = {};			// 存放延迟参数

	/**
	 * 注册对象
	 * @param key 事件的唯一标志
	 * @param obj 注册事件
	 * @param replace 是否替换掉之前的回调
	 */
	private static $register(key: string, obj: [Function, any, boolean]): boolean {
        var isReg = key && key.length > 0;
        if (isReg) {
            let self = SideMsg;
            let targets = self.$targets;
            let target = targets[key] || (targets[key] = []);
            target.push(obj);
            self.$removeLater(key);
        }
		return isReg;
	}

	/**
	 * 移除延迟
	 */
	private static $removeLater(key: string): void {
		var self = SideMsg;
		var laters = self.$laters;
		var params = laters[key];
		if (params !== void 0) {
			delete laters[key];
			self.$notice(key, params);
		}
	}

	/**
	 * 被动触发回调
	 */
	private static $notice(key: string, params: any[]): void {
		var self = SideMsg;
		params.unshift(ESMessage[key]);
		self.notice.apply(self, params);
	}

	/**
	 * 注册事件
	 * @param msg 消息类型
	 * @param call 回调函数
	 * @param thisObj 回调所属对象
     * @param once 是否响应后立马移除
	 */
	public static register(msg: ESMessage, call: Function, thisObj?: any, once?: boolean): boolean {
		return SideMsg.$register(ESMessage[msg], [call, thisObj, once]);
	}

	/**
	 * 通知，触发回调
	 * @param msg 消息类型
	 * @param param 回调参数
	 */
	public static notice(msg: ESMessage, ...params: any[]): void {
        var array = SideMsg.$targets[ESMessage[msg]];
		if (array) {
			array = array.concat();
            for (let i = 0, len = array.length; i < len; i++) {
				let target = array[i];
                target[0].apply(target[1], params);
                // 只响应一次
                if (target[2]) {
                    array.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    }

    /**
     * 移除监听
     * @param msg 消息类型
     * @param call 回调
     * @param thisObj 回调对象
     */
    public static remove(msg: ESMessage, call: Function, thisObj?: any): void {
        var array = SideMsg.$targets[ESMessage[msg]];
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                let target = array[i];
                if (target[0] === call && target[1] === thisObj) {
                    array.splice(i, 1);
                    break;
                }
            }
        }
    }

	/**
	 * 移除某类型的所有事件
	 * @param msg 消息类型
	 */
	public static removeAll(msg: ESMessage): void {
		delete SideMsg.$targets[ESMessage[msg]];
	}

	/**
	 * 是否注册了某个事件
	 */
	public static hasRegister(msg: ESMessage): boolean {
		return !!SideMsg.$targets[ESMessage[msg]];
	}

	/**
	 * 清除所有事件
	 */
	public static clear(): void {
		var self = SideMsg;
		self.$targets = {};
		self.$laters = {};
	}

	/**
	 * 延迟通知，如果已经注册的事件功能同notice，如果未注册，则会等到
	 * 事件注册时立马触发回调
	 * @param msg 消息类型
	 * @param param 回调参数
	 */
	public static noticeLater(msg: ESMessage, ...params: any[]): void {
        var self = SideMsg;
        var key = ESMessage[msg];
		if (self.hasRegister(msg))
			self.$notice(key, params);
		else
			self.$laters[key] = params;
	}
}