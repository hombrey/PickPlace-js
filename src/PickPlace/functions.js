//{{{variable declarations
"use strict";
let timeStamp;
let bgX;
let scaleX, scaleY;
let piece1;
let pieces;
let pickedNum=1;
let pickSound;
;//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keyup", evalKeyUp, false); //capture keypress on bubbling (false) phase
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
/*window.addEventListener("mousedown", movePiece, true); //capture keypress on bubbling (false) phase*/
//window.addEventListener("mouseup", leavePiece, false); //capture keypress on bubbling (false) phase
function evalPress(evnt) {
    let keyPressed = evnt.keyCode;
    //console.log ("Pressed:", keyPressed);
} //function evalPress
//window.addEventListener("mousemove",followMouse);
function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    if (keyPressed==32) movePiece(); //key: spacebar -- drag selected piece
    if(!event.shiftKey) if (keyPressed==49) selectPiece(1); //key: 1
    if(!event.shiftKey) if (keyPressed==50) selectPiece(2); //key: 2
    if(!event.shiftKey) if (keyPressed==51) selectPiece(3); //key: 3
    if(!event.shiftKey) if (keyPressed==52) selectPiece(4); //key: 4
    if(!event.shiftKey) if (keyPressed==53) selectPiece(5); //key: 5
    if(!event.shiftKey) if (keyPressed==54) selectPiece(6); //key: 6
    if(event.shiftKey) if (keyPressed==49) placePiece(1); //key: shift-1
    if(event.shiftKey) if (keyPressed==50) placePiece(2); //key: shift-2
    if(event.shiftKey) if (keyPressed==51) placePiece(3); //key: shift-3
    if(event.shiftKey) if (keyPressed==52) placePiece(4); //key: shift-4
    if(event.shiftKey) if (keyPressed==53) placePiece(5); //key: shift-5
    if(event.shiftKey) if (keyPressed==54) placePiece(6); //key: shift-6
} //evalKey(event)
function evalKeyUp(evnt) {
    let keyPressed = evnt.keyCode;
    //console.log ("keyUp: ",keyPressed);
    if(!event.shiftKey) if (keyPressed==49) resetPiece(1); //key: 1
    if(!event.shiftKey) if (keyPressed==50) resetPiece(2); //key: 2
    if(!event.shiftKey) if (keyPressed==51) resetPiece(3); //key: 3
    if(!event.shiftKey) if (keyPressed==52) resetPiece(4); //key: 4
    if(!event.shiftKey) if (keyPressed==53) resetPiece(5); //key: 5
    if(!event.shiftKey) if (keyPressed==54) resetPiece(6); //key: 6
    if (keyPressed==32) leavePiece(); //key: spacebar
    if(!event.shiftKey) if (keyPressed==188) toggleHide();
    if(event.shiftKey) if (keyPressed==188) hideAll();
    if (keyPressed==190) playPrompt();
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
    pieces[1-1].prompt = new sound("./src/PickPlace/wav/prompt1.mp3");

    pieces[2-1].pickX = 30;
    pieces[2-1].pickY = 441;
    pieces[2-1].prompt = new sound("./src/PickPlace/wav/prompt2.mp3");

    pieces[3-1].pickX = 10;
    pieces[3-1].pickY = 31;
    pieces[3-1].prompt = new sound("./src/PickPlace/wav/prompt3.mp3");

    pieces[4-1].pickX = 736;
    pieces[4-1].pickY = 482;
    pieces[4-1].prompt = new sound("./src/PickPlace/wav/prompt4.mp3");

    pieces[5-1].pickX = 365;
    pieces[5-1].pickY = 475;
    pieces[5-1].prompt = new sound("./src/PickPlace/wav/prompt5.mp3");

    pieces[6-1].pickX = 1019;
    pieces[6-1].pickY = 12;
    pieces[6-1].prompt = new sound("./src/PickPlace/wav/prompt6.mp3");


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

    pickSound = new sound("./src/PickPlace/wav/pick.mp3");
} //function placePieces

//make sure elements are loaded before proceeding
const checkElement = async selector => {
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  } //while ( document.querySelector(selector) === null)
  return document.querySelector(selector); 
}; //const checkElement = async selector

