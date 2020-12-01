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
        "#c0c",
        "#0cc",
        "#8c0"
    ]

    palette = [
        "#000",
        "#A00",
        "#080",
        "#00A",
        "#620",
        "#e72",
        "#fd3",
        "#8ce",
        "#7ca",
        "#fcc",
        "#aaa",
        "#fff",
    ]

    words={
        "en" : [
            "icecream",
            "tree",
            "tree",
        ],
        "es" : [
            "helado",
            "banana",
            "caramelo",
            "sandia",
            "uvas",
            "uvas",
            "pastel",
            "chocolate",
        ],
    }

    currentId = '';

    word : string = null;
    winner : string = null;
    selLetters : Array<string> = [];
    currentLetters : Array<string> = [];
    realLetters : Array<string> = [];

    getWord(lang){
        let words=this.words[lang];
        let idx=Math.round(Math.random()*(words.length-1));
        console.log('selection',idx,words.length)
        return words[idx];
    }
    
    getLetters(word: string): Array<string>{
        let altLetters = "aeioucdglmnprst".split("");
        let wordLetters : Array<string> = word.split("").filter((item, pos) => word.indexOf(item) == pos);
        let allLetters: Array<string> = wordLetters.concat(altLetters);
        let letters : Array<string> = allLetters.filter((item, pos) => allLetters.indexOf(item) == pos);
        letters.sort();
        let tries = 0;
        while(letters.length>12){
            let idx = Math.round(Math.random()*12);
            if (wordLetters.indexOf(letters[idx])==-1){
                let letter=letters.splice(idx,1);
            }
            tries++;
        }
        return letters;
    }

    start(){
        if (this.word==null){
            this.word = this.getWord('es');
            console.log("WORD",this.word);    
        }
        this.realLetters = this.word.split("");
        this.currentLetters = this.realLetters.concat([]);
        this.square("square",0,0,160,200,"#eee8",10,"");
        this.selLetters = this.getLetters(this.word);
        let idx : any = 0;
        for(idx in this.palette){
            const pos1 = (60*idx)+30;
            this.square("color"+idx,900,pos1,60,60,this.palette[idx],10,"");
        }
        console.log(this.selLetters);
    }
    
    initPlayer (player: ExamplePlayer){
        console.log("Init player");
        var item=new BaseItem();
        item.radius=10;
        item.x=20;
        item.bgcolor=this.colors[player.index];
        item.label=player.name;
        item.labelx=20;
        item.labelAlign='left';
        player.brushColor='#000';
        player.score = 0;
        if (this.playerCount==1){
            item.label += " ";
        }
        let idx : any = 0;
        for(idx in this.selLetters){
            const pos1 = (80*idx)+60;
            player.privateItems["sel"+idx]=this.item({
                x:pos1,
                y:930,
                width: 60,
                radius: 0,
                height: 80,
                borderRadius: 8,
                bgcolor: '#ddd',
                label: this.selLetters[idx],
                fontSize: 40
            })
        }
        for(idx in this.realLetters){
            const pos1 = (80*idx)+30+(11-this.realLetters.length)*40;
            player.privateItems["mysel"+idx]=this.item({
                x:pos1,
                y:830,
                width: 60,
                radius: 0,
                height: 80,
                borderRadius: 8,
                bgcolor: '#fff',
                label: "",
                fontSize: 40
            })
        }
        player.privateItems["back"]=this.item({
            x:(80*this.realLetters.length)+30+(11-this.realLetters.length)*40,
            y:830,
            width: 60,
            height: 80,
            borderRadius: 8,
            bgcolor: '#888',
            label: "<",
            fontSize: 40
        })
        this.ui["player"+player.UUID]=item;
        this.updatePlayerUi();
        //console.log("Current",this.currentId,Object.keys(this.ui));
        if (this.currentId=='' && this.playerCount>1){
            this.nextPlayer();
        }
    }

    item(options: any): BaseItem{
        let item=new BaseItem();
        item.init(options);
        return item;
    }

    square(id: string, px:number,py:number, width:number, height:number, bgcolor: string, bradius:number, label: string): BaseItem{
        let item=this.item({
            x:px+width/2,
            y:py+height/2,
            width: width,
            height: height,
            radius: 0,
            borderRadius: bradius,
            bgcolor: bgcolor,
            label: label,
            fontSize: 40
        })
        this.ui[id]=item;
        return item;
    }

    drawItem(px: number,py: number,player: ExamplePlayer){
        var item=new BaseItem();
            item.init({
                x:px,
                y:py,
                radius: 5,
                bgcolor: player.brushColor
            });
        this.items[item.id]=item;
    }

    updatePlayer (id: string, cmd: any) {
        var player=this.players[id];
        //console.log("Update player",player.index, cmd.type);
        if (cmd.type=="notified"){
            player.notify();
        }
        if (cmd.idle==1){
            return;
        }
        if (cmd.type=="move"){
            return;
        }
        let idx : any;
        let selectedItem : BaseItem = null;
        if (id==this.currentId){
            player.selected=this.word;
            if (cmd.type=="touch"){
                for(idx in this.palette){
                    let myItem : BaseItem = this.ui["color"+idx];
                    myItem.label = "";
                    console.log(idx, myItem.bgcolor, myItem.x, myItem.y);
                    if (myItem.collisionWithPoint(cmd.px,cmd.py)){
                        selectedItem = myItem;
                        console.log("click", myItem.bgcolor );
                        player.brushColor = myItem.bgcolor;
                        myItem.label = "o";
                        player.x0=-1;
                        player.y0=-1;
                    }
                }
                if (selectedItem!=null){
                    return;
                }
                console.log("touch",cmd.px,cmd.py);
                this.drawItem(cmd.px,cmd.py,player);
                player.x0=cmd.px;
                player.y0=cmd.py;
                    
            }
            if (cmd.type=="drag"){
                if (player.x0>=0){
                    var item=new BaseItem();
                    item.init({
                        x:cmd.px,
                        y:cmd.py,
                        stroke: player.brushColor,
                        radius: 5,
                        lineWidth: 10,
                        bgcolor: player.brushColor
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

            }
            if (cmd.type=="release"){
                if (player.x0>=0){
                    console.log("release",cmd.px,cmd.py);
                    this.drawItem(cmd.px,cmd.py,player);   
                }
            }
        }else if(this.currentId!=''){
            if (cmd.type=="release"){
                for(idx in this.selLetters){
                    let myItem : BaseItem = player.privateItems["sel"+idx];
                    if (myItem){
                        if (myItem.collisionWithPoint(cmd.px,cmd.py)){
                            selectedItem = myItem;
                            break;
                        }
                    }
                }
                if (selectedItem){
                    console.log("press",selectedItem.label, id);
                    let selword = "";
                    for(idx in player.privateItems){
                        if (idx.indexOf("mysel")!=0){
                            continue;
                        }
                        if (player.privateItems[idx].label==""){
                            player.privateItems[idx].label=selectedItem.label;
                            selword+=player.privateItems[idx].label;
                            console.log('SELWORD',selword,this.word);
                            if (selword==this.word){
                                this.square('win',300,400,400,200,"#fff",20,player.name+" Wins");
                                this.currentId='';
                                player.score+=100;
                                this.updatePlayerUi();
                                player.privateItems['myturn']=this.item({
                                    x:500,
                                    y:550,
                                    width:120,
                                    height: 40,
                                    label: "My Turn",
                                    bgcolor: "#8F8",
                                    borderRadius: 10,
                                })
                            }
                            break;
                        }else{
                            selword+=player.privateItems[idx].label;
                        }
                    }
                }
                let myItem : BaseItem = player.privateItems["back"];
                if (myItem){
                    myItem.debug = true;
                    if (myItem.collisionWithPoint(cmd.px,cmd.py)){
                        console.log("press back");
                        selectedItem = myItem;
                        let nextKey = "mysel0";
                        for(idx in player.privateItems){
                            if (player.privateItems[idx].label=="" || idx=='back'){
                                break;
                            }
                            nextKey = idx;
                        }
                        player.privateItems[nextKey].label='';
                    }
                }
                
            }
        }else{
            let myTurn : BaseItem = player.privateItems["myturn"];
            if (myTurn){
                if (myTurn.collisionWithPoint(cmd.px,cmd.py)){
                    delete player.privateItems.myturn;
                    delete this.ui.win;
                    this.nextTurn(id);
                }
            }
        }
    }

    nextTurn(id: string){
        this.currentId=id;
        
    }

    nextPlayer (){
        var ids=Object.keys(this.players);
        console.log("NextPlayer",this.currentId);
        if (this.currentId==''){
            this.currentId=ids[0];
        }else{
            var pos=ids.indexOf(this.currentId)+1;
            if (pos>=ids.length){
                this.currentId=ids[0];
            }else{
                this.currentId=ids[pos];
            }    
        }
        this.updatePlayerUi();
        var player = this.getPlayer(this.currentId);
        player.notify("It's your turn");
        let idx: any;
        for(idx in this.realLetters){
            player.privateItems["mysel"+idx].label=this.realLetters[idx];
            player.privateItems["mysel"+idx].bgcolor='#cfc';
            player.privateItems["back"].bgcolor='#000';
            let idx1: any;
            for(idx1 in this.selLetters){
                player.privateItems["sel"+idx1].visible=false;
            }
        }
        player.privateItems["yourturn"]=this.item({
            x:500,
            y:50,
            width: 400,
            height: 20,
            radius: 0,
            borderRadius: 10,
            bgcolor: this.colors[player.index],
            label: "It's your turn",
            fontSize: 16
        })
        console.log("notify",player.name);        
        return this.currentId;
    }

    updatePlayerUi(){
        var idx=0;
        console.log(Object.keys(this.ui));
        for(var p in this.players){
            var pl = this.players[p];
            var plui = this.ui["player"+pl.UUID];
            plui.label=pl.name;
            plui.y=30+45*idx;
            plui.labely=8;
            this.ui["player"+pl.UUID].label=pl.name+" "+pl.score;
            idx++;
        }
        if (this.currentId!=''){
            var player = this.getPlayer(this.currentId);
            if (player){
                this.ui["player"+player.UUID].label+=" ◉";
            }
        }
    }

    getPlayer (id:string) : ExamplePlayer{
        return this.players[id];
    }

    removePlayer (id: string) {
        var player=this.players[id];
        delete this.ui["player"+player.UUID];
        super.removePlayer(id);
        this.updatePlayerUi();
        if (this.currentId==id){
            this.nextPlayer();
        }else{

        }
    }

}