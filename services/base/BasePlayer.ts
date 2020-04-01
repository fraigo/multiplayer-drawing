import { type, MapSchema } from "@colyseus/schema";
import { BaseItem } from "./BaseItem";
import { Config } from "./Config"
import { State } from "./State"

export class BasePlayer extends BaseItem {
    
    @type({ map: BaseItem})
    items = new MapSchema<BaseItem>();

    @type("string")
    name = "Player"

    client = null;

    update = function(state:State){
        
    }

}
