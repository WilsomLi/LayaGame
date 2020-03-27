import Player from "../entity/Player";
import GameMgr from "../../mgr/GameMgr";

export interface BaseState {
    onEnter(player:Player):void;
    onRuning(player:Player):void;
    onExit(player:Player):void;
}

export enum FSMState {
    None,
    GrabBallState,
    AttackState,
    AttackHoldBallState,
    DefenseState
}

/**
 * AI 有限状态机
 */
export class ActionFSM {

    constructor(player:Player){
        this._stateMap = {};
        this._player = player;
        this._isRunning = false;
    };

    private _stateMap = null;
    private _curState:BaseState;
    private _player:Player;
    private _isRunning:boolean;
    private _aiInterval:number = 1;
    private _nextCheckFrame:number = 0;
    private _curFrame:number = 0;

    changeState(type:FSMState):void {
        let state:BaseState = this._stateMap[type];
        if(state == null) {
            switch(type) {
                // case FSMState.GrabBallState:
                //     state = new GrabBallState();
                //     break;
                // case FSMState.AttackState:
                //     state = new AttackState();
                //     break;
                // case FSMState.AttackHoldBallState:
                //     state = new AttackHoldBallState();
                //     break;
                // case FSMState.DefenseState:
                //     state = new DefenseState();
                //     break;
                default:
                    break;
            }
            this._stateMap[type] = state;
        }
        if(this._curState)
            this._curState.onExit(this._player);
        state.onEnter(this._player);
        this._curState = state;
    }

    setRunning(value:boolean):void {
        this._isRunning = value;
    }

    isRunning():boolean {
        return this._isRunning;
    }

    setAIInterval(val:number):void {
        this._aiInterval = val;
    }

    updateLogic():void {
        if(!this._isRunning || !this._curState) return;
        this._curFrame ++;
        if(this._curFrame < this._nextCheckFrame) return;
        if(this._player.isDead) return;

        this._curState.onRuning(this._player);
        this._nextCheckFrame = this._curFrame + this._aiInterval;
    }
}