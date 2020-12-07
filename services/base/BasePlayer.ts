import { type, MapSchema } from "@colyseus/schema";
import { BaseItem } from "./BaseItem";
import { Config } from "./Config"
import { State } from "./State"

export class BasePlayer extends BaseItem {
    
    @type({ map: BaseItem})
    items = new MapSchema<BaseItem>();

    @type({ map: BaseItem})
    privateItems = new MapSchema<BaseItem>();

    @type("string")
    name = "Player"

    @type("string")
    lang = "en"

    @type("string")
    UUID = ""

    client = null;

    update = function(state:State){
        
    }

}
