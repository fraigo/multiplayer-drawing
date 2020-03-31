import { type, MapSchema } from "@colyseus/schema";
import { BasePlayer } from "../base/BasePlayer";
import { Config } from "../base/Config"

import { ExampleState } from "./ExampleState"

export class ExamplePlayer extends BasePlayer {

    @type("int16")
    x0 = 0;

    @type("int16")
    y0 = 0;

    update = function(state:ExampleState){
        
    }

}
