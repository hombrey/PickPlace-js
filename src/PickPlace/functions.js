//{{{variable declarations
"use strict";
let timeStamp;
let bgX;
let scaleX, scaleY;
let piece1;
let pieces;
;//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keyup", evalKey, false); //capture keypress on bubbling (false) phase
function evalKey(evnt) {
    let keyPressed = evnt.keyCode;
    console.log ("Pressed: ",keyPressed);
} //evalKey(event)
//}}}event listeners

//{{{initializations
function placeLocations() {
    pieces = [document.getElementById('piece1'),document.getElementById('piece2'),
              document.getElementById('piece3'),document.getElementById('piece4'),
              document.getElementById('piece5'),document.getElementById('piece6')
    ]; //pieces =[]

    pieces[1-1].pickX = 1026;
    pieces[1-1].pickY = 426;

    pieces[2-1].pickX = 30;
    pieces[2-1].pickY = 441;

    pieces[3-1].pickX = 10;
    pieces[3-1].pickY = 31;

    pieces[4-1].pickX = 736;
    pieces[4-1].pickY = 482;

    pieces[5-1].pickX = 365;
    pieces[5-1].pickY = 475;

    pieces[6-1].pickX = 1019;
    pieces[6-1].pickY = 12;


    pieces[1-1].placeX = 349;
    pieces[1-1].placeY = 15;

    pieces[2-1].placeX = 551;
    pieces[2-1].placeY = 15;

    pieces[3-1].placeX = 703;
    pieces[3-1].placeY = 15;

    pieces[4-1].placeX = 349;
    pieces[4-1].placeY = 237;

    pieces[5-1].placeX = 551;
    pieces[5-1].placeY = 237;

    pieces[6-1].placeX = 703;
    pieces[6-1].placeY = 237;
} //function placePieces
function initWin() {
    //Get a reference to the canvas
    bgX = document.getElementById('backgroundX');
    //
    //context_bgX = bgX.getContext('2d');
    //resizeElements();
    //console.log ("windowWidth: "+ window.innerWidth);

    scaleX = bgX.clientWidth/bgX.naturalWidth;
    scaleY = bgX.clientHeight/bgX.naturalHeight;
    //console.log ("scale: ("+scaleX+","+scaleY+")");
    placeLocations();
    for (var pInx=1; pInx<pieces.length+1; pInx++) {
        console.log ("pInx: ",pInx);
        pieces[pInx-1].Width = Math.round (scaleX*pieces[pInx-1].naturalWidth);
        pieces[pInx-1].Height = Math.round (scaleY*pieces[pInx-1].naturalHeight);
        insertCss ("#piece"+pInx+" {width: "+ pieces[pInx-1].Width +"px; height: "+ pieces[pInx-1].Height +"px;}");

        //pieces[pInx-1].X = Math.round (scaleX*pieces[pInx-1].placeX);
        //pieces[pInx-1].Y = Math.round (scaleY*pieces[pInx-1].placeY);
        pieces[pInx-1].X = Math.round (scaleX*pieces[pInx-1].pickX);
        pieces[pInx-1].Y = Math.round (scaleY*pieces[pInx-1].pickY);
        
        insertCss ("#piece"+pInx+"{left: "+ pieces[pInx-1].X +"px; top: "+ pieces[pInx-1].Y +"px;}");
        console.log ("#piece"+pInx+"{left: "+ pieces[pInx-1].X +"px; top: "+ pieces[pInx-1].Y +"px;}");
    } //for (pInx=1; pInx=pieces.size+1; pInx+)
    
    //console.log ("bgX CSS-height: "+ bgXstyle.height);
    //console.log ("bgX CSS-width: "+ bgXstyle.width);
    //console.log ("bgX posX: "+ bgX.offsetLeft);
    //console.log ("bgX posY: "+ bgX.offsetTop);

    //let comVal;
    //comVal =  Math.round(180/80);
    //console.log ("Ans: "+comVal);

    //window.requestAnimationFrame(animateLoop);
} //function init()

function resizeElements() {
    bgX.width = 0.8*window.innerWidth;
    bgX.height = 0.8*window.innerHeight;
} //function resizeCanvas()

function animateLoop(timeStamp) {

    //set delay between executions
    setTimeout (function() {
        window.requestAnimationFrame(animateLoop);
    }, 100);//setInterval (function()

} //function animateLoop(timeStap)
//}}}window init

//{{{handler functions


//}}}handler functions

//{{{helper functions
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    } //this.play = function(){
    this.stop = function(){
        this.sound.pause();
    }//this.stop = function(){    
}//function sound(src)

function insertCss( code ) {
    var style = document.createElement('style');
    style.innerHTML = code;

    document.getElementsByTagName("head")[0].appendChild( style );
} //function insertCss( code)

//}}}helper functions
