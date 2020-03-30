import { type, MapSchema } from "@colyseus/schema";
import { GameState } from "./GameState"
import { BaseItem } from "./BaseItem"
import { BasePlayer } from "./BasePlayer"



export class State extends GameState {
    @type({ map: BasePlayer })
    players = new MapSchema<BasePlayer>();
    @type({ map: BaseItem })
    items = new MapSchema<BaseItem>();

    STATE_START = 0;
    STATE_PLAYING = 1;
    STATE_FINISH = 2;

    playerCount = 0;
    maxPlayers = 4;
    minPlayers = 1;
    playerSlots = [];
    state = this.STATE_START;
    opened = true;
    time = (new Date()).getTime();
    last_time = this.time;
    diff = 0;
    
    createPlayer (id: string) {
        if (this.state == this.STATE_FINISH){
            return;
        }
        if (this.playerCount>=this.maxPlayers){
            return;
        }
        this.state = this.STATE_PLAYING;
        var index = this.playerCount;
        for(var i=0;i<this.maxPlayers;i++){
            if (!this.playerSlots[i]){
                index = i;
                break;
            }
        }
        var newItem = new BasePlayer();
        newItem.index =  index;
        this.players[id] = newItem;
        this.playerSlots[index] = true;
        this.playerCount++;
        console.log("New player idx:",index," count:",this.playerCount);
        this.initPlayer(newItem);
    }

    initPlayer (player: BasePlayer){

    }

    removePlayer (id: string) {
        if (!this.players[id]){
            return;
        }
        this.playerSlots[this.players[id].index]=false;
        delete this.players[id];
        this.playerCount--;
    }

    updatePlayer (id: string, cmd: any) {

    }


}