function initWin() {
setTimeout (function() { //set delay before calculating drawable parameters
    //Get a reference to the canvas
    bgX = document.getElementById('backgroundX');
    
    //context_bgX = bgX.getContext('2d');

    scaleX = bgX.clientWidth/bgX.naturalWidth;
    scaleY = bgX.clientHeight/bgX.naturalHeight;
    //console.log ("scale: ("+scaleX+","+scaleY+")");

    placeLocations();
    for (let pInx=1; pInx<pieces.length+1; pInx++) {
        //console.log ("pInx: ",pInx);
        pieces[pInx-1].Width = Math.round (scaleX*pieces[pInx-1].naturalWidth);
        pieces[pInx-1].Height = Math.round (scaleY*pieces[pInx-1].naturalHeight);
        insertCss ("#piece"+pInx+" {width: "+ pieces[pInx-1].Width +"px; height: "+ pieces[pInx-1].Height +"px;}");

        pieces[pInx-1].X = Math.round (scaleX*pieces[pInx-1].pickX);
        pieces[pInx-1].Y = Math.round (scaleY*pieces[pInx-1].pickY);
        
        insertCss ("#piece"+pInx+"{left: "+ pieces[pInx-1].X +"px; top: "+ pieces[pInx-1].Y +"px;}");

        insertCss ("#piece"+pInx+"{z-index: 1;}");
        pieces[pInx-1].show = true;
        //Make the DIV element draggagle:
        dragElement(document.getElementById("piece"+pInx));


        //console.log ("#piece"+pInx+"{left: "+ pieces[pInx-1].X +"px; top: "+ pieces[pInx-1].Y +"px;}");
    } //for (pInx=1; pInx=pieces.size+1; pInx+)
    
    //console.log ("bgX CSS-height: "+ bgXstyle.height);
    //console.log ("bgX CSS-width: "+ bgXstyle.width);
    //console.log ("bgX posX: "+ bgX.offsetLeft);
    //console.log ("bgX posY: "+ bgX.offsetTop);

    //window.requestAnimationFrame(animateLoop);
}, 3);//setTimeOut (function()
} //function init()

//}}}window init

//{{{handler functions
function clickPiece(clicked_id) {
    let extractIdNum = (clicked_id.replace("piece",""));
    let clickedNum = parseInt(extractIdNum);
    pickedNum = clickedNum;
    pickSound.play();
    raisePiece();
} //function clickPiece(clicked_id)
function selectPiece(numPassed) {
    pickedNum=numPassed;
    window.addEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 0ms;}"); 
} //function selectPiece(pieceNum)
function placePiece(numPassed) {
    pieces[pickedNum-1].style.left = Math.round (scaleX*pieces[numPassed-1].placeX)+'px';
    pieces[pickedNum-1].style.top = Math.round (scaleY*pieces[numPassed-1].placeY)+'px';
    pickSound.play();
} //function selectPiece(pieceNum)
function resetPiece() {
    pickSound.play();
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
    pickSound.play();
    window.removeEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 100ms;}"); 
} //function leavePiece()
function followMouse() {
    let x = event.clientX;
    let y = event.clientY;
    pieces[pickedNum-1].style.left = x+'px';
    pieces[pickedNum-1].style.top = y+'px';
} //function followMouse()

function playPrompt() {
    pieces[pickedNum-1].prompt.play();
} //function playPrompt()
function toggleHide() {
    if (pieces[pickedNum-1].show) {
        pieces[pickedNum-1].src ="./src/PickPlace/img/"+pickedNum+"h.jpg";
        pieces[pickedNum-1].show=false;
    } else {//if (pieces[pickedNum-1].show)
        pieces[pickedNum-1].src ="./src/PickPlace/img/"+pickedNum+".png";
        pieces[pickedNum-1].show=true;
    } // else //if (pieces[pickedNum-1 ...
} //function toggleHide()
function hideAll() {
    for (let pInx=1; pInx<pieces.length+1; pInx++) {
        pieces[pInx-1].src ="./src/PickPlace/img/"+pInx+"h.jpg";
        pieces[pInx-1].show = false;
    } //for (pInx=1; pInx=pieces.size+1; pInx+)
} //function hideAll()

//}}}handler functions

//{{{helper functions
function raisePiece() {
    for (let pInx=1; pInx<pieces.length+1; pInx++) {
        insertCss ("#piece"+pInx+"{z-index: 1;}");
    } //for (pInx=1; pInx=pieces.size+1; pInx+)
   insertCss ("#piece"+pickedNum+"{z-index: 3;}");
} //function raisePiece(numPassed)
function dragElement(elmnt) {
  var dragX = 0, dragY = 0;

    elmnt.onmousedown = dragMouseDown; 

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    dragX = e.clientX;
    dragY = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  } //function dragMouseDown(e)

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    //pos1 = e.clientX;
    //pos2 = e.clientY;
    dragX = e.clientX;
    dragY = e.clientY;
    // set the element's new position:
    //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.top = ( dragY) + "px";
    elmnt.style.left = (  dragX) + "px";
  } // function elementDrag(e)

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  } //function closeDragElement() 
} //function dragElement(elmnt) 

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
