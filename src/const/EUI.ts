/**
 * UI 枚举 { [key: string]: IUIConfig }
 * interface IUIConfig {
    class: string;              // UI类路径
    mask?: boolean;             // 是否显示遮罩
    banner?: boolean;           // 是否显示banner
    tween?: boolean;            // 显示和隐藏伴随动画

    name?: string;              //自动设置,用于事件打点
    mistouch?: string;          //误触组件名字
    delay?: number;             //延迟显示banner，banner为true时有效    
}
 */
let EUI = {
    /////////////////////////////////////////////////////////////////////
    // 商业化
    WXModelView: {
        class: "side/view/WXModelView.ts",
    },
    SideBoxView:
    {
        class: "side/view/SideBoxView.ts",
        mask: true,
    },
    GoldenEggView:
    {
        class: "side/view/GoldenEggView.ts",
        mask: true,
    },

    /////////////////////////////////////////////////////////////////////
    // 通用UI
    DebugView: {
        class: "script/DebugView.ts"
    },
    LoadingView: {
        class: "script/LoadingView.ts"
    },
    HomeView: {
        class: "script/HomeView.ts"
    },
    RankingView: {
        class: "script/RankingView.ts",
        mask: true
    },
    TrySkinView: {
        class: "script/TrySkinView.ts",
        mask: true
    },
    /////////////////////////////////////////////////////////////////////

    FailView: {
        class: "script/FailView.ts",
        mask: true,
        banner: true
    },
    ReviveView: {
        class: "script/ReviveView.ts",
        mask: true,
        banner: true
    },
    ResultView: {
        class: "script/ResultView.ts",
        mask: true,
        banner: true
    }
}

export default EUI;