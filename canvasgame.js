var myGamePiece;
var blueBlock, greenBlock, redBlock;
var myScore;
let canGiveScore = true;
let myHealth = 3;
let gameCanStart = false;
// let audiosource = "./stagetrack0.ogg";
let audiosource = "./myownmusic0.mp3";
let deahtaudiosource = "./death0.ogg";
var _audio = new Audio(audiosource);
var _deathaudio = new Audio(deahtaudiosource);

playerIdle = document.getElementById("playeridle");
playerJumping = document.getElementById("playerjump");
playerGetHit = document.getElementById("playergethit");
playerDead = document.getElementById("playerdead");
playerOnGround = 352;
playerSafeZone = 286;

let myGameStartButton = document.getElementById("gameButton");
myGameStartButton.addEventListener("click" , canStartGame, false);

let myPauseMusicButton = document.getElementById("pauseButton");
myPauseMusicButton.addEventListener("click" , pauseMusic,false)


function pauseMusic(){
    _audio.pause();
    _audio.currentTime = 0;
}
function canStartGame(){
    if(gameCanStart==false)
    {
        myHealth = 3;
        myGamePiece.y=playerOnGround;
        myGamePiece.x=280;
        myScore.currentScore = 0;

        _deathaudio.pause();
        _deathaudio.currentTime=0;

        _audio.play();
        // _audio.currentTime = 0;
        _audio.volume = 0.7;
        _audio.loop = true;

        setBlockRandomPosition();
        gameCanStart=true;
    }
}

// children = document.body.childNodes.length;
// console.log("amount fo child nodes: " + children);

