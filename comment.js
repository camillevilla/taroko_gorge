// a commented view of Taroko Gorge
var t=0;
var n=0;
var paths=0;
// trace (6)
var above='brow,mist,shape,layer,the crag,stone,forest,height'.split(',');
// trace (8)
var below='flow,basin,shape,vein,rippling,stone,cove,rock'.split(',');
// trace(7)
var trans='command,pace,roam,trail,frame,sweep,exercise,range'.split(',');
var imper='track,shade,translate,stamp,progress through,direct,run,enter';
imper=imper.split(',');
var intrans='linger,dwell,rest,relax,hold,dream,hum'.split(',');
var s='s,'.split(',');
var texture='rough,fine'.split(',');
// trace (3)
function rand_range(max) {
 return Math.floor(Math.random()*(max+1));
}

// trace (5)
function choose(array) {
 return array[rand_range(array.length-1)];
}
// trace (4)
// above + (trans OR below)
// e.g. "Stone frames the ripplings."
function path() {
 var p=rand_range(1);
 var words=choose(above);
 if ((words=='forest')&&(rand_range(3)==1)) {
  words='monkeys '+choose(trans);
 } else {
  words+=s[p]+' '+choose(trans)+s[(p+1)%2];
 }
 words+=' the '+choose(below)+choose(s)+'.';
 return words;
}

// (above OR below)s + intrans
// 2 words max
 // e.g. "Ripplings hold"
function site() {
 var words='';
 if (rand_range(2)==1) {
  words+=choose(above);
 } else {
  words+=choose(below);
 }
 words+='s '+choose(intrans)+'.';
 return words;
}
// break line: (2 spaces + imper + "the" + adjs + "—" )
// e.g."progress through the rough sinuous objective arched —"
function cave() {
 var adjs=('encompassing,'+choose(texture)+',sinuous,straight,objective,arched,cool,clear,dim,driven').split(',');
 var target=1+rand_range(3);
 while (adjs.length>target) {
  adjs.splice(rand_range(adjs.length),1);
  }
 var words='\u00a0\u00a0'+choose(imper)+' the '+adjs.join(' ')+' \u2014';
 return words;
}
// trace (2)
function do_line() {
 var main=document.getElementById('main');

// logic for removing lines from the window
 // check how many lines are on the page
 if (t<=25) {
  t+=1;
 } else {
  // if there are more than 25 lines on the page, remove lines at the top of the page
  main.removeChild(document.getElementById('main').firstChild);
 }

// Stanza generator
//
//  e.g.
// Stones sweep the cove.
// Rocks dream.
// Shapes command the coves.
//   track the sinuous dim —

// Stanza structure
  // Block (2-4 lines):
    // path
    // site (0 - 2 times)
    // path
  // empty line
  // cave
  // empty line

  // Create an empty line
 if (n===0) {
  // set up text as a global variable
  text=' ';

  // Create a block
 } else if (n==1) {
  // determines max length of a block (currently 2 to 4 lines)
  paths=2+rand_range(2);
  text=path();
 } else if (n<paths) {
  text=site();
 } else if (n==paths) {
  text=path();

  // create an empty line between block and break line
 } else if (n==paths+1) {
  text=' ';
  // creates a break line that ends in —
 } else if (n==paths+2) {
  text=cave();
  // create an empty line and start a new stanza
 } else {
  text=' ';
  n=0;
 }
 n+=1;

// Add generated stanza to DOM
 // capitalize the first letter of each block line
 text=text.substring(0,1).toUpperCase()+text.substring(1,text.length);
 // create an empty div
 last=document.createElement('div');
 // append text to the last div
 last.appendChild(document.createTextNode(text));
 // add div to the end of the document
 main.appendChild(last);
}

// Set pace at which lines are generated
// 1200 milliseconds = 1.2 seconds
// trace: (1)
function poem() {
 setInterval(do_line, 1200);
}
