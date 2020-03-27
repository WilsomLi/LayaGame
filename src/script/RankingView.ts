import { ui } from "../ui/layaMaxUI";
// import ServerAgency from "../core/ServerAgency";
import UIMgr from "../mgr/UIMgr";
import EUI from "../const/EUI";


/**
 * 排行榜页面
 */
export default class RankingView extends ui.view.RankingViewUI {

    _lastY: number;

    constructor() {
        super();
    }

    //初始化

    onAwake() {
        this.btnRanking.on(Laya.Event.CLICK, this, this.onShare);
        this.wxOpenDataSp.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
        this.wxOpenDataSp.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        this.wxOpenDataSp.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
        // todo
        platform.postMessage({//init data
            key: "reqRankListData",
            message: { keyList: 'user_id,ladder,score,ladderName,ladderUrl', sortList: 'ladder,score' }
        });
    }

    //点击关闭界面
    onClickBg(): void {
        UIMgr.closeUI(EUI.RankingView);
    }

    //点击“查看群排行”按钮
    onShare(): void {
        // ServerAgency.shareCard();
    }

    onTouchMove(e): void {
        if (this._lastY == null) return;
        var y = Laya.stage.mouseY;
        var deltaY = this._lastY - y;
        this._lastY = y;

        platform.postMessage({
            key: "wxRankListMove",
            message: deltaY
        });
    }

    onTouchUp(): void {
        this._lastY = null;
    }


    onTouchDown(): void {
        this._lastY = Laya.stage.mouseY;
    }
}