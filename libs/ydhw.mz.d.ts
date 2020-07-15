declare namespace IYDHW {
    export namespace Meizu {
        export interface IMeizuSDK {

        }
        export interface IMeizuPlatform {

        }

        export interface ISDK extends IMeizuSDK, ICommonSDK { }
        export interface IPlatform extends IMeizuPlatform, ICommonPlatform { }
    }
}