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
let MapRoot = "nativescene/map/";
let JsonRoot = "nativescene/";

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
    Configs:"configs.json"
}

let ECfg = {
    GlobalCfg : "globalcfg",
    LevelCfg : "level",
    Player : "player",
    ShopCfg : "shop",
}
addRoot(EJson, JsonRoot);

// 音效文件
let ESound = {
    Bgm: "bgmusic.mp3",
    BtnClick: "click.mp3"
};
addRoot(ESound, SoundRoot);

export { SceneRoot, SkinRoot, ESprite3D, ESound, EJson, ECfg, EAtlas, MapRoot};

