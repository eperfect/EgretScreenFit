/**
 * Created by Saco on 2014/8/2.
 */
module slib
{
    export class GameEvent extends egret.Event
    {
        public static GAME_EVENT_GAMEOVER:string = "game_over";
        public static GAME_EVENT_GAMESTART:string = "game_start";
        public static GAME_EVENT_GAMERESTART:string = "game_restart";
        public static GAME_EVENT_SHARE:string = "game_share";
        public static SET_ASSET_POSITION:string = "set_asset_position";

        public target:any;
        public currentTarget:any;
        public type:string;
        public eventBody:any;

        public constructor(type:string, body?:any)
        {
            this.type = type;
            this.eventBody = body;
            super(type);
        }
    }
}
