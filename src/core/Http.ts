
import GameConst  from "../const/GameConst";
import UserData from "../mgr/UserData";
import Utils from "../util/Utils";

export default class Http {

    /**
     * 短链接
     * @param url URL地址
     * @param data 数据
     * @param callfunc 结束回调
     * @param post 是否POST方法
     * @param isSendMe 是否发送自己数据
     * @param retryCnt 失败重试次数
     */
    public static sendUrl(url: string, data: any, callfunc?: any, post: boolean = false, isSendMe: boolean = true, retryCnt:number=1): void {
        if (data == null) {
            data = {};
        }

        if (isSendMe) {
            //每个接口都包含appid, account_id
            data.appid = platform.appId;
            // let accountid = UserData.instance.accountId;
            // if (!Utils.isEmpty(accountid)) {
            //     data.account_id = accountid;
            // }
        }

        //解析请求路由以及格式化请求参数
        let sendtext: string = "";
        if (!post) {
            let first: boolean = true;
            for (let k in data) {
                if (first) {
                    first = false;
                    sendtext += '?';
                } else {
                    sendtext += '&';
                }
                sendtext += (k + '=' + data[k]);
            }
        }

        //组装完整的URL
        let requestURL: string = url + sendtext;
        if (GameConst.NetLog)
            console.log(`requestURL = ${requestURL}`);

        let xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 5000;

        xhr.once(Laya.Event.COMPLETE, this, (data: any) => {
            let content = JSON.parse(data);
            if (GameConst.NetLog)
                console.log('complete data = ', content);
            if (content) {
                callfunc && callfunc(content);
            } else {
                console.log('json解析失败了 ！ data =' + data);
            }
        });

        xhr.once(Laya.Event.ERROR, this, (e: any) => {
            console.error('error=' + e);
            //超时错误重新请求
            if(retryCnt > 1) {
                retryCnt --;
                Http.sendUrl(url,data,callfunc,post,isSendMe,retryCnt);
            }
            else {
                callfunc && callfunc(e);
            }
        });

        if (post) {
            if (GameConst.NetLog)
                console.log('xhr post data = ', data);
            xhr.send(requestURL, data, 'post', 'jsonp');
        } else {
            xhr.send(requestURL, '', 'get', 'jsonp');
        }
    }
}