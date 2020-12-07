
var lang="en";

if (navigator.language.indexOf("es-")){
  lang="es";
}

if (document.location.hash=="#es"){
  lang="es"
}
if (document.location.hash=="#en"){
  lang="en"
}

console.log("LANG",lang);



var language={
  en:{
    "_name" : "🇬🇧 English",
    "_flag" : "🇬🇧",
    "enter_your_name":"Name",
    "select_game":"Select a Game",
    "create_game":"Create New Game",
  },
  es:{
    "_name" : "🇪🇸 Español",
    "_flag" : "🇪🇸",
    "enter_your_name":"Nombre",
    "select_game":"Selecciona Juego",
    "create_game":"Crear Nuevo Juego",
  }
}

document.getElementById("enter_your_name").innerText=language[lang].enter_your_name;
document.getElementById("select_game").innerText=language[lang].select_game;

var canvas = document.getElementById("game");
var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
var currentRoom = '';
var currentSession = '';
var userName = '';
var PI2=2*Math.PI;

var playerName = document.getElementById("playername");
playerName.focus();
playerName.value=localStorage.lastUser?localStorage.lastUser:'';
playerName.addEventListener("keyup",function(ev){
  localStorage.lastUser=playerName.value;
})
setTimeout(function(){
  playerName.select();
},500)

client.onOpen.add(function() {
  document.querySelector("#game-ui").style.display='';
  document.querySelector("#game").style.visibility='hidden';
  showRooms();
});

var spritesLeft = Object.keys(sprites).length; 
for (var id in sprites){
  var img =  new Image();
  img.onload = function(){
    sprites[id].loaded = true;
    spritesLeft--;
    if (spritesLeft==0){
      //joinGame("example");
    }
  }
  img.src="/"+sprites[id].file;
  sprites[id].image = img;
}

function ucFirst(text){
  return text.substring(0,1).toUpperCase()+text.substring(1);
}

function changeUsername(user){
  var step2=document.getElementById("step2");
  userName = '';
  if (user.value.trim()!=""){
    step2.style.display='';
    userName = ucFirst(user.value.trim());
  }else{
    step2.style.display='none';
  }
}

changeUsername(playerName);



function showRooms(){
  client.getAvailableRooms('example', function(rooms, err) {
    if (rooms.length==0){

    }
    var items = rooms
    .filter(function(room){
      return room.clients<room.maxClients && room.metadata.opened;
    })
    .map(function(room){
      return "<button onclick=selectGame('"+room.roomId+"') >"+language[room.metadata.lang]._flag+" "+room.roomId+" ["+room.clients+"/"+room.maxClients+"]</button>"
    })
    items.push("<p>&nbsp;</p>");
    items.push("<button onclick=createGame() >"+language[lang].create_game+"</button>")
    items.push("<select size=1 id=gamelang onchange='setLang(this.value)' >");
    items.push("<option value="+lang+" selected >"+language[lang]._name+"</option>");
    for(var lng in language){
      if (lng!=lang){
        items.push("<option value="+lng+" >"+language[lng]._name+"</option>");
      }
    }
    items.push("</select>")
    document.querySelector("#game-ui .ui-selection").innerHTML=(items.join("\n"))
  });
  setTimeout(showRooms,3000);
}

function setLang(lang){
  this.lang = lang;
}

var currentRoom;

function createGame(){
  currentRoom= client.join("example",{create:true,name:userName,lang:lang})
  joinRoom(currentRoom)
  document.title=userName;
  document.querySelector("#game-ui").style.display='none';
  document.querySelector("#game").style.visibility='';

}

function selectGame(id){
  currentRoom= client.join("example",{id:id,name:userName,lang:lang})
  joinRoom(currentRoom)
  document.title=userName;
  document.querySelector("#game-ui").style.display='none';
  document.querySelector("#game").style.visibility='';
}

function sendIdleKey(room){
  console.log("Idle");
  room.send({idle:1})
  window.setTimeout(sendIdleKey,1000,room);
}

