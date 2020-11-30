import { Room } from "colyseus";

import { Config } from "../base/Config";
import { ExampleState } from "./ExampleState";
import { BaseRoom } from "../base/BaseRoom";


export class ExampleRoom extends BaseRoom<ExampleState> {
    
    maxClients = 6;

    start(){
        console.log("Started");
        this.setState(new ExampleState());   
    }


}