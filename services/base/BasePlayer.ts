import { type, MapSchema } from "@colyseus/schema";
import { BaseItem } from "./BaseItem";
import { Config } from "./Config"
import { State } from "./State"

export class BasePlayer extends BaseItem {
    
    @type({ map: BaseItem})
    items = new MapSchema<BaseItem>();

    update = function(state:State){
        
    }

}
