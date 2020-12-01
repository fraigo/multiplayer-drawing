import { type, MapSchema } from "@colyseus/schema";
import { BaseItem } from "../base/BaseItem";
import { BasePlayer } from "../base/BasePlayer";
import { Config } from "../base/Config"

import { ExampleState } from "./ExampleState"

export class ExamplePlayer extends BasePlayer {

    @type("int16")
    x0 = -1;

    @type("int16")
    y0 = -1;

    @type("int16")
    score = 0;

    @type("string")
    selected = "";

    @type("string")
    brushColor = "#000";

    update = function(state:ExampleState){
        
    }

}
