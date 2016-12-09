var monti;
var montiFrameRate = 15;

function setup() {
  createCanvas(640, 360);
  frameRate(montiFrameRate);
  monti = new Monti();
}

function draw() {
  background(0);
  var montiXPosition = width -  monti.imagesWidth;
  var montiYPosition = height -  monti.imagesHeight;
  var actualSeconds = frameCount / montiFrameRate;
  monti.display(montiXPosition, montiYPosition, actualSeconds);
}

function Monti() {
  this.imagesWidth = 86;
  this.imagesHeight = 134;
  this.imageNumber = 25;
  this.images = [];
  this.frames = [];
  this.actualFrame = 0;
  this.images = [];
  this.changed = false;
  this.animations = 6;

  this.display = function(xpos, ypos, actualSeconds) {
    this.changeAnimation(actualSeconds);
    this.actualFrame = (this.actualFrame+1) % this.frames.length;
    image(this.frames[this.actualFrame], xpos, ypos);
  }

  this.changeAnimation = function(actualSeconds) {
    if (actualSeconds % 5 == 0 && !this.changed){
      this.randomAnimation();
      this.changed = true;
    }else if (actualSeconds % 5 == 1){
      this.changed = false;
    }
  }


  this.loadFrames = function(indexes) {
    this.frames = [];
    for (var i = 0; i < indexes.length; i++) {
      this.frames.push(this.images[indexes[i]]);
    }
  }

  this.init = function() {
    var id = 0;
    while (id < this.imageNumber) {
      filename = "assets/" + nf(id, 2) + ".png";
      this.images.push(loadImage(filename)); 
      id++;
    }
    this.standStill();
  }

  // Animations
  this.standStill = function() {
    this.loadFrames([7, 7, 8, 8, 9, 9, 10, 10]);
  }

  this.down = function() {
    this.loadFrames([13, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0, 13]);
  }

  this.closeEyes = function() {
    this.loadFrames([3, 4]);
  }

  this.speak = function() {
    speak = this.loadFrames([14, 15]);
  }

  this.worry = function() {
    this.loadFrames([5, 6]);
  }
  
  this.lookUp = function() {
    this.loadFrames([7, 8, 9, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 10, 9, 8, 7]);
  }

  this.randomAnimation = function() {
    var animation = floor(random(this.animations));
    console.log("Chosen Animation: " + animation);
    switch(animation) {
    case 0:
      this.standStill();
      console.log("standStill");
      break;
    case 1:
      this.down();
      console.log("down");
      break;
    case 2:
      this.closeEyes();
      console.log("closeEyes");
      break;
    case 3:
      this.speak();
      console.log("speak");
      break;
    case 4:
      this.worry();
      console.log("worry");
      break;
    case 5:
      this.lookUp();
      console.log("lookUp");
      break;
    default:
      break;
    }
  }

  this.init();
}
