import { Room } from "colyseus";
import { Schema, type } from "@colyseus/schema";

import { Config } from "./Config";
import { State } from "./State";


export class BaseRoom<T = State> extends Room<T> {
    
    metadata = {
        opened: false,
        name: "",
        lang: "en"
    }
    playerName = "";
    playerLang = "en";

    maxClients = 4;

    @type(State)
    state = null;

    
    onInit (options:any) {
        this.roomId =  "g" + (Math.round( Math.random() * 60000) + 4096).toString(16);
        console.log("Created!", options);
        this.metadata.opened = true;
        this.metadata.name = options.name+"'s room";
        this.metadata.lang = options.lang;
        this.start();
    }

    start(){
        
    }

    onJoin (client) {
        var name=this.playerName+"";
        var lang=this.playerLang;
        console.log("Player",client.sessionId,name);
        this.state.createPlayer(client.sessionId, name, lang, client);
    }

    requestJoin (options, isNewRoom: boolean) {
        console.log("requestJoin",options.id,this.roomId,options.name);
        if (options.id && options.id!=this.roomId){
            return false;
        }
        this.playerName = options.name;
        this.playerLang = options.lang;
        return (options.create)
            ? (options.create && isNewRoom)
            : this.clients.length > 0 && this.metadata.opened;
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        if (Config.DEBUG && data && !data.idle) {
            console.log(client.sessionId, ":", data);
        }
        this.state.updatePlayer(client.sessionId, data);
        this.metadata.opened = this.state.opened;
    }

    onDispose () {
        console.log("Dispose");
    }

}