
var canvas = document.getElementById("game");
var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
var currentRoom = '';
var PI2=2*Math.PI;

client.onOpen.add(function() {
  document.querySelector("#game-ui").style.display='';
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

function showRooms(){
  client.getAvailableRooms('example', function(rooms, err) {
    if (rooms.length==0){

    }
    var items = rooms
    .filter(function(room){
      return room.clients<room.maxClients && room.metadata.opened;
    })
    .map(function(room){
      return "<button onclick=selectGame('"+room.roomId+"') >"+room.roomId+" ("+room.clients+"/"+room.maxClients+")</button>"
    })
    items.push("<button onclick=createGame() >Create Game</div>")
    document.querySelector("#game-ui .ui-selection").innerHTML=(items.join("\n"))
  });
  setTimeout(showRooms,3000);
}

var currentRoom;

function createGame(){
  currentRoom= client.join("example",{create:true})
  joinRoom(currentRoom)
  document.querySelector("#game-ui").style.display='none'
}

function selectGame(id){
  currentRoom= client.join("example",{id:id})
  joinRoom(currentRoom)
  document.querySelector("#game-ui").style.display='none'
}

function sendIdleKey(room){
  //room.send({idle:1})
  //window.setTimeout(sendIdleKey,30,room);
}

function drawSprite(ctx,sp,sx,sy,bounds,ox,oy){
  var w1 = bounds.width;
  var h1 = sp.height*(w1/sp.width);
  ctx.drawImage(sp.image,sp.width*sx,sp.height*sy,sp.width,sp.height,ox+bounds.x-w1/2,oy+bounds.y-w1/2,w1,h1);
}

function drawObject(ctx,object){
  ctx.beginPath();
  if (!object.visible){
    return;
  }
  var w=object.width?object.width:object.radius*2;
  var h=object.height?object.height:object.radius*2;
  if (object.radius && object.bgcolor){
    ctx.fillStyle = object.bgcolor;
    ctx.arc(object.x, object.y, object.radius,0, PI2);
    ctx.fill(); 
  }
  if (object.width*object.height && object.bgcolor){
    ctx.fillStyle = object.bgcolor;
    ctx.fillRect(object.x-object.width/2,object.y-object.height/2,object.width,object.height); 
  }
  if (object.sprite && sprites[object.sprite]){
    var sp=sprites[object.sprite];
    var w1=w;
    var h1=sp.height*(w/sp.width);
    drawSprite(ctx,sp,object.spriteX,object.spriteY,object,0,0);
  }
  if (object.items){
    for(var idx in object.items){
      var obj=object.items[idx];
      var sp=sprites[obj.sprite];
      drawSprite(ctx,sp,obj.spriteX,obj.spriteY,obj,object.x,object.y);  
    }
  }
  if (object.label){
    ctx.fillStyle = "#000";
    ctx.font = object.fontSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(object.label, object.x, object.y-w/2-4);  
  }
}

function joinRoom(room){
  
  var players = {};
  var myPlayer;

  var items = [];
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
    //window.PREV_DRAW = window.LAST_DRAW;
    window.LAST_DRAW = (new Date()).getTime();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,1000,1000);
    var sp=sprites["back1"];
    ctx.drawImage(sp.image,0,0,sp.width,sp.height,0,0,1000,1000);
    for(var $i=0; $i<items.length; $i++){
      var object = items[$i];
      drawObject(ctx,object);
    }
    for(var $index in players){
      var object = players[$index];
      drawObject(ctx,object);
    }
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(room.id,500,30);
  }

  function triggerDraw(){
    window.clearTimeout(window.DRAW_TIMEOUT);
    var diff = ((new Date()).getTime() - window.LAST_DRAW);
    window.DRAW_TIMEOUT=setTimeout(drawObjects,Math.max(0,FPS_RATE - diff));
  }


  room.onJoin.add(function() {
    console.log("Joined to game",room);
    sendIdleKey(room);

    // listen to patches coming from the server
    room.state.players.onAdd = function(player, sessionId) {
      players[sessionId] = player;
      console.log("Player",player.id, sessionId);
      if (room.sessionId == sessionId){
        myPlayer = player;
      }
      triggerDraw();
    }
  
    room.state.items.onAdd = function(item, sessionId) {
      
      items.push(item);
      triggerDraw();
    }
  
    room.state.players.onRemove = function(player, sessionId) {
      delete players[sessionId];
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
