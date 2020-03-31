import { Room } from "colyseus";

import { Config } from "./base/Config";
import { ExampleState } from "./example/ExampleState";
import { BaseRoom } from "./base/BaseRoom";


export class ExampleRoom extends BaseRoom<ExampleState> {
    
    maxClients = 4;



    start(){
        console.log("Started");
        this.setState(new ExampleState());   
    }


}