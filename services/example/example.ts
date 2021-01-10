import { Room } from "colyseus";

import { Config } from "../base/Config";
import { ExampleState } from "./ExampleState";
import { BaseRoom } from "../base/BaseRoom";


export class ExampleRoom extends BaseRoom<ExampleState> {
    

    start(){
        this.maxClients = 8;
        console.log("Started");
        this.setState(new ExampleState());   
    }


}