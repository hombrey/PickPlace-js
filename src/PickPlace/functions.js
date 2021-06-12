//{{{variable declarations
"use strict";
let timeStamp;
let bgX;
let scaleX, scaleY;
let piece1;
let pieces;
let pickedNum=1;
;//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keyup", evalKeyUp, false); //capture keypress on bubbling (false) phase
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
window.addEventListener("mousedown", movePiece, true); //capture keypress on bubbling (false) phase
window.addEventListener("mouseup", leavePiece, false); //capture keypress on bubbling (false) phase
//window.addEventListener("mousemove",followMouse);
function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    if (keyPressed==16) movePiece(); //key: SHIFT -- drag selected piece
    if (keyPressed==81) selectPiece(1); //key: q
    if (keyPressed==87) selectPiece(2); //key: w
    if (keyPressed==69) selectPiece(3); //key: e
    if (keyPressed==82) selectPiece(4); //key: r
    if (keyPressed==84) selectPiece(5); //key: t
    if (keyPressed==89) selectPiece(6); //key: y
    if (keyPressed==49) placePiece(1); //key: 1
    if (keyPressed==50) placePiece(2); //key: 2
    if (keyPressed==51) placePiece(3); //key: 3
    if (keyPressed==52) placePiece(4); //key: 4
    if (keyPressed==53) placePiece(5); //key: 5
    if (keyPressed==54) placePiece(6); //key: 6
} //evalKey(event)
function evalKeyUp(evnt) {
    let keyPressed = evnt.keyCode;
    console.log ("keyUp: ",keyPressed);
    if (keyPressed==81) resetPiece(1); //key: q
    if (keyPressed==87) resetPiece(2); //key: w
    if (keyPressed==69) resetPiece(3); //key: e
    if (keyPressed==82) resetPiece(4); //key: r
    if (keyPressed==84) resetPiece(5); //key: t
    if (keyPressed==89) resetPiece(6); //key: y
    if (keyPressed==16) leavePiece(); //key: Shift
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
    
    //context_bgX = bgX.getContext('2d');

    scaleX = bgX.clientWidth/bgX.naturalWidth;
    scaleY = bgX.clientHeight/bgX.naturalHeight;
    //console.log ("scale: ("+scaleX+","+scaleY+")");
    placeLocations();
    for (let pInx=1; pInx<pieces.length+1; pInx++) {
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

    //window.requestAnimationFrame(animateLoop);
} //function init()

//}}}window init

//{{{handler functions
function selectPiece(numPassed) {
    pickedNum=numPassed;
    window.addEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 0ms;}"); 
} //function selectPiece(pieceNum)
function placePiece(numPassed) {
    pieces[pickedNum-1].style.left = Math.round (scaleX*pieces[numPassed-1].placeX)+'px';
    pieces[pickedNum-1].style.top = Math.round (scaleY*pieces[numPassed-1].placeY)+'px';
} //function selectPiece(pieceNum)
function resetPiece() {
    window.removeEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 100ms;}"); 
    pieces[pickedNum-1].style.left = Math.round (scaleX*pieces[pickedNum-1].pickX)+'px';
    pieces[pickedNum-1].style.top = Math.round (scaleY*pieces[pickedNum-1].pickY)+'px';
} //function selectPiece(pieceNum)
function movePiece() {
    window.addEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 0ms;}"); 
    console.log("picked", pickedNum); 
} //function leavePiece()
function leavePiece() {
    window.removeEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 100ms;}"); 
} //function leavePiece()
function followMouse() {
    
    let x = event.clientX;
    let y = event.clientY;
    pieces[pickedNum-1].style.left = x+'px';
    pieces[pickedNum-1].style.top = y+'px';

} //function followMouse()

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
