import SideMsg, { ESMessage } from "./SideMsg";

export default class SideNewMgr
{
    private _boxDatas:IYDHW.GameBase.ISideBoxResult[] = [];

    private static _ins:SideNewMgr = null;
    private constructor(){

    }

    public static get ins():SideNewMgr
    {
        if(this._ins == void 0)
        {
            this._ins = new SideNewMgr();
            this._ins.init();
        }

        return this._ins;
    }

    private init():void
    {
        // let data = {bannerImage: "",
        // frame: 0,
        // frameImage: "",
        // icon: "https://tx.ylxyx.cn/images/202004/422b82ab51e83e8ba1fcc91ec9e29879.jpeg",
        // innerStatus: 0,
        // rectangleImage: "",
        // shieldIos: 0,
        // showImage: "",
        // showTimes: 0,
        // testStatus: 0,
        // title: "飞就完事啦",
        // toAppid: "wxae7b1fd0a6141323",
        // toAppid2: "",
        // toUrl: "",
        // type: "0",
        // _id:123};

        // let data2 = {bannerImage: "",
        // frame: 0,
        // frameImage: "",
        // icon: "https://tx.ylxyx.cn/images/202004/422b82ab51e83e8ba1fcc91ec9e29879.jpeg",
        // innerStatus: 0,
        // rectangleImage: "",
        // shieldIos: 0,
        // showImage: "",
        // showTimes: 0,
        // testStatus: 0,
        // title: "飞就完事啦22222",
        // toAppid: "wxae7b1fd0a6141323",
        // toAppid2: "",
        // toUrl: "",
        // type: "0",
        // _id:12345};

        // this._boxDatas.push(<IYDHW.GameBase.ISideBoxResult>data);
        // this._boxDatas.push(<IYDHW.GameBase.ISideBoxResult>data2);
    }

    public set boxDatas(boxs:IYDHW.GameBase.ISideBoxResult[])
    {
        this._boxDatas = boxs;
    }

    /**
     * 获得boxData数据，建议用getBoxDatasSync
     */
    public getBoxDatas():IYDHW.GameBase.ISideBoxResult[]
    {
        (this._boxDatas.length <= 0) && (console.warn('warn, side box null!!!!!!'))
        return this._boxDatas;
    }

    /**
     * 异步获得盒子数据，建议用这个
     * @param func 
     */
    public getBoxDatasSync(func?:(data:IYDHW.GameBase.ISideBoxResult[]) => void):void
    {
        if(this._boxDatas.length > 0)
        {
            func && func(this._boxDatas);
        }
        else
        {
            (window.ydhw_wx) && (window.ydhw.GetSideBox(this, (info:IYDHW.GameBase.ISideBoxResult[])=>{
                this._boxDatas = info;
                func && func(this._boxDatas);
            }))
        }
    }

    /**
     * 是否还有卖量
     */
    public hasSide(): boolean {
        return this._boxDatas && this._boxDatas.length > 0;
    }

    public showMore(): void {
        SideMsg.notice(ESMessage.S2C_CANCEL);
    }
}