/**
 * 为对象添加目录
 * @param obj 
 * @param root 
 */
let addRoot = function (obj: { [key: number]: string }, root: string) {
    for (let i in obj) {
        obj[i] = root + obj[i];
    }
};

let AtlasRoot = "nativescene/res/";
let SceneRoot = "nativescene/scene/Conventional/";
let SkinRoot = SceneRoot + "Assets/Resources/Texture2D/";
let SoundRoot = "nativescene/sound/";
let CfgRoot = "nativescene/map/";
let JsonRoot = "native/cfg/";

// 合图文件
let EAtlas = {
    Game: "game.atlas",
};
addRoot(EAtlas, AtlasRoot);

// 3D精灵文件
let ESprite3D = {
    MainCamera: "MainCamera.lh",
    DirectionalLight: "DirectionalLight.lh",
    Effect:"Effect.lh",
};
addRoot(ESprite3D, SceneRoot);

// 配置文件
let EJson = {
    GlobalCfg : "globalcfg.json",
    LevelCfg : "level.json",
    Player : "player.json",
    ShopCfg : "shop.json",
    NpcCfg : "npcConfig.json",
}
addRoot(EJson, JsonRoot);

// 音效文件
let ESound = {
    Bgm: "bgmusic.mp3",
    BtnClick: "click.mp3"
};
addRoot(ESound, SoundRoot);

export { SceneRoot, SkinRoot, ESprite3D, ESound, EJson, EAtlas, CfgRoot};

