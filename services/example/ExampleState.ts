import { type, MapSchema } from "@colyseus/schema";
import { State } from "../base/State"
import { BaseItem } from "../base/BaseItem"

import { ExamplePlayer } from "./ExamplePlayer"
import { Point } from "../base/Point";



export class ExampleState extends State {

    colors = [
        "#c00",
        "#0c0",
        "#00c",
        "#c0c"
    ]

    initPlayer (player: ExamplePlayer){
        console.log("Init player");
    }

    updatePlayer (id: string, cmd: any) {
        var player=this.players[id];
        //console.log("Update player",player.index, cmd.type);
        if (cmd.type=="touch"){
            console.log("touch",cmd.px,cmd.py);
            var item=new BaseItem();
            item.init({
                x:cmd.px,
                y:cmd.py,
                radius: 5,
                bgcolor: this.colors[player.index]
            });
            player.x0=cmd.px;
            player.y0=cmd.py;
            this.items[item.id]=item;    
        }
        if (cmd.type=="drag"){
            var item=new BaseItem();
            item.init({
                x:cmd.px,
                y:cmd.py,
                stroke: this.colors[player.index],
                radius: 5,
                lineWidth: 10,
                bgcolor: this.colors[player.index]
            });
            var p0=new Point();
            p0.x=player.x0;
            p0.y=player.y0;
            var p1=new Point();
            p1.x=cmd.px;
            p1.y=cmd.py;
            player.x0=cmd.px;
            player.y0=cmd.py;

            item.points["p0"]=p0;
            item.points["p1"]=p1;

            this.items[item.id]=item;    
        }
        if (cmd.type=="release"){
            var item=new BaseItem();
            item.init({
                x:cmd.px,
                y:cmd.py,
                radius: 5,
                bgcolor: this.colors[player.index]
            });
            this.items[item.id]=item;    
        }
    }

}