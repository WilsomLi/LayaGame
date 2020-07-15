declare namespace IYDHW {
    export namespace P360{
        export interface IP360SDK {

        }
        export interface IP360Platform {

        }

        export interface ISDK extends IP360SDK, ICommonSDK { }
        export interface IPlatform extends IP360Platform, ICommonPlatform { }
    }
}