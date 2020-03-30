import { type, MapSchema } from "@colyseus/schema";
import { State } from "../base/State"
import { BaseItem } from "../base/BaseItem"

import { ExamplePlayer } from "./ExamplePlayer"



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
        console.log("Update player",player.index, cmd.type);
        if (cmd.type=="touch"){
            var item=new BaseItem();
            item.init({
                x:cmd.px,
                y:cmd.py,
                radius: 10,
                bgcolor: this.colors[player.index]
            });
            this.items[item.id]=item;    
        }
        if (cmd.type=="drag"){
            var item=new BaseItem();
            item.init({
                x:cmd.px,
                y:cmd.py,
                radius: 5,
                bgcolor: this.colors[player.index]
            });
            this.items[item.id]=item;    
        }
        if (cmd.type=="release"){
            var item=new BaseItem();
            item.init({
                x:cmd.px,
                y:cmd.py,
                radius: 8,
                bgcolor: this.colors[player.index]
            });
            this.items[item.id]=item;    
        }
    }

}