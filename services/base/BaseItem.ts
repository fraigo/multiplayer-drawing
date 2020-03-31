import { Schema, type, MapSchema } from "@colyseus/schema";
import { State } from "./State"

import { Point } from "./Point"

var itemCount = 0;

export class BaseItem extends Schema {

    @type("number")
    id = (itemCount+=1);
    
    @type("number")
    index = 0;
    
    @type("number")
    x = 0;

    @type("number")
    y = 0;

    @type("number")
    radius = 1;

    @type("string")
    stroke = "";

    @type("number")
    lineWidth = 1;

    @type({ map : Point })
    points = new MapSchema<Point>();

    @type("number")
    width = 0;

    @type("number")
    height = 0;

    @type("number")
    health = 100;

    @type("string")
    label = "";

    @type("int16")
    labelx = 0;

    @type("int16")
    labely = 0;

    @type("string")
    labelAlign = null;

    @type("string")
    type = "item";

    @type("string")
    bgcolor = null;

    @type("number")
    fontSize = 24;

    @type("boolean")
    visible = true;

    @type("string")
    sprite = "";

    @type("number")
    spriteX = 0;
    
    @type("number")
    spriteY = 0;

    init (options:any) {
        if (options){
            for(var idx in options){
                this[idx] = options[idx];
            }    
        }
    }


    collission = function(item: BaseItem){
        var radius=0;
        if (!this.visible || !item.visible){
            return false;
        }
        if (this.radius && item.radius){
            radius = this.radius+item.radius;
        }
        if (radius){
            var dist2=(this.x-item.x)*(this.x-item.x)+(this.y-item.y)*(this.y-item.y);
            return dist2<radius*radius;
        }
        return false;
    }

    collisionWith = function(item:BaseItem){

    }

    update = function(state:State){

    }

}


