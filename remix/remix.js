// infinite haiku

// create a word bank
var one_syllable = ["hum","walk","fly","drop","shine", "plum", "fish", "frog", "eve"]
var two_syllables = ["flower", "anoint", "fishes", "running", "bowing"]
var three_syllables = ["contemplate", "ruminate", "blossoming"]

// =====helpers=====
var rand_range = function(max) {
 return Math.floor(Math.random()*(max+1));
}

var choose = function(array){
  return array[rand_range(array.length-1)];
}

// generate a line
// refactor this to be agnostic to number of syllables
var composeLine = {
  // 5 syllable line
  five: function(){
    var line = []
    // choose length of first word
    var syllables  = []
    syllables.push(rand_range(2))

    // select first word
    if (syllables[0] === 1) {
      line.push(choose(one_syllable))
    } else if (syllables[0] === 2) {
      line.push(choose(two_syllables))
    } else {
      line.push(choose(three_syllables))
    };

    // select second word
    var remaining = 5 - syllables[0]
    syllables.push(rand_range(remaining))

    if (syllables[1] === 3) {
      line.push(choose(two_syllables))
    } else if (syllables[1] === 2) {
      line.push(choose(three_syllables))
    } else {
      line.push(choose(three_syllables))
    };

  }

  // 7 syllable line
  // seven: function(){
  // }
};


// determine whether next line is 5 syllables, 7 syllables or a break

// add lines to the DOM

// set up a loop for generating lines
