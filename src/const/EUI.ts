/**
 * UI 枚举 view:{id:number,class:string,tween:boolean,adunit:[],res:[]}
 * 参数详情看IUIConfig
 */
let EUI = {
    DebugView: {
        class: "script/DebugView.ts"
    },
    LoadingUI: {
        class: "script/LoadingUI.ts"
    },
    HomeView: {
        class: "script/HomeView.ts"
    },
    RankingView: {
        class: "script/RankingView.ts",
        mask: true
    },
    MoreGameView: {
        class: "script/side/MoreGameView.ts",
        banner: true
    },
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