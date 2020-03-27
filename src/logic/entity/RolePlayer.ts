
import RoleMoveCtrl from "../ctrl/RoleMoveCtrl";
import GameMgr from "../../mgr/GameMgr";
import { ESprite3D } from "../../const/ERes";
import Utils from "../../util/Utils";
import CfgDataMgr from "../../mgr/CfgDataMgr";
import UserData from "../../mgr/UserData";
import BaseEntity, { EntityType } from "./BaseEntity";
import Player from "./Player";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";

/**
 * 自己
 */
export default class RolePlayer extends Player {
    
    onAwake():void {
        this.isRole = true;
        super.onAwake();
        this.playerName = "你";
    }

    updateLogic(now:number):void {
        super.updateLogic(now);
    }
}