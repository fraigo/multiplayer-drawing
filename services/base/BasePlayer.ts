import { type, MapSchema } from "@colyseus/schema";
import { BaseItem } from "./BaseItem";
import { Config } from "./Config"
import { State } from "./State"

export class BasePlayer extends BaseItem {
    
    @type({ map: BaseItem})
    items = new MapSchema<BaseItem>();

    @type("string")
    name = "Player"

    @type("string")
    UUID = ""

    @type("string")
    notification = null;

    @type("uint16")
    notificationId = 0;

    client = null;

    notify = function(msg:string){
        if (msg){
            this.notification = msg;
            this.notificationId = Math.random()*10000;
        }else{
            this.notificationId = 0;
            this.notification = '';
        }
    }

    update = function(state:State){
        
    }

}