function startGame() {
    myGameArea.start();
    myGamePiece = new component(playerIdle,64, 64, "", 280, playerOnGround);
    myScore = new component("128px", "Consolas", "white", 460, 484,"text");

    blueBlock = new component("",32, 64, "blue", 720, 64);
    greenBlock = new component("",32, 64, "green", 450, 64);
    redBlock = new component("",32, 64, "red", 125, 80);    
  }
  
  var myGameArea = {
    
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1024;
        this.canvas.height = 512;
        this.context = this.canvas.getContext("2d");
        document.getElementById("myGame").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 16);
        this.clicked = false;
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
/*The object component */
function component(spriteID,width,height,color="",x,y,type=""){
    this.type = type;
    this.spriteID = spriteID || 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.4;
    this.playerHitCoolDown = 0;
    this.currentScore = 0;

    this.update = function(){
        ctx = myGameArea.context;
        

        if(this.type == "text"){
            //If type is set it is a text box
            ctx.font = "2rem Consolas";
            ctx.fillStyle = "white";
            ctx.fillText(this.text, this.x, this.y);
        }else if(type==""){
                ctx.fillStyle = color||"";
                if(color != ""){ //If type is "" and color is not "" its a enemy
                    ctx.fillRect(this.x,this.y,this.width,this.height);
                }else
                if(this.spriteID != 0){ //if sprite id is set, it is the player
                    ctx.drawImage(this.spriteID,this.x,this.y,this.width,this.height);
                }
            }
    }

    this.newXPos = function() {
        if(this.speedX > 0 && this.x > 924){
            this.x -= 0;
        }else if(this.speedX < 0 && this.x < 64){
            this.x += 0;
        }else{
            this.x += this.speedX;

        }
    }

    this.newYPos = function (){
        this.y += Math.round(this.speedY);
        if((this.x > 60 && this.x < 84) || (this.x > 896 && this.x < 927)){

            this.speedY += this.gravity;

        }else if(this.y < playerOnGround){

            this.speedY += this.gravity;

        }else{
            this.y=playerOnGround;
            this.speedY = 0;
            if(this.spriteID!="")
            {
                this.speedX = 0;
                this.speedY = 0;
            }


            if(this.spriteID!="")
            {
                if(myHealth > 0)
                {
                    this.spriteID = playerIdle;
                }else{
                    if(gameCanStart==true)
                    {
                        gameCanStart = false;
                        this.spriteID = playerDead;
                        gameCanStart = false;
                        _audio.pause();
                        _audio.currentTime = 0;
                        _deathaudio.play();
                        // setTimeout(function(){
                        //     location.reload();} ,1500
                        // );
                    }
                }
                
            }
        }

        if(this.y > 512+64 && (this.spriteID!="")){
            if(gameCanStart==true)
            {
                gameCanStart = false;
                console.log("You lost!");
                myHealth = 0;
                _audio.pause();
                _audio.currentTime = 0;
                _deathaudio.play();
                // setTimeout(function(){
                //     location.reload();} ,1500
                // );
            }
        }
    }
}
function updateGameArea() {
    myGameArea.clear();   
    myGamePiece.newXPos();
    myGamePiece.newYPos();
    myGamePiece.update();
    if(myHealth>0 && gameCanStart==true){
        blueBlock.newXPos();
        blueBlock.newYPos();

        greenBlock.newXPos();
        greenBlock.newYPos();

        redBlock.newYPos();
        redBlock.newXPos();
    }
    
    /**update x position on blocks only if on ground */
    if(blueBlock.y >= playerOnGround)
    {
        if(blueBlock.x > 64 && blueBlock.y>300){
            blueBlock.speedX = -2.5;
        }
    }
    if(greenBlock.y >= playerOnGround)
    {
        if(greenBlock.x > 64 && greenBlock.y>300){
            greenBlock.speedX = -2.8;
        }
    }
    if(redBlock.y >= playerOnGround)
    {
        if(redBlock.x < 912 && redBlock.y>300){
            redBlock.speedX =2.8;
        }
    }

    /*Random spawn  coordinate */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    if(blueBlock.y > 580){
        blueBlock.y = Math.random(32,120);
        blueBlock.x = getRandomInt(400,840);
    }
    if(greenBlock.y > 580){
        greenBlock.speedX = 0;
        greenBlock.speedY = 0;

            greenBlock.y = Math.random(32,120);
            greenBlock.x = getRandomInt(300,800);
    }
    if(redBlock.y > 580){
        redBlock.speedX = 0;
        redBlock.speedY = 0;
            redBlock.y = Math.random(32,120);
            redBlock.x = getRandomInt(200,300);
    }

    /*Collisions */
    function Collisions(){
    
            myBlocks = [greenBlock,blueBlock,redBlock];
            for (let i = 0; i < myBlocks.length; i++) {
                if(myGamePiece.playerHitCoolDown==0){
                    if(myBlocks[i].y >= playerOnGround){
                        if(myBlocks[i].x > myGamePiece.x-1 && myBlocks[i].x < myGamePiece.x+myBlocks[i].width && myGamePiece.y>playerSafeZone){

                            if(myGamePiece.playerHitCoolDown==0){myGamePiece.playerHitCoolDown=120;}
                            if(myHealth>0){myHealth--;}
                            new Audio("./hit0.ogg").play();
                            if(myBlocks[i].speedX>0){
                                myGamePiece.spriteID = playerGetHit;
                                
                                moveright();
                            }else if (myBlocks[i].speedX<0){
                                myGamePiece.spriteID = playerGetHit;
                                moveleft();
                            }
                        }
                    }
                }
                // console.log("player y position: " + myGamePiece.y);
                if(myGamePiece.y<playerSafeZone && myBlocks[i].x > myGamePiece.x-1 && 
                    myBlocks[i].x < myGamePiece.x+myBlocks[i].width && myGamePiece.spriteID!=playerGetHit){
                    if(canGiveScore==true){
                        myScore.currentScore+=10;
                        new Audio("./score0.ogg").play();
                    }
                    console.log("SCORE!" + myScore.currentScore);
                    canGiveScore=false;
                    setTimeout(function(){
                        canGiveScore = true;
                    }, 500);
                }
            }
        
    }
    
    if(myGamePiece.playerHitCoolDown>0){
        myGamePiece.playerHitCoolDown--;
    }
    myScore.x =412;
    myScore.y =484;
    myScore.font = 96;
    myScore.type ="text";
    myScore.color ="white";
    myScore.text = (myHealth > 0 ) ? "SCORE: " + myScore.currentScore + "  " + "HEALTH: " + myHealth : "YOU DIED";
    myScore.update();
    greenBlock.update();
    redBlock.update();
    blueBlock.update();
    if(gameCanStart!=false){Collisions();}
}
    /* Respawn if blocks fell below y treshold  */
    function setBlockRandomPosition(){
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        blueBlock.y = Math.random(32,120);
        blueBlock.x = getRandomInt(400,840);

        greenBlock.y = Math.random(32,120);
        greenBlock.x = getRandomInt(300,800);

        redBlock.y = Math.random(32,120);
        redBlock.x = getRandomInt(200,300);

    }

    function moveleft() {
    myGamePiece.speedX = -2.5;
    playerJump();
    }

    function moveright() {
    myGamePiece.speedX = 2.5;
    playerJump();
    }

    function playerJump(){
        new Audio("./jump0.ogg").play();
        myGamePiece.speedY = -8;
        myGamePiece.spriteID=(myGamePiece.spriteID != playerGetHit) ? playerJumping : playerGetHit;
    }
    movePlayer = function (){
    if(event.key == "a" && myGamePiece.y == playerOnGround && gameCanStart)
    {
        moveleft();
    }else if(event.key == "d" && myGamePiece.y == playerOnGround && gameCanStart)
    {
        moveright();
    }else{

    }
};