function drawSprite(ctx,sp,sx,sy,bounds,ox,oy){
  var w1 = bounds.width;
  var h1 = sp.height*(w1/sp.width);
  ctx.drawImage(sp.image,sp.width*sx,sp.height*sy,sp.width,sp.height,ox+bounds.x-w1/2,oy+bounds.y-w1/2,w1,h1);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle=fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle=stroke;
    ctx.stroke();
  }

}

function drawObject(ctx,object,dx,dy){
  ctx.beginPath();
  if (!object.visible){
    return;
  }
  if (!dx){
    dx=0;
  }
  if (!dy){
    dy=0;
  }
  var w=object.width?object.width:object.radius*2;
  var h=object.height?object.height:object.radius*2;
  ctx.lineWidth=object.lineWidth;
  if (object.radius && object.bgcolor){
    ctx.fillStyle = object.bgcolor;
    ctx.arc(dx+object.x, dy+object.y, object.radius,0, PI2);
    ctx.fill(); 
  }
  if (object.points.p0 && object.stroke){
    ctx.strokeStyle=object.stroke;
    ctx.fillStyle = object.bgcolor;
    ctx.beginPath();
    ctx.moveTo(dx+object.points.p0.x, dy+object.points.p0.y);
    ctx.lineTo(dx+object.points.p1.x, dy+object.points.p1.y);
    ctx.stroke();
  }
  if (object.width*object.height && object.bgcolor){
    roundRect(ctx,dx+object.x-object.width/2,dy+object.y-object.height/2,object.width,object.height,object.borderRadius?object.borderRadius:0,object.bgcolor,object.stroke); 
  }
  if (object.sprite && sprites[object.sprite]){
    var sp=sprites[object.sprite];
    var w1=w;
    var h1=sp.height*(w/sp.width);
    drawSprite(ctx,sp,object.spriteX,object.spriteY,object,dx,dy);
  }
  if (object.items){
    for(var idx in object.items){
      var obj=object.items[idx];
      drawObject(ctx,obj,dx+object.x,dy+object.y);
    }
  }
  if (object.label){
    ctx.fillStyle = "#000";
    ctx.font = object.fontSize + "px Arial";
    ctx.textAlign = object.labelAlign?object.labelAlign:'center';
    var lx=object.labelx?object.labelx:0;
    var ly=object.labely?object.labely:(object.fontSize/3);
    ctx.fillText(object.label, dx+object.x+lx, dy+object.y+ly);  
  }
}

