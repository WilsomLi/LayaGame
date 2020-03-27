import UserData from "../mgr/UserData";

/**
 * 上报格式
 */
interface IParam {
    paramID: string;    // 事件类型，必填
    valueID?: string;   // 事件数值，选填
    extradata?: string; // 额外消息，选填，建议采取逗号分割事件类型
}

/**
 * 数据格式
 */
interface IEvent extends IParam {
    time: number;       // 时间
    eventID: string;    // 面板
}

// stone@ADD20181123: 通用数据统计;
let DataStatisticsJs = {
    dataTemp: [],   // 历史记录，二维数组
    init: function () {
        this.maxPostLength = 50; // 每次最大上传条数;
        this.commitDelayTime = 20; // 每次上传时间间隔;
        this.cacheMaxLength = 10000; // 最大本地存储条数;
        this.database = [];
        this.commit();
        this.setCurrentTime();
        this.startSchedule();
        this._scheduleId = 0;
    },

    setCurrentTime: function () {
        const timestamp = this.getTime();
        this.intervalTime = timestamp;
    },

    isFixIntervalTime: function () {
        const timestamp = this.getTime();
        const diffTime = Math.floor(timestamp - this.intervalTime)
        if (diffTime > this.commitDelayTime) {
            return true;
        }
        return false;
    },
    /**
     * 检测旧数据
     */
    checkTemp: function () {
        var datas = this.dataTemp.shift();
        if (datas) {
            this.database.concat(datas);
        }
    },
    /**
     * 提交数据
     */
    commit: function () {
        var commitData = <any[]>this.database;
        if (commitData.length > 0) {
            let send = commitData.splice(0, this.maxPostLength);
            this.dataTemp.push(send);       // 存放当前发送的数据列表
            this.commitReq(send);           // 上传当前打点列表ui
            // 下次commit之前检测是否有旧数据
            Laya.timer.once((this.commitDelayTime - 1) * 1000, this, this.checkTemp);
        }
    },
    /**
     * 上传数据
     * @param cData 
     */
    commitReq(cData: IEvent[]): void {
        //TODO
        // var msg = new pb.C2S_Event();
        // var events = msg.events = [];
        // var userType = UserData.instance.isNewPlayer ? 1 : 2;
        // var length = cData.length;
        // for (var i = 0; i < length; i++) {
        //     let data = cData[i];
        //     let obj = new pb.C2S_Event.PlayerEvent();
        //     obj.eventID = data.eventID;
        //     obj.paramID = data.paramID;
        //     obj.valueID = data.valueID;
        //     // obj.channelID = GameConst.OwnChannel;
        //     obj.userType = userType;
        //     obj.extradata = data.extradata;
        //     obj.time = data.time;
        //     events.push(obj);
        // }
        // NetMgr.instance.send(msg);
    },
    // 获取日期;
    getTime: Date.now,

    startSchedule: function () {
        this.stopSchedule();
        this._scheduleId = setInterval(this.commit.bind(this), this.commitDelayTime * 1000);
    },
    stopSchedule: function () {
        if (this._scheduleId > 0) {
            clearInterval(this._scheduleId);
            this._scheduleId = 0;
        }
    },
    /**
     * 记录参数
     * @param eventID 打印一级事件，即打印的面板类型
     * @param param 时间类型
     * @param defParam 是否加上默认参数
     */
    logEvent: function (eventID: string, param: IParam, defParam?: boolean) {
        var data = <IEvent>Object.create(null);
        var extra = param.extradata || '';
        // 玩家默认参数：ID + 关卡
        if (defParam) {
            let ince = UserData.instance;
            extra && (extra = ',' + extra);
            extra = 'accountId:' + ince.accountId + ',level:' + ince.level + extra;
        }
        var paramID = param.paramID || '';
        if (paramID) {
            paramID = paramID.replace(/%u/i, this.getNewName());
        }
        data.eventID = eventID;
        data.time = this.getTime();
        data.paramID = paramID;
        data.valueID = param.valueID || '';
        data.extradata = extra;
        this.database.push(data);
        // console.log('新后台：', data);
    },
    getNewName: function () {
        return UserData.instance.isNewPlayer ? 'new' : 'old';
    }
}

export default class DataStatistics {

    //初始化
    static init() {
        DataStatisticsJs.init();
    }

    /**
     * 打印事件（事件上报服务器-新后台版本）
     * @param eventID 事件ID
     * @param param 点击的类型参数，可携带%u替换新老用户
     * @param defParam 是否加上默认参数（玩家的基础参数，暂只有玩家ID），默认true
     */
    public static logEvent(eventID: string, param: IParam, defParam?: boolean): void {
        DataStatisticsJs.logEvent(eventID, param, defParam !== false);
    }

    /**
     * 清除已发的打印事件
     */
    public static clearSaveCommit(): void {
        DataStatisticsJs.dataTemp.shift();
    }
}