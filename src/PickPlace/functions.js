//{{{variable declarations
"use strict";
let bgX;
let scaleX, scaleY;
let piece1;
let pieces;
let pickedNum=1;
let pickSound;
let xAdj, yAdj;
;//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keyup", evalKeyUp, false); //capture keypress on bubbling (false) phase
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase

function evalPress(evnt) {
    let keyPressed = evnt.keyCode;
    //console.log ("Pressed:", keyPressed);
} //function evalPress

function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    switch (keyPressed) {
        case 32 : movePiece(); break;//key: spacebar
        case 49 : if(!event.shiftKey) selectPiece(1); 
                  else placePiece(1);
                  break; //key: 1
        case 50 : if(!event.shiftKey) selectPiece(2); 
                  else placePiece(2);
                  break; //key: 2
        case 51 : if(!event.shiftKey) selectPiece(3); 
                  else placePiece(3);
                   break; //key: 3
        case 52 : if(!event.shiftKey) selectPiece(4); 
                  else placePiece(4);
                  break; //key: 4
        case 53 : if(!event.shiftKey) selectPiece(5); 
                  else placePiece(5);
                  break; //key: 5
        case 54 : if(!event.shiftKey) selectPiece(6); 
                  else placePiece(6);
                  break; //key: 6
        case 80 : if(!event.shiftKey) resetPiece(pickedNum); 
                   else resetAll();
                  break;//key: p
        case 188 :if(!event.shiftKey) toggleHide(); 
                   else  hideAll(); 
                  break;//key: <comma>
        case 190 : playPrompt(); break;//key: <period>
        default : return;
    } //switch (keyPressed)
} //evalKey(event)
function evalKeyUp(evnt) {
    let keyPressed = evnt.keyCode;
    if (keyPressed==32) leavePiece(); //key: spacebar
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


function initWin() {
document.getElementById('backgroundX').onload = function () { //wait for element before loading
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
        xAdj =(-1)*Math.round(pieces[pInx-1].Width/2);
        yAdj =(-1)*Math.round(pieces[pInx-1].Height/2);
        dragElement(document.getElementById("piece"+pInx));
        touchElement(document.getElementById("piece"+pInx));

        //console.log ("#piece"+pInx+"{left: "+ pieces[pInx-1].X +"px; top: "+ pieces[pInx-1].Y +"px;}");
    } //for (pInx=1; pInx=pieces.size+1; pInx+)
    

}, 30);//setTimeOut (function()
};//document.getElementById(' ... wait for element before loading
} //function init()

//}}}window init

//{{{handler functions
function clickPiece(clicked_id) { //handler for mouse clicks
    let extractIdNum = (clicked_id.replace("piece",""));
    let clickedNum = parseInt(extractIdNum);
    pickedNum = clickedNum;
    pickSound.play();
    raisePiece();
} //function clickPiece(clicked_id)
function selectPiece(numPassed) { //handler for using the keyboard to select a piece
    pickedNum=numPassed;
    pickSound.play();
    raisePiece();
    //insertCss (".pieceClass {transition: 0ms;}"); 
} //function selectPiece(pieceNum)
function placePiece(numPassed) {
    pieces[pickedNum-1].style.left = Math.round (scaleX*pieces[numPassed-1].placeX)+'px';
    pieces[pickedNum-1].style.top = Math.round (scaleY*pieces[numPassed-1].placeY)+'px';
    pickSound.play();
} //function selectPiece(pieceNum)
function resetPiece() {
    pickSound.play();
    //window.removeEventListener("mousemove",followMouse);
    //insertCss (".pieceClass {transition: 100ms;}"); 
    pieces[pickedNum-1].style.left = Math.round (scaleX*pieces[pickedNum-1].pickX)+'px';
    pieces[pickedNum-1].style.top = Math.round (scaleY*pieces[pickedNum-1].pickY)+'px';
} //function selectPiece(pieceNum)
function resetAll() {
    pickSound.play();
    for (let pInx=1; pInx<pieces.length+1; pInx++) {
        pieces[pInx-1].style.left = Math.round (scaleX*pieces[pInx-1].pickX)+'px';
        pieces[pInx-1].style.top = Math.round (scaleY*pieces[pInx-1].pickY)+'px';
    } //for (pInx=1; pInx=pieces.size+1; pInx+)
} //function resetAll()
function movePiece() {
    window.addEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 0ms;}"); 
    //console.log("picked", pickedNum); 
} //function leavePiece()
function leavePiece() {
    pickSound.play();
    window.removeEventListener("mousemove",followMouse);
    insertCss (".pieceClass {transition: 100ms;}"); 
} //function leavePiece()
function followMouse() {
    let x = event.clientX+xAdj;
    let y = event.clientY+yAdj;
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

//===========================================================================
function dragElement(elmnt) {
  var dragX = 0, dragY = 0;

    elmnt.onmousedown = dragMouseDown; 

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    dragX = e.clientX+xAdj;
    dragY = e.clientY+yAdj;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  } //function dragMouseDown(e)

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    dragX = e.clientX+xAdj;
    dragY = e.clientY+yAdj;
      
    // set the element's new position:
    elmnt.style.top = ( dragY) + "px";
    elmnt.style.left = (  dragX) + "px";
  } // function elementDrag(e)

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  } //function closeDragElement() 
} //function dragElement(elmnt) 

//===========================================================================
function touchElement(elmnt) {
  var touchX = 0, touchY = 0;

    elmnt.ontouchstart = dragFinger; 

  function dragFinger(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    getTouchPos(e);
    document.ontouchend = closeTouchElement;
    // call a function whenever the cursor moves:
    document.ontouchmove = elementDrag;
  } //function dragFinger(e)

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    getTouchPos(e);

    elmnt.style.top = (touchY) + "px";
    elmnt.style.left = (touchX) + "px";
  } // function elementDrag(e)

  function getTouchPos(e) {
        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX+xAdj/2;
                touchY=touch.pageY+yAdj/2;
            } //if (e.touches.lenth ==1) ...
        } //if (e.touches)
  } //function getTouchPos(e)

  function closeTouchElement() {
    /* stop moving when mouse button is released:*/
    document.ontouchend = null;
    document.ontouchmove = null;
  } //function closeTouchElement() 
} //function touchElement(elmnt) 
//===========================================================================

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