function joinRoom(room){
  
  var players = {};
  var myPlayer;

  var items = [];
  var ui = [];
  var PI2 = 2* Math.PI;
  
  var KEY_LEFT = 37;
  var KEY_UP = 38;
  var KEY_RIGHT = 39;
  var KEY_DOWN = 40;

  var FRAME_RATE=24;
  var FPS_RATE=Math.round(1000/FRAME_RATE);
  var KEY_RATE=75;

  var button_up = document.getElementById("move-up");
  var button_down = document.getElementById("move-down");
  var button_left = document.getElementById("move-left");
  var button_right = document.getElementById("move-right");
  
  window.LAST_DRAW = (new Date()).getTime();
  var ctx = canvas.getContext("2d");

  function drawObjects(){
    window.LAST_DRAW = (new Date()).getTime();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,1000,1000);
    var sp=sprites["back1"];
    ctx.drawImage(sp.image,0,0,sp.width,sp.height,0,0,1000,1000);
    for(var $i=0; $i<items.length; $i++){
      var object = items[$i];
      drawObject(ctx,object);
    }
    for(var $index in ui){
      //console.log("UI",$index);
      var object = ui[$index];
      drawObject(ctx,object);
    }
    for(var $index in players){
      var object = players[$index];
      drawObject(ctx,object);
      if ($index==room.sessionId){
        for(var $item in object.privateItems){
          drawObject(ctx,object.privateItems[$item]);
        }
      }
    }
    ctx.fillStyle = "#000A";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game ID: "+room.id,500,24);
  }

  function triggerDraw(){
    window.clearTimeout(window.DRAW_TIMEOUT);
    var diff = ((new Date()).getTime() - window.LAST_DRAW);
    window.DRAW_TIMEOUT=setTimeout(drawObjects,Math.max(0,FPS_RATE - diff));
  }


  room.onJoin.add(function() {
    console.log("Joined to game",room.id, room.name, room.sessionId);
    currentSession = room.sessionId;
    sendIdleKey(room);

    // listen to patches coming from the server
    room.state.players.onAdd = function(player, sessionId) {
      players[sessionId] = player;
      console.log("Player",player.id, sessionId, player.name);
      if (room.sessionId == sessionId){
        myPlayer = player;
      }
      triggerDraw();
    }
  
    room.state.items.onAdd = function(item, sessionId) {
      
      items.push(item);
      triggerDraw();
    }

    room.state.items.onChange = function (item, sessionId) {
      triggerDraw();
    }

    room.state.items.onRemove = function(item, sessionId) {
      var pos=items.indexOf(item);
      items.splice(pos,1);
      triggerDraw();
    }

    room.state.ui.onAdd = function(item, sessionId) {
      
      ui.push(item);
      triggerDraw();
    }

    room.state.ui.onChange = function (item, sessionId) {
      triggerDraw();
    }

    room.state.ui.onRemove = function(item, sessionId) {
      var pos=ui.indexOf(item);
      ui.splice(pos,1);
      triggerDraw();
    }

    room.state.players.onRemove = function(player, sessionId) {
      delete players[sessionId];
      triggerDraw();
    }
  
    room.state.players.onChange = function (player, sessionId) {
      triggerDraw();
    }
  })
  

  var touchStarted=false;
  
  canvas.addEventListener("mousedown", function (e) {
    var px=e.offsetX*1000/canvas.clientWidth;
    var py=e.offsetY*1000/canvas.clientHeight;
    touchStarted=true;
    room.send({
      type:'touch',
      px:px,
      py:py
    })
  })

  canvas.addEventListener("mousemove", function (e) {
    var px=e.offsetX*1000/canvas.clientWidth;
    var py=e.offsetY*1000/canvas.clientHeight;
    var type='move';
    if (touchStarted){
      type='drag';
    }
    room.send({
      type:type,
      px:px,
      py:py
    })
  })
  
  canvas.addEventListener("mouseup", function (e) {
    touchStarted=false;
    var px=e.offsetX*1000/canvas.clientWidth;
    var py=e.offsetY*1000/canvas.clientHeight;
    room.send({
      type:'release',
      px:px,
      py:py
    })
  })
  
  canvas.addEventListener("touchstart", function (e) {
    var originX=e.targetTouches[0].clientX-canvas.offsetLeft;
    var originY=e.targetTouches[0].clientY-canvas.offsetTop;
    var px=originX*1000/canvas.clientWidth;
    var py=originY*1000/canvas.clientHeight;
    touchStarted=true;
    room.send({
      type:'touch',
      px:px,
      py:py
    })
  })

  canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var originX=e.targetTouches[0].clientX-canvas.offsetLeft;
    var originY=e.targetTouches[0].clientY-canvas.offsetTop;
    var px=originX*1000/canvas.clientWidth;
    var py=originY*1000/canvas.clientHeight;
    var type='move';
    if (touchStarted){
      type='drag';
    }
    room.send({
      type:type,
      px:px,
      py:py
    })
  })

  canvas.addEventListener("touchend", function (e) {
    touchStarted=false;
    var px=e.offsetX*1000/canvas.clientWidth;
    var py=e.offsetY*1000/canvas.clientHeight;
    room.send({
      type:'release',
      px:px,
      py:py
    })
  })
  
  
  function cancelKey(){
    if (window.lastKeyEvent){
      window.clearTimeout(window.lastKeyEvent);
    }
  }
  
  
}

window.addEventListener("touchmove",function(ev){
  ev.preventDefault();
})
