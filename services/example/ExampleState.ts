import { type, MapSchema } from "@colyseus/schema";
import { State } from "../base/State"
import { BaseItem } from "../base/BaseItem"

import { ExamplePlayer } from "./ExamplePlayer"
import { Point } from "../base/Point";
import { Words } from "./Words";
import { Lang } from "./Lang";



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
        "#a69",
        "#fd3",
        "#8ce",
        "#7ca",
        "#fcc",
        "#eb9",
        "#aaa",
        "#fff",
    ]

    currentId = '';

    word : string = null;
    winner : string = null;
    selLetters : Array<string> = [];
    currentLetters : Array<string> = [];
    realLetters : Array<string> = [];
    words : any = new Words();
    language : any = new Lang();
    lang : string = "en";
    turnTime : Date = new Date();
    timeout1 : NodeJS.Timeout = null;
    timeout2 : NodeJS.Timeout = null;
    timeout3 : NodeJS.Timeout = null;
    playerPoints : number = 0;
    drawerPoints : number = 0;

    getWord(lang){
        let words=this.words[lang];
        let idx=Math.round(Math.random()*(words.length-1));
        console.log('selection',idx,words.length)
        return words[idx];
    }
    
    getLetters(word: string): Array<string>{
        let altLetters = "aeioucdglmnprst".split("");
        let wordLetters : Array<string> = word.split("");
        let wordUniqueLetters : Array<string> = wordLetters.filter((item, pos) => wordLetters.indexOf(item) == pos);
        let allLetters: Array<string> = wordUniqueLetters.concat(altLetters);
        let letters : Array<string> = allLetters.filter((item, pos) => allLetters.indexOf(item) == pos);
        letters.sort();
        let tries = 0;
        while(letters.length>14){
            let idx = Math.round(Math.random()*14);
            if (wordLetters.indexOf(letters[idx])==-1){
                let letter=letters.splice(idx,1);
            }
            tries++;
        }
        console.log(wordLetters,letters);
        return letters;
    }

    nextWord(){
        this.word = this.getWord(this.lang);
        console.log("WORD",this.word);    
        this.realLetters = this.word.split("");
        this.currentLetters = this.realLetters.concat([]);
        this.selLetters = this.getLetters(this.word);
    }

    start(){
        this.ui['clue']=this.item({
            x:500,
            y:50,
            width: 400,
            height: 30,
            borderRadius: 8,
            label: "",
            bgcolor: "#fff8",
            type: 'clue',
            fontSize: 36,
            visible: false,
        });
    }

    resetDrawing(){
        let idx: any;
        for(idx in this.items){
            if (this.items[idx].type=='drawing'){
                this.items[idx].visible=false;
                delete this.items[idx];
            }
        }
    }

    resetPlayer(player: ExamplePlayer){
        let idx: any;
        for(idx in player.privateItems){
            if (player.privateItems[idx].type=='temp'){
                delete player.privateItems[idx];
            }
        }
    }

    setupPlayer(player: ExamplePlayer){
        let idx: any;
        const sep = 110;
        const sep2 = 62;
        for(idx in this.selLetters){
            const pos1 = (sep*(idx%7))+140;
            player.privateItems["sel"+idx]=this.item({
                x:pos1,
                y:idx>=7 ? 940:820,
                width: 80,
                radius: 0,
                height: 100,
                borderRadius: 8,
                bgcolor: '#ddd',
                type: 'temp',
                label: this.selLetters[idx],
                fontSize: 40,
                stroke: '#444'
            })
        }
        player.privateItems["back"]=this.item({
            x:(sep2*this.realLetters.length)+50+(13-this.realLetters.length)*40,
            y:700,
            width: sep2-2,
            height: 80,
            borderRadius: 8,
            bgcolor: '#888',
            label: "<",
            type: 'temp',
            fontSize: 40
        })        
        for(idx in this.realLetters){
            const pos1 = (sep2*idx)+50+(13-this.realLetters.length)*40;
            player.privateItems["mysel"+idx]=this.item({
                x:pos1,
                y:700,
                width: sep2-2,
                radius: 0,
                height: 80,
                borderRadius: 8,
                bgcolor: '#fff',
                label: "_",
                type: 'temp',
                fontSize: 40,
                stroke: '#eee'
            })
        }

    }    
    
    initPlayer (player: ExamplePlayer){
        if (this.word==null){
            this.lang = player.lang;
            this.nextWord();
        }
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
        this.resetPlayer(player);
        this.ui["player"+player.UUID]=item;
        this.updatePlayerUi();
        //console.log("Current",this.currentId,Object.keys(this.ui));
        if (this.currentId=='' && this.playerCount>1){
            this.nextTurn(this.nextId());
        }
        if (this.currentId!=''){
            this.setupPlayer(player);
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
                bgcolor: player.brushColor,
                type: 'drawing'
            });
        this.items[item.id]=item;
    }

    updatePlayer (id: string, cmd: any) {
        var player=this.players[id];
        //console.log("Update player",player.index, cmd.type);
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
                    let myItem : BaseItem = player.privateItems["color"+idx];
                    if (myItem.collisionWithPoint(cmd.px,cmd.py)){
                        selectedItem = myItem;
                        player.brushColor = myItem.bgcolor;
                        for(let idx1 in this.palette){
                            let col : BaseItem = player.privateItems["color"+idx1];
                            col.label='';
                            col.stroke='#fff';
                        }
                        myItem.label='◉';
                        myItem.stroke='#ff0';
                    }
                }
                if (selectedItem!=null){
                    player.x0=-1;
                    return;
                }
                //console.log("touch",cmd.px,cmd.py);
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
                        bgcolor: player.brushColor,
                        type:'drawing',
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
                    //console.log("release",cmd.px,cmd.py);
                    this.drawItem(cmd.px,cmd.py,player);   
                }
                player.x0=-1;
            }
        }else if(this.currentId!=''){
            if (cmd.type=="release"){
                selectedItem = null;
                for(idx in this.selLetters){
                    let myItem : BaseItem = player.privateItems["sel"+idx];
                    if (myItem){
                        if (myItem.collisionWithPoint(cmd.px,cmd.py)){
                            selectedItem = myItem;
                            break;
                        }
                    }
                }
                let index : number;
                if (selectedItem){
                    console.log("press",selectedItem.label, id);
                    let selword = "";
                    for(index=0; index<this.word.length; index++){
                        const selCard=player.privateItems["mysel"+index];
                        selCard.bgcolor="#ffe";
                        console.log("mysel"+index,selCard.label,selCard.x);
                        if (selCard.label=="_"){
                            selCard.label=selectedItem.label;
                            selCard.bgcolor="#ffc";
                            console.log('upd',selCard.label,selCard.bgcolor);
                            selword+=selCard.label;
                            console.log('SELWORD',selword,this.word);
                            if (selword==this.word){
                                this.square('win',300,380,400,220,"#fffc",20,player.name+" "+this.language[this.lang].wins);
                                this.ui['win'].stroke='#ccc';
                                this.square('word',400,410,200,40,"#ff0",14,this.word);
                                let currentPlayer = this.players[this.currentId];
                                currentPlayer.score+=this.drawerPoints;
                                this.currentId='';
                                player.score+=this.playerPoints;
                                this.updatePlayerUi();
                                player.privateItems['myturn']=this.item({
                                    x:500,
                                    y:560,
                                    width:260,
                                    height: 50,
                                    label: this.language[this.lang].my_turn,
                                    bgcolor: "#4F4",
                                    stroke: "#080",
                                    fontSize: 40,
                                    borderRadius: 10,
                                })
                                this.stopClues();
                            }
                            break;
                        }else{
                            selword+=selCard.label;
                        }
                    }
                }
                let backButton : BaseItem = player.privateItems["back"];
                if (!selectedItem && backButton){
                    if (backButton.collisionWithPoint(cmd.px,cmd.py)){
                        console.log("press back");
                        let nextKey = "mysel0";
                        for(index=0; index<this.word.length; index++){
                            if (player.privateItems['mysel'+index].label=="_" || idx=='back'){
                                break;
                            }
                            nextKey = 'mysel'+index;
                        }
                        player.privateItems[nextKey].label='_';
                        player.privateItems[nextKey].bgcolor='#fff';
                    }
                }
                
            }
        }else{
            let myTurn : BaseItem = player.privateItems["myturn"];
            if (myTurn){
                if (myTurn.collisionWithPoint(cmd.px,cmd.py)){
                    delete player.privateItems.myturn;
                    delete this.ui.win;
                    delete this.ui.word;
                    setTimeout(()=>{
                        this.nextTurn(id);
                    },500);
                }
            }
        }
    }

    stopClues(){
        if (this.timeout1){
            clearTimeout(this.timeout1);
            clearTimeout(this.timeout2);
            clearTimeout(this.timeout3);
        }
        this.timeout1 = null;
        this.timeout2 = null;
        this.timeout3 = null;
    }

    nextTurn(id: string){
        this.turnTime = new Date();
        this.playerPoints = 100;
        this.drawerPoints = 50;
        this.resetDrawing();
        this.nextWord();
        let idx: any;
        for(idx in this.players){
            this.resetPlayer(this.players[idx]);
            this.setupPlayer(this.players[idx]);
        }
        this.nextPlayer(id);
        this.ui['clue'].label = '';
        this.ui['clue'].visible = false;
        this.stopClues();
        this.timeout1 = setTimeout(()=>{
            let word1 = this.word.replace(/./g,'_ ');
            let index = 0;
            let replacement = this.word.charAt(index);
            word1 = word1.substring(0, index) + replacement + word1.substring(index + 1)
            this.ui['clue'].label = word1;
            this.ui['clue'].visible = true;
            this.playerPoints-=20;
            this.drawerPoints-=5;
        },30000)
        this.timeout2 = setTimeout(()=>{
            let word1 = this.ui['clue'].label;
            let index = Math.round(this.word.length-1/2);
            let replacement = this.word.charAt(index);
            index*=2;
            word1 = word1.substring(0, index) + replacement + word1.substring(index + 1)
            this.ui['clue'].label = word1;
            this.ui['clue'].visible = true;
            this.playerPoints-=10;
            this.drawerPoints-=10;
        },40000)
        this.timeout3 = setTimeout(()=>{
            if (this.word.length>4){
                let word1 = this.ui['clue'].label;
                let index = Math.round(this.word.length-1);
                let replacement = this.word.charAt(index);
                index*=2;
                word1 = word1.substring(0, index) + replacement + word1.substring(index + 1)
                this.ui['clue'].label = word1;
                this.ui['clue'].visible = true;
                this.playerPoints-=10;    
                this.drawerPoints-=10;
            }
        },50000)
    }

    nextId(){
        var ids=Object.keys(this.players);
        console.log("NextPlayer",this.currentId);
        if (this.currentId==''){
            return ids[0];
        }else{
            var pos=ids.indexOf(this.currentId)+1;
            if (pos>=ids.length){
                this.currentId=ids[0];
            }else{
                this.currentId=ids[pos];
            }    
        }
    }

    nextPlayer (id: string){
        this.currentId=id;
        this.updatePlayerUi();
        var player = this.getPlayer(this.currentId);
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
            height: 38,
            borderRadius: 10,
            bgcolor: "#8f8",
            label: this.language[this.lang].your_turn,
            fontSize: 24,
            type: 'temp'
        })
        const sep = 110;
        for(idx in this.palette){
            const pos1 = (sep*(idx%7))+140;
            player.privateItems["color"+idx]=this.item({
                x:pos1,
                y:idx>=7 ? 940:820,
                width: 80,
                radius: 0,
                height: 100,
                borderRadius: 8,
                bgcolor: this.palette[idx],
                stroke: '#fff',
                lineWidth: 4,
                type: 'temp',
                label: ' ',
                fontSize: 40,
            })
        }

        return this.currentId;
    }

    updatePlayerUi(){
        var idx=0;
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
            this.nextPlayer(this.nextId());
        }else{

        }
    }

}