import { Schema, type } from "@colyseus/schema";

export class Point extends Schema {

    @type("number")
    x = 0;

    @type("number")
    y = 0;

}