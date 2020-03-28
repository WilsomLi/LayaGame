import UserData from "../mgr/UserData";

// 解释型声明
declare var wx: any;
declare var qq: any;

/**
 * 是否微信环境
 */
const support = typeof wx !== 'undefined' || typeof qq !== 'undefined';

/**
 * 阿拉丁
 */
export default class AldSDK {


    public static timeId: number;               // 玩家的时间ID
    public static loadingTime: number;          // 进入loading时间
    public static homeTime: number;             // 进入主页时间

    private static $newName: string;            // 用户标识

    /**
     * 发送阿拉丁打点
     * @param eventName 打点名名称，用%u来表示“新/老用户”字段
     * @param defaultData 是否加上默认数据，目前仅玩家ID，默认true
     * @param params 额外参数
     */
    public static aldSendEvent(eventName: string, defaultData?: boolean, params?: any): void {
        if (support) {
            let aldSendEvent = (<any>wx).aldSendEvent;
            if (aldSendEvent) {
                params || (params = {});
                // 添加默认参数
                if (defaultData !== false) {
                    let uInc = UserData.instance;
                    params["玩家ID"] = uInc.accountId;
                    params["关卡ID"] = uInc.level;
                }
                params.timeId = AldSDK.timeId;
                aldSendEvent(eventName.replace(/%u/i, AldSDK.getNewName()), params);
            }
        }
        // 调试用 todo
        console.log('打点：' + eventName.replace(/%u/i, AldSDK.getNewName()));
    }

    /**
     * 阿拉丁关卡打点开始
     * @param level 当前关卡
     */
    public static aldStageStart(level: number): void {
        // console.log('关卡开始', level + '-' + wave);
        if (support) {
            let aldStage = (<any>wx).aldStage;
            if (aldStage) {
                let id = level + '';
                aldStage.onStart({
                    stageId: id,
                    stageName: id,
                    userId: UserData.instance.accountId + ''
                });
            }
        }
    }

    /**
     * 阿拉丁关卡打点结束
     * @param level 当前关卡
     * @param clear 是否通关
     */
    public static aldStageEnd(level: number, clear: boolean): void {
        // console.log('关卡结束', level + '-' + wave, clear ? '成功' : '失败');
        if (support) {
            let aldStage = (<any>wx).aldStage;
            if (aldStage) {
                let id = level + '';
                aldStage.onEnd({
                    stageId: id,
                    stageName: id,
                    event: clear ? 'complete' : 'fail',
                    userId: UserData.instance.accountId + '',
                    params: {
                        desc: '游戏通关：' + (clear ? '成功' : '失败')
                    }
                });
            }
        }
    }

    /**
     * 获取新老用户标识
     */
    public static getNewName(): string {
        return AldSDK.$newName || (AldSDK.$newName = (UserData.instance.isNewPlayer ? '新' : '老') + '用户');
    }

    /**
     * 获取资源加载到显示首页的时长
     */
    public static getLoadTime(): number {
        return AldSDK.homeTime - AldSDK.loadingTime;
    }

    /**
     * 重置用户
     */
    public static resetUser(): void {
        AldSDK.$newName = null;
    }